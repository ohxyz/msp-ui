import util from '../../helpers/util.js';
import React from 'react';
import { AccountProfile } from '../core/account-profile.js';

function getExpandIconText( shouldExpand ) {

    return shouldExpand === true ? 'keyboard_arrow_up' : 'keyboard_arrow_down';

}

class UserStrip extends React.Component {

    constructor( props ) {

        super( props );

        this.handleChevronIconClick = this.handleChevronIconClick.bind( this );
        this.handleDeleteIconClick = this.handleDeleteIconClick.bind( this );
        this.handleDeleteUserYesButtonClick = this.handleDeleteUserYesButtonClick.bind( this );
        this.handleDeleteUserNoButtonClick = this.handleDeleteUserNoButtonClick.bind( this );

        this.state = {

            user: null,
            shouldRenderDeleteUserBox: false,
            shouldRenderAccessLevelsBox: false,
            chevronIconText: 'keyboard_arrow_down',
            onPropsDeleteUserYesClick: new Function(),
        };
    }

    static getDerivedStateFromProps( nextProps, prevState ) {
        
        return {

            user: util.setDefault( new AccountProfile( nextProps.user ), new AccountProfile() ),
            onPropsDeleteUserYesClick: util.setDefault( nextProps.onDeleteUserYesClick, new Function() )
        };
    }

    handleChevronIconClick() {

        let shouldExpand = !this.state.shouldRenderAccessLevelsBox;

        this.setState( { 

            shouldRenderAccessLevelsBox: shouldExpand,
            chevronIconText: getExpandIconText( shouldExpand )

        } );
    }

    handleDeleteIconClick() {

        this.setState( { 

            shouldRenderDeleteUserBox: true

        } );
    }

    handleDeleteUserYesButtonClick() {

        let promise = this.state.onPropsDeleteUserYesClick( this.state.user );

        promise.then( () => { 

            this.setState( {

                shouldRenderDeleteUserBox: false,
                shouldRenderAccessLevelsBox: false

            } );
            
        } );
    }

    handleDeleteUserNoButtonClick() {

        this.setState( { 

            shouldRenderDeleteUserBox: false
        } );
    }

    renderAccessLevelsBox() {

        return (

            <div className="user-strip__access-level">
                User Access Levels
            </div>
        );   
    }

    renderDeleteUserBox() {

        return (

            <div className="user-strip__delete-user">
                <div className="user-strip__confirmation-text">Are you sure want to delete this user?</div>
                <div className="user-strip__confirmation-buttons">
                    <button 
                        className="user-strip__delete-user-yes"
                        onClick={ this.handleDeleteUserYesButtonClick }
                    >
                        Yes
                    </button>
                    <button 
                        className="user-strip__delete-user-no"
                        onClick={ this.handleDeleteUserNoButtonClick }
                    >   
                        No
                    </button>
                </div>
            </div>
        );
    }

    render() {

        let user = this.state.user;

        return (

            <div className="user-strip">
                <div className="user-strip__main">
                    <div 
                        className="user-strip__delete material-icons"
                        onClick={ this.handleDeleteIconClick }
                    >
                        delete_forever
                    </div>
                    <div 
                        className="user-strip__expand material-icons" 
                        onClick={ this.handleChevronIconClick }
                    >
                        { this.state.chevronIconText }
                    </div>
                    <div className="user-strip__top-bar">
                        <span className="user-strip__full-name">{ user.fullName }</span>
                        <span className="user-strip__top-org">{ user.topOrgName }</span>
                    </div>
                    <div className="user-strip__middle-bar">
                        <div className="user-strip__org">{ user.orgName }</div>
                    </div>
                </div>
                { this.state.shouldRenderAccessLevelsBox && this.renderAccessLevelsBox() }
                { this.state.shouldRenderDeleteUserBox && this.renderDeleteUserBox() }
            </div>
        );
    }
}


module.exports = {

    UserStrip,
};

