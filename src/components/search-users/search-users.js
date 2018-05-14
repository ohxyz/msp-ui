import React from 'react';
import util from '../../helpers/util.js';
import { SearchBox } from '../search-box/search-box.js';
import { UserList } from '../user-list/user-list.js';
import { MessageBox } from '../message-box/message-box.js';

import { componentManager } from '../core/component-manager.js';

class SearchUsers extends React.Component {

    constructor( props ) {

        super( props );

        this.handleSearchBoxItemSelect = this.handleSearchBoxItemSelect.bind( this );
        this.handleTextChange = this.handleTextChange.bind( this );
        this.handleDeleteUserPromise = this.handleDeleteUserPromise.bind( this );

        this.numberOfStrikes = 3;

        this.state = {

            storage: null,
            usersFound: [],
            userToDelete: null,
            shouldRenderUserList: false,
            shouldRenderMessageBox: false,
            messageBoxType: '',
            onPropsDeleteUser: new Function()
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
            shouldRenderUserList: true

        } );
    }

    handleSearchBoxItemSelect( item, searchBox ) {

        let account = item.__origin__;
        let users = [];

        if ( account.type === 'person' ) {

            users = [ account ];
        }
        else {
            
            users = this.state.storage.getUsersByHierarchyId( account.hierarchyId );
        }
        
        this.setState( { 

            usersFound: users,
            shouldRenderUserList: true

        } );
    }

    handleTextChange( usersFound, searchBox ) {

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

        return (

            <SearchBox
                id="seach-users-box"
                inputId="search-users-field"
                items={ this.state.storage.accounts }
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

        promise.then( () => {

            this.setState( { 

                shouldRenderMessageBox: true,
                messageBoxType: 'success',
                userToDelete: user
            } );

        } );

        return promise;
    }

    renderMessageBox( type, user ) {

        let title = '';
        let content = '';

        if ( type === 'success' ) {

            title = 'Deletion achieved';
            content = `You've deleted the user account for <em>${ user.fullName }</em>.`;
        }
        else if ( type === 'error' ) {

            title = 'Oops. Delete user failed.';
            content = "Sorry - something's gone wrong in creating this user account. Please try again later.";
        }
        else {

            return null;
        }

        return (

            <MessageBox type={ type } title={ title } content={ content } seconds={ 10 } />
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
                onRenderCount={ count => `${count} users found.` }
                sortByFields={ [ 'firstName', 'lastName' ] }
                onDeleteUser={ this.handleDeleteUserPromise }
            />
        );
    }

    render() {

        let userToDelete = this.state.userToDelete;
        let messageBoxType = this.state.messageBoxType;

        let shouldRenderMessageBox = this.state.shouldRenderMessageBox === true 
                                        && messageBoxType !== '' 
                                        && userToDelete !== null;

        let messageBox = shouldRenderMessageBox === true 
                       ? this.renderMessageBox( messageBoxType, userToDelete )
                       : null;
        return (

            <div id="search-users-section">
                { messageBox }
                { this.renderSearchBox() }
                { this.renderUserList() }
            </div>
        );
    }
}

module.exports = {

    SearchUsers
};