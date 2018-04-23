import React from 'react';
import ReactDOM from 'react-dom';
import SearchBox from '../../../../src/components/search-box/search-box.js';

require( '../../../../less/components/search-box.less' );

const depts = [

    'abcd', 'abce', 'bcde', 'cdef', 'cefg', 'defg', 'efgh'
];

const usersOrgs = [

    { 'org': 'abcd Education', name: 'abcd' },
    { 'org': 'abce Health', name: 'abce health people' },
    { 'org': 'abcde Transport' },
    { 'name': 'Mr abcdg ' },
    { 'name': 'abcd lady', 'org': 'abce LADY GROUP' },
    { 'org': 'Testing Health', name: 'Test Health' },
    { 'org': 'UAT Health', name: 'The health in Test' },
    { 'org': 'New Transport' },
    { 'name': 'Mr Jack' },
    { 'name': 'Finance Testing', 'org': 'THE FINANCE GROUP' },
    { 'name': 'abcd final', 'org': 'abce final GROUP' }
];

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
*/
