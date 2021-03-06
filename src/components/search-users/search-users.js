import React from 'react';
import util from '../../helpers/util.js';
import { SearchBox } from '../search-box/search-box.js';
import { UserList } from '../user-list/user-list.js';
import { MessageBox } from '../message-box/message-box.js';
import { componentManager } from '../core/component-manager.js';
import { User } from '../core/user.js';
import { HierarchyNode } from '../core/hierarchy-node.js';

const SECONDS_TO_DISMISS_MESSAGE_BOX = 10;
const SUCCESS_CODE = '200';
const ERROR_CODE_4XX = '4xx';
const ERROR_CODE_5XX = '5xx';

class SearchUsers extends React.Component {

    constructor( props ) {

        super( props );

        this.handleSearchBoxItemSelect = this.handleSearchBoxItemSelect.bind( this );
        this.handleTextChange = this.handleTextChange.bind( this );
        this.handleDeleteUserPromise = this.handleDeleteUserPromise.bind( this );
        this.handleMessageBoxDismiss = this.handleMessageBoxDismiss.bind( this );

        this.numberOfStrikes = 3;

        this.state = {

            storage: null,
            usersFound: [],
            userToDelete: null,
            shouldRenderUserList: false,
            shouldRenderDeleteUserBoxAndAccessLevelsBox: false,
            shouldRenderMessageBox: false,
            messageCode: '',
            onPropsDeleteUser: new Function(),
            itemSelected: null,
        };

        this.id = util.setDefault( props.id, util.generateRandomString() );
        componentManager.addComponent( this.id, this );
    }

    static getDerivedStateFromProps( nextProps, prevState ) {

        let storage = nextProps.storage;

        if ( storage === undefined ) {

            throw new Error( '[MSP] SearchUsers component must have a HierarchyStorage instance as property.' );
        }

        storage.process();

        return {

            storage: storage,
            onPropsDeleteUser: util.setDefault( nextProps.onDeleteUser, new Function() )
        };
    }

    showAllUsers() {

        let allUsers = this.state.storage.getAllUsers();

        this.setState( {

            usersFound: allUsers,
            shouldRenderUserList: true,
            shouldRenderDeleteUserBoxAndAccessLevelsBox: false
        } );
    }

    getUsersByItemSelected( item ) {

        let object = item.__origin__;
        let users = [];

        if ( object instanceof HierarchyNode === true ) {

            users = this.state.storage.getUsersByHierarchyId( object.hierarchyId );
        }
        else if ( object instanceof User === true ) {

            users = [ object ];
        }

        return users;
    }

    handleSearchBoxItemSelect( item ) {

        let users = this.getUsersByItemSelected( item );

        this.setState( { 

            itemSelected: item,
            usersFound: users,
            shouldRenderUserList: true,
            shouldRenderDeleteUserBoxAndAccessLevelsBox: false

        } );
    }

    handleTextChange( searchBox ) {

        if ( searchBox.text.length <= this.numberOfStrikes 
                && searchBox.text.length > 0 ) {

            return;
        }
        else if ( searchBox.text.length === 0 ) {

            this.showAllUsers();
            
            return;
        }
    }

    renderSearchBox() {

        let items = this.state.storage.getAllUsers().slice();
        let items2 = this.state.storage.nodes.slice();

        items.push( ...items2 );

        return (

            <SearchBox
                id="seach-users-box"
                inputId="search-users-field"
                items={ items }
                fields={ [ 'fullName' ] }
                indexOfFieldsToSort={ 0 }
                strikes={ this.numberOfStrikes }
                placeholder="Search users by name, department or agency"
                onSelect={ this.handleSearchBoxItemSelect }
                onIconClick={ self => { self.clearSearch(); this.showAllUsers(); } }
                onChange={ this.handleTextChange }
            />
        );
    }

    handleDeleteUserPromise( user ) {
        
        let promise = this.state.onPropsDeleteUser( user );

        if ( promise === undefined ) {

            throw new Error( '[MSP] The onPropsDeleteUser function did not return a promise.' );
        }

        promise
            .then( () => {

                let accountId = user.accountId;

                this.state.storage.deleteUser( accountId );

                let usersLeft = this.state.usersFound.filter( user => user.accountId !== accountId );

                this.setState( { 

                    shouldRenderMessageBox: true,
                    messageCode: SUCCESS_CODE,
                    userToDelete: user,
                    usersFound: usersLeft
                } );

                return user;

            } )
            .catch( error => {

                let errorCodeLiteral = error.message;
                let messageCode = '';

                if ( errorCodeLiteral[ 0 ] === '4' ) {

                    messageCode = ERROR_CODE_4XX;
                }
                else if ( errorCodeLiteral[ 0 ] === '5' ) {

                    messageCode = ERROR_CODE_5XX;
                }

                this.setState( { 

                    shouldRenderMessageBox: true,
                    messageCode: messageCode,
                    userToDelete: user,
                    shouldRenderDeleteUserBoxAndAccessLevelsBox: false
                } );

            } );

        return promise;
    }

    handleMessageBoxDismiss() {

        this.setState( {

            shouldRenderMessageBox: false

        } );
    }

    renderMessageBox( messageCode, user ) {

        let type = '';
        let title = '';
        let content = '';

        if ( messageCode === SUCCESS_CODE ) {

            type = 'success';
            title = 'Deletion achieved';
            content = <React.Fragment>You've deleted the user account for <em>{ user.fullName }</em>.</React.Fragment>;
        }
        else if ( messageCode === ERROR_CODE_4XX ) {

            type = 'error';
            title = 'Oops. Delete user failed.';
            content = (

                <React.Fragment>
                    Sorry - something's gone wrong in deleting this user. Please contact your <em>Origin Account Manager</em>.
                </React.Fragment>
            );
        }
        else if ( messageCode === ERROR_CODE_5XX ) {

            type = 'error';
            title = 'Oops. Delete user failed.';
            content = "Sorry - something's gone wrong in deleting this user account. Please try again later.";
        }
        else {

            return null;
        }

        return (

            <MessageBox 
                type={ type } 
                title={ title } 
                content={ content } 
                seconds={ SECONDS_TO_DISMISS_MESSAGE_BOX } 
                onDismiss={ this.handleMessageBoxDismiss }
            />
        );
    }

    renderUserList() {

        if( this.state.shouldRenderUserList === false ) {

            return;
        }

        return (

            <UserList
                id="search-users-list"
                users={ this.state.usersFound }
                onRenderCount={ count => `${count} users found` }
                sortByFields={ [ 'firstName', 'lastName' ] }
                shouldRenderDeleteUserBoxAndAccessLevelsBox={ this.state.shouldRenderDeleteUserBoxAndAccessLevelsBox }
                onDeleteUser={ this.handleDeleteUserPromise }
            />
        );
    }

    render() {

        let userToDelete = this.state.userToDelete;
        let messageCode = this.state.messageCode;

        let shouldRenderMessageBox = this.state.shouldRenderMessageBox === true 
                                        && messageCode !== '' 
                                        && userToDelete !== null;

        let messageBox = shouldRenderMessageBox === true 
                       ? this.renderMessageBox( messageCode, userToDelete )
                       : null;

        return (

            <div id="search-users-section">
                <div className="container p-bot-50">
                    { messageBox }
                    { this.renderSearchBox() }
                </div>
                <div className="user-list__container">
                    { this.renderUserList() }
                </div>
            </div>
        );
    }
}

export {

    SearchUsers
};