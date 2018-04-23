import React from 'react';
import ReactDOM from 'react-dom';
import SearchBox from '../../../../src/components/search-box/search-box.js';
import SearchBoxList from '../../../../src/components/search-box/search-box-list.js';
import { SearchItem } from '../../../../src/components/search-box/data-model.js';

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

const entities = [

    { name: 'x', content: 'abcd', value: { id: '1234' } },
    new SearchItem( { name: 'y', content: 'abce', value: { a: 3, b: 4 } } ),
    new SearchItem( { content: 'bcde', value: { a: 5, b: 6 } } )
];

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

ReactDOM.render(

    <SearchBox
        id="seach-box-users"
        name="my-box"
        onSelect={ ( item, self ) => { console.log( '*', item ); } }
        onIconClick= { obj => { console.log( '**', obj ); obj.showAllItems(); } }
        onChange= { obj => console.log( '***', obj ) }
        placeholder="Search users by name, department or agency"
        onFocus={ self => { console.log( 'focus', self ); } }
        onBlur={ self => console.log( 'blur', self ) }
        items={ users }
        iconStyle="add"
        fields={ [ 'org', 'name' ] }
        strikes={ 3 }
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