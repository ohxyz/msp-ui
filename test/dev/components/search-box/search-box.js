import React from 'react';
import ReactDOM from 'react-dom';
import SearchBox from '../../../../src/components/search-box/search-box.js';

require( '../../../../less/components/search-box.less' );

const users = [

    'Apple', 'Banana', 'Cat', 'Dog', 'Elphant',
    'abc', 'abe', 'bcd', 'cde', 'cdf', 'def', 'efg'
];

ReactDOM.render(

    <SearchBox items={ users } />,
    document.getElementById( 'root' )
);
