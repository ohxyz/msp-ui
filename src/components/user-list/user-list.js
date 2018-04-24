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
            onRenderCount: new Function(),
            sortByFields: []
        };
    }

    static getDerivedStateFromProps( nextProps, prevState ) {
        
        return {

            users: util.setDefault( nextProps.users, [] ),
            shouldRenderCount: util.setDefault( nextProps.shouldRenderCount, true ),
            onRenderCount: util.setDefault( nextProps.onRenderCount, new Function() ),
            sortByFields: util.setDefault( nextProps.sortByFields, [] )
        };
    }

    // Todo: sort by multiple fields. Right now only one
    sortUsersByFields( users, fieldNames ) {

        if ( Array.isArray( fieldNames) === false || fieldNames.length === 0 ) {

            return users;
        }

        // let field = fieldNames[ 0 ];

        function compare( a, b, fields, fieldIndex ) {

            let field = fields[ fieldIndex ];

            return a[ field ].localeCompare( b[ field ] );
        }

        return users.sort( ( a, b ) => {

            let result = 0;

            for ( let i = 0; i < fieldNames.length; i ++ ) {

                result = compare( a, b, fieldNames, i )

                if ( result !== 0 ) {

                    return result;
                }
            }

            return result;

        } );

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

        let users = this.sortUsersByFields( this.state.users, this.state.sortByFields );

        return (

            <div className="user-list">
            { this.renderCount() }
            {
                users.map( ( user, key ) => {

                    return <UserStrip key={ key } user={ user } />
                } )
            }
            </div>
        );
    }
}

module.exports = {

    UserList
};