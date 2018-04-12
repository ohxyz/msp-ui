import React from 'react';
import ReactDOM from 'react-dom';
import UserList from '../../../../src/components/user-list/user-list.js';

require( '../../../../less/components/user-list.less' );

ReactDOM.render(

    <UserList />,
    document.getElementById( 'user-list' )
);
