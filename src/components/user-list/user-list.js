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

            <div class="user-list">
                <div class="user-list__user">
                    <div class="user-list__name">Matthew Guy</div>
                    <div class="user-list__organisation">Liberal Party</div>
                </div>
            </div>
        )
    }
}

export default UserList;