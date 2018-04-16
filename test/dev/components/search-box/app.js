import React from 'react';
import ReactDOM from 'react-dom';
import SearchBox from '../../../../src/components/search-box/search-box.js';
import SearchBoxList from '../../../../src/components/search-box/search-box-list.js';

require( '../../../../less/components/search-box.less' );

const faker = require( 'faker' );

const depts = [

    'abcd', 'abce', 'bcde', 'cdef', 'cefg', 'defg', 'efgh'
];

const usersOrgs = [

    { 'org': 'abcd Education', name: 'abcd' },
    { 'org': 'abce Health', name: 'abce health people' },
    { 'org': 'abcde Transport' },
    { 'name': 'Mr abcdg ' },
    { 'name': 'abcd lady', 'org': 'abce LADY GROUP' }
];

/*
const NUM_OF_USERS = 100;

let orgs = [

    'Health', 'Justice', 'Education', 'Transport',
    'Agency A', 'Agency B',
    'Department C', 'Department D',
    'Site E', 'Site F'
]

let users = [];

for ( let i = 0; i < NUM_OF_USERS; i ++ ) {

    let randomOrg = orgs[ Math.floor( Math.random() * Math.floor( orgs.length ) ) ];

    let user = {

        name: faker.name.findName(),

        org: faker.company.companyName() + ' ' + randomOrg,

    };

    users.push( user );
}
*/

ReactDOM.render(

    <SearchBox
        id="seach-box-users" 
        placeholder="Search users by name, department or agency" 
        items={ usersOrgs } 
        fields={ [ 'org', 'name' ] }
    />,
    document.getElementById( 'search-box-1' )
);

/*
ReactDOM.render(

    <SearchBox id="seach-box-orgs" placeholder="Search" items={ depts } />,
    document.getElementById( 'search-box-2' )
);

ReactDOM.render(

    <SearchBoxList id="my-list" items={ depts } />,
    document.getElementById( 'search-box-list' )
);

*/