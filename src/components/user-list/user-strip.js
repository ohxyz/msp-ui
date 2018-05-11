import util from '../../helpers/util.js';
import React from 'react';
import { AccountProfile } from '../core/account-profile.js';

function getExpandIconText( shouldExpand ) {

    return shouldExpand === true ? 'keyboard_arrow_up' : 'keyboard_arrow_down';

}

class UserStrip extends React.Component {

    constructor( props ) {

        super( props );

        this.handleExpandIconClick = this.handleExpandIconClick.bind( this );
        this.handleDeleteIconClick = this.handleDeleteIconClick.bind( this );
        this.handleDeleteUserYesButtonClick = this.handleDeleteUserYesButtonClick.bind( this );
        this.handleDeleteUserNoButtonClick = this.handleDeleteUserNoButtonClick.bind( this );

        this.state = {

            user: null,
            shouldDropDownExpanded: false,
            shouldRenderDeleteUserBox: false,
            shouldRenderAccessLevelsBox: false,
            expandIconText: 'keyboard_arrow_down',
            onPropsDeleteUserYesClick: new Function(),
        };
    }

    static getDerivedStateFromProps( nextProps, prevState ) {

        let shouldExpand = util.setDefault( nextProps.shouldDropDownExpanded, false );
        
        return {

            user: util.setDefault( new AccountProfile( nextProps.user ), new AccountProfile() ),
            shouldDropDownExpanded: shouldExpand,
            expandIconText: getExpandIconText( shouldExpand ),
            onPropsDeleteUserYesClick: util.setDefault( nextProps.onDeleteUserYesClick, new Function() )
        };
    }

    handleExpandIconClick() {

        let shouldExpand = true;
        let shouldRenderAccessLevelsBox = true;

        if ( this.state.shouldDropDownExpanded === false ) {

            shouldExpand = true;
        }
        else {

            shouldRenderAccessLevelsBox = true;
            shouldExpand = this.state.shouldRenderDeleteUserBox;
        }

        this.setState( { 

            shouldDropDownExpanded: shouldExpand,
            shouldRenderAccessLevelsBox: shouldRenderAccessLevelsBox,
            shouldRenderDeleteUserBox: false,
            expandIconText: getExpandIconText( shouldExpand )

        } );
    }

    handleDeleteIconClick() {

        this.setState( { 

            shouldDropDownExpanded: true,
            shouldRenderDeleteUserBox: true
        } );

    }

    handleDeleteUserYesButtonClick() {

        this.state.onPropsDeleteUserYesClick( this.state.user );
    }

    handleDeleteUserNoButtonClick() {

        this.setState( { 

            shouldDropDownExpanded: false,
            shouldRenderDeleteUserBox: false
        } );
    }

    renderDropDownContent() {

        if ( this.state.shouldRenderDeleteUserBox === true ) {

            return this.renderDeleteUserBox();
        }
        else if ( this.state.shouldRenderAccessLevelsBox === true ) {

            return this.renderAccessLevelsBox();
        }

        return;
    }

    renderDropDown() {

        if ( this.state.shouldDropDownExpanded === true ) {

            return (

                <div className="user-strip__dropdown">
                    <div className="user-strip__dropdown-content">
                    { this.renderDropDownContent() }
                    </div>
                </div>
            );
        }
    }

    renderAccessLevelsBox() {

        return 'User Access Levels';

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
                        close
                    </div>
                    <div 
                        className="user-strip__expand material-icons" 
                        onClick={ this.handleExpandIconClick }
                    >
                        { this.state.expandIconText }
                    </div>
                    <div className="user-strip__top-bar">
                        <span className="user-strip__full-name">{ user.fullName }</span>
                        <span className="user-strip__top-org">{ user.topOrgName }</span>
                    </div>
                    <div className="user-strip__middle-bar">
                        <div className="user-strip__org">{ user.orgName }</div>
                    </div>
                </div>
                { this.renderDropDown() }
            </div>
        );
    }
}


module.exports = {

    UserStrip,
};

