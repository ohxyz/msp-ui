import React from 'react';
import ReactDOM from 'react-dom';

import { UserStrip } from '../../../../src/components/user-list/user-strip.js';
import { UserList } from '../../../../src/components/user-list/user-list.js';
import { UserProfile } from '../../../../src/model/user-profile.js';

require( '../../../../less/components/user-list.less' );

const faker = require( 'faker' );
const NUM = 20;

let user = new UserProfile( { firstName: 'John', lastName: 'Town', group: 'Dept A', topGroup: 'Victoria' } );
let users = [];

for ( let i = 0; i < NUM; i ++ ) {

    let user = {

        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        group: faker.company.companyName(),
        topGroup: faker.commerce.department(),
    }

    users.push( user );
}

ReactDOM.render(

    <UserList 
        users={ users } 
        onRenderCount={ count => `In total, ${count} users found.` }
        sortByFields={ [ 'firstName' ] }
    />,
    document.getElementById( 'user-list' )
);