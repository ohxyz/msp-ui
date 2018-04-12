import React from 'react';
import ReactDOM from 'react-dom';
import SearchBox from '../../../../src/components/search-box/search-box.js';

require( '../../../../less/components/search-box.less' );

const users = [

    'Apple', 'Banana', 'Cat', 'Dog', 'Elphant',
    'abcd', 'abce', 'bcde', 'cdef', 'cefg', 'defg', 'efgh'
];

ReactDOM.render(

    <SearchBox id="seach-box-users" items={ users } />,
    document.getElementById( 'root' )
);
