import React from 'react';
import ReactDOM from 'react-dom';
import { UserStrip } from '../../../../src/components/user-list/user-strip.js';
import { UserList } from '../../../../src/components/user-list/user-list.js';

require( '../../../../less/components/user-list.less' );

const faker = require( 'faker' );
const NUM = 10;
const NUM_OF_SAME_FIRST_NAME = 5;

let users = [];

for ( let i = 0; i < NUM; i ++ ) {

    let firstName = faker.name.firstName()

    for ( let j = 0; j < NUM_OF_SAME_FIRST_NAME; j ++ ) {

        let user = {

            firstName: firstName,
            lastName: faker.name.lastName(),
            org: faker.company.companyName(),
            topOrg: faker.commerce.department(),
        }
        
        users.push( user );
    }
}

ReactDOM.render(

    <UserList 
        users={ users } 
        onRenderCount={ count => `In total, ${count} users found.` }
        sortByFields={ [ 'firstName' ] }
    />,
    document.getElementById( 'user-list' )
);