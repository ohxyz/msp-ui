const util = require( '../core/util.js' );
const React = require( 'react' );
const UserProfile = require( '../core/user-profile.js' ).UserProfile;

function getExpandIconText( shouldExpand ) {

    return shouldExpand === true ? 'remove' : 'add';

}

class UserStrip extends React.Component {

    constructor( props ) {

        super( props );

        this.handleExpandClick = this.handleExpandClick.bind( this );

        this.state = {

            user: null,
            shouldDropDownExpanded: false,
            expandIconText: 'add'
        };
    }

    static getDerivedStateFromProps( nextProps, prevState ) {

        let shouldExpand = util.setDefault( nextProps.shouldDropDownExpanded, false );
        
        return {

            user: util.setDefault( new UserProfile( nextProps.user ), new UserProfile() ),
            shouldDropDownExpanded: shouldExpand,
            expandIconText: getExpandIconText( shouldExpand )
        };
    }

    handleExpandClick() {

        let shouldExpand = !this.state.shouldDropDownExpanded;

        this.setState( { 

            shouldDropDownExpanded: shouldExpand,
            expandIconText: getExpandIconText( shouldExpand )

        } );
    }

    renderDropDown() {

        if ( this.state.shouldDropDownExpanded === true ) {

            return (

                <div className="user-strip__dropdown">
                    <div className="user-strip__dropdown__content">User access level</div>
                </div>
            );
        }
    }

    render() {

        let user = this.state.user;

        return (

            <div className="user-strip">
                <div className="user-strip__main">
                    <div className="user-strip__delete material-icons">close</div>
                    <div 
                        className="user-strip__expand material-icons" 
                        onClick={ this.handleExpandClick }
                    >
                        { this.state.expandIconText }
                    </div>
                    <div className="user-strip__top-bar">
                        <span className="user-strip__full-name">{ user.fullName }</span>
                        <span className="user-strip__top-org">{ user.topOrg }</span>
                    </div>
                    <div className="user-strip__middle-bar">
                        <div className="user-strip__org">{ user.org }</div>
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

