import util from '../../helpers/util.js';
import React from 'react';
import { User } from '../core/user.js';

class UserStrip extends React.Component {

    constructor( props ) {

        super( props );

        this.handleChevronIconClick = this.handleChevronIconClick.bind( this );
        this.handleDeleteIconClick = this.handleDeleteIconClick.bind( this );
        this.handleDeleteUserNoButtonClick = this.handleDeleteUserNoButtonClick.bind( this );
        this.handleMoreClick = this.handleMoreClick.bind( this );

        this.state = {

            user: null,
            shouldRenderDeleteUserBox: false,
            shouldRenderAccessLevelsBox: false,
            chevronIconText: 'keyboard_arrow_down',
            onPropsDeleteUserYesClick: new Function(),
            onPropsDeleteUserIconClick: new Function(),
            index: -1
        };
    }

    static getDerivedStateFromProps( nextProps, prevState ) {

        return {

            index: util.setDefault( nextProps.index, -1 ),
            user: util.setDefault( new User( nextProps.user ), new User() ),
            onPropsDeleteUserYesClick: util.setDefault( nextProps.onDeleteUserYesClick, new Function() ),
            onPropsDeleteUserIconClick: util.setDefault( nextProps.onDeleteUserIconClick, new Function() ),
            shouldRenderDeleteUserBox: util.setDefault( nextProps.shouldRenderDeleteUserBox, false ),
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

    handleDeleteIconClick( index ) {

        this.state.onPropsDeleteUserIconClick( index );
    }

    handleDeleteUserNoButtonClick() {

        this.setState( { 

            shouldRenderDeleteUserBox: false
        } );
    }

    handleMoreClick() {

        this.handleChevronIconClick();
    }

    renderAccessLevelBreadCrumb( accessLevelNames, index ) {

        if ( Array.isArray( accessLevelNames ) === false || accessLevelNames.length === 0 ) {

            return;
        }
        else if ( accessLevelNames.length === 1 ) {

            return <div className="user-strip__access-level" key={ index }>{ accessLevelNames[ 0 ] }</div>
        }

        return (

            <div className="user-strip__access-level" key={ index } >
                {
                    accessLevelNames.reduce( ( bread, crumb ) => 
                        
                        <React.Fragment>
                            { bread }
                            <i className="material-icons">keyboard_arrow_right</i>
                            { crumb }
                        </React.Fragment>
                    )
                }
            </div>
        )
    }

    renderAccessLevelsBox() {

        return (

            <React.Fragment>
                <div className="user-strip__title">User's access level/s</div>
                {
                    this.state.user.accessLevels.map( ( eachAccessLevel, index ) => 

                        this.renderAccessLevelBreadCrumb( eachAccessLevel, index )
                    )
                }
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
                        onClick={ () => this.state.onPropsDeleteUserYesClick( this.state.user ) }
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

    renderAdminTag() {

        return <span className="user-strip__admin">Admin</span>;
    }

    renderMoreTag() {

        return <span className="user-strip__more" onClick={ this.handleMoreClick } >More</span>;
    }

    renderOrganisationName( name ) {

        return <span className="user-strip__org">{ name }</span>
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

        return (

            <div className="user-strip">
                <div className="user-strip__main">
                    <div 
                        className={ deleteIconClassName }
                        onClick={ () => this.handleDeleteIconClick( this.state.index ) }
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
                        <span style={ { color: 'red' } } >{ user.accountId } </span>
                        <span className="user-strip__full-name">{ user.fullName }</span>
                        <span className="user-strip__top-org">{ user.topNodeDescription }</span>
                        { user.isAdmin && this.renderAdminTag() }
                    </div>
                    <div className="user-strip__middle-bar">
                        { user.organisationName.length > 0 && this.renderOrganisationName( user.organisationName ) }
                        { user.accessLevels.length > 1 && this.renderMoreTag() }
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

