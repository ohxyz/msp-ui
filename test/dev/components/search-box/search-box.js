import React from 'react';
import ReactDOM from 'react-dom';
import SearchBox from '../../../../src/components/search-box/search-box.js';

require( '../../../../less/components/search-box.less' );

const users = [

    'Apple', 'Banana', 'Cat', 'Dog', 'Elphant',
    'abcd', 'abce', 'bcde', 'cdef', 'cefg', 'defg', 'efgh'
];

ReactDOM.render(

    <SearchBox items={ users } />,
    document.getElementById( 'root' )
);
