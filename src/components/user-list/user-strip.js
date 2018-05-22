import util from '../../helpers/util.js';
import React from 'react';
import { User } from '../core/user.js';

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
            shouldRenderDeleteUserBoxAndAccessLevelsBox: false
        };
    }

    static getDerivedStateFromProps( nextProps, prevState ) {

        let shouldRenderBothBoxes = util.setDefault( nextProps.shouldRenderDeleteUserBoxAndAccessLevelsBox, false );

        return {

            user: util.setDefault( new User( nextProps.user ), new User() ),
            onPropsDeleteUserYesClick: util.setDefault( nextProps.onDeleteUserYesClick, new Function() ),
            shouldRenderDeleteUserBox: shouldRenderBothBoxes,
            shouldRenderAccessLevelsBox: shouldRenderBothBoxes,
            chevronIconText: UserStrip.getExpandIconText( shouldRenderBothBoxes ),
            shouldRenderDeleteUserBoxAndAccessLevelsBox: util.setDefault(

                nextProps.shouldRenderDeleteUserBoxAndAccessLevelsBox,
                false
            )
        };
    }

    static getExpandIconText( shouldExpand ) {

        return shouldExpand === true ? 'keyboard_arrow_up' : 'keyboard_arrow_down';

    }

    handleChevronIconClick() {

        let shouldExpand = !this.state.shouldRenderAccessLevelsBox;

        this.setState( { 

            shouldRenderAccessLevelsBox: shouldExpand,
            chevronIconText: UserStrip.getExpandIconText( shouldExpand )

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

            <React.Fragment>
                User Access Levels
            </React.Fragment>
        );   
    }

    renderDeleteUserBox() {

        return (

            <React.Fragment>
                <div className="user-strip__delete-user__confirmation">Are you sure want to delete this user?</div>
                <div className="user-strip__delete-user__buttons">
                    <button
                        className="user-strip__delete-user__buttons__yes"
                        onClick={ this.handleDeleteUserYesButtonClick }
                    >
                        Yes
                    </button>
                    <button 
                        className="user-strip__delete-user__buttons__no"
                        onClick={ this.handleDeleteUserNoButtonClick }
                    >   
                        No
                    </button>
                </div>
            </React.Fragment>
        );
    }

    render() {

        let user = this.state.user;
        let deleteIconClassName = 'user-strip__delete-icon';

        if ( this.state.shouldRenderDeleteUserBox === true ) {

            deleteIconClassName += ' user-strip__delete-icon--active';
        }
        else {

            deleteIconClassName += ' user-strip__delete-icon--inactive';
        }

        let accessLevelsBoxClassName = 'user-strip__access-levels';

        if ( this.state.shouldRenderAccessLevelsBox === true ) {

            accessLevelsBoxClassName += ' user-strip__access-levels--active';
        }

        let deleteUserBoxClassName = 'user-strip__delete-user';

        if ( this.state.shouldRenderDeleteUserBox === true ) {

            deleteUserBoxClassName += ' user-strip__delete-user--active';
        }

        console.log( 'user-strip', user );

        return (

            <div className="user-strip">
                <div className="user-strip__main">
                    <div 
                        className={ deleteIconClassName }
                        onClick={ this.handleDeleteIconClick }
                    >
                         <i className="material-icons">delete_forever</i>
                    </div>
                    <div 
                        className="user-strip__expand-icon" 
                        onClick={ this.handleChevronIconClick }
                    >
                        <i className="material-icons">{ this.state.chevronIconText }</i>
                    </div>
                    <div className="user-strip__top-bar">
                        <span className="user-strip__full-name">{ user.fullName }</span>
                        <span className="user-strip__top-org">{ user.topOrgName }</span>
                    </div>
                    <div className="user-strip__middle-bar">
                        <div className="user-strip__org">{ user.orgName }</div>
                    </div>
                </div>
                <div className={ accessLevelsBoxClassName }>
                    { this.state.shouldRenderAccessLevelsBox && this.renderAccessLevelsBox() }
                </div>
                <div className={ deleteUserBoxClassName }>
                    { this.state.shouldRenderDeleteUserBox && this.renderDeleteUserBox() }
                </div>
            </div>
        );
    }
}

export {

    UserStrip,
};

