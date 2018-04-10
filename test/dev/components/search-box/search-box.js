import React from 'react';
import ReactDOM from 'react-dom';
import SearchBox from '../../../../src/components/search-box/search-box.js';

require( '../../../../less/components/search-box.less' );

ReactDOM.render(

    <SearchBox />,
    document.getElementById( 'search-box' )
);
