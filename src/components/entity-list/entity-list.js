/* User List component 
 * 
 * Markups:
 * 
 * <UserList entities={ UserProfile[] } /> 
 *
 */

import React from 'react';

class UserList extends React.Component {

    constructor( props ) {

        super( props );

        this.state = {

            entities: []
        }
    }

    static getDerivedStateFromProps( nextProps, prevState ) {
        
        return {

            entities: setDefault( nextProps.entities, [] )
        };
    }

    render() {

        return (

            <div className="user-list">
            {
                this.state.entities.map( () => { 




                } );
            }
            </div>
        )
    }
}

export default UserList;