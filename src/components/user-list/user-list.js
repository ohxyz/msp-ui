/* User List component 
 * 
 * Markups:
 * 
 * <UserList users={ someUsers } /> 
 *
 */

import React from 'react';

class UserList extends React.Component {

    render() {

        return (

            <div className="user-list">
                <div className="user-list__user">
                    <div className="user-list__name">Matthew Guy</div>
                    <div className="user-list__organisation">Liberal Party</div>
                </div>
            </div>
        )
    }
}

export default UserList;