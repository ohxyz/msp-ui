/* User List component 
 * 
 * Markups:
 * 
 * <UserList users={ UserProfile[] } /> 
 *
 */

const React = require( 'react' );
const util = require( '../core/util.js' );
const UserStrip = require( './user-strip.js' ).UserStrip;

class UserList extends React.Component {

    constructor( props ) {

        super( props );

        this.state = {

            users: [],
            shouldRenderCount: true,
            onRenderCount: new Function()
        };
    }

    static getDerivedStateFromProps( nextProps, prevState ) {
        
        return {

            users: util.setDefault( nextProps.users, [] ),
            shouldRenderCount: util.setDefault( nextProps.shouldRenderCount, true ),
            onRenderCount: util.setDefault( nextProps.onRenderCount, new Function ),
        };
    }

    renderCount() {

        if ( this.state.shouldRenderCount === false ) {

            return;
        }

        let count = this.state.users.length;

        return (

            <div className="user-list__count">
                <span className="user-list__count__literal">{ this.state.onRenderCount( count ) }</span>
            </div>

        );
    }

    render() {

        return (

            <div className="user-list">
            { this.renderCount() }
            {
                this.state.users.map( ( user, key ) => 

                    <UserStrip key={ key } user={ user } />
                )
            }
            </div>
        );
    }
}

module.exports = {

    UserList
}