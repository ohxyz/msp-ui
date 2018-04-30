import React from 'react';
import ReactDOM from 'react-dom';
import { UserStrip } from '../../../../src/components/user-list/user-strip.js';
import { UserList } from '../../../../src/components/user-list/user-list.js';
import { UserProfile } from '../../../../src/components/core/user-profile.js';
import '../../../../less/components/user-list.less';

const faker = require( 'faker' );
const NUM = 10;
const NUM_OF_SAME_FIRST_NAME = 5;

let userProfile = new UserProfile( { firstName: 'John', lastName: 'Town', group: 'Dept A', topGroup: 'Victoria' } );
let users = [];

for ( let i = 0; i < NUM; i ++ ) {

    let firstName = faker.name.firstName()

    for ( let j = 0; j < NUM_OF_SAME_FIRST_NAME; j ++ ) {

        let user = {

            firstName: firstName,
            lastName: faker.name.lastName(),
            orgName: faker.company.companyName(),
            topOrgName: faker.commerce.department(),
        };

        users.push( user );
    }
}

ReactDOM.render(

    <UserStrip user={ userProfile } />,
    document.getElementById( 'user-strip' )
);

ReactDOM.render(

    <UserList 
        users={ users } 
        onRenderCount={ count => `In total, ${count} users found.` }
        sortByFields={ [ 'firstName', 'lastName' ] }
    />,
    document.getElementById( 'user-list' )
);