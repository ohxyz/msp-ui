import React from 'react';
import ReactDOM from 'react-dom';
import SearchBox from '../../../../src/components/search-box/search-box.js';

require( '../../../../less/components/search-box.less' );

const users = [

    'Apple', 'Banana', 'Cat', 'Dog', 'Elphant',
    'abcd', 'abce', 'bcde', 'cdef', 'cefg', 'defg', 'efgh'
];

const usersOrgs = [

    { 'org': 'abcd Education', name: 'abcd' },
    { 'org': 'abce Health', name: 'abce health people' },
    { 'org': 'abcde Transport' },
    { 'name': 'Mr abcdg ' },
    { 'name': 'abcd lady', 'org': 'abce LADY GROUP' }
];

ReactDOM.render(

    <SearchBox id="seach-box-users" items={ usersOrgs } fields={ [ 'org', 'name' ] }/>,
    document.getElementById( 'root' )
);
