import React from 'react';
import ReactDOM from 'react-dom';
import { MessageBox } from '../../../../src/components/message-box/message-box.js';

import '../../../../less/components/message-box.less';

let m1 = {

    title: 'Cloud title 2',
    content: 'Cloud content',
    type: 'success',
};

let m2 = {

    type: 'error',
    title: 'Users not found',
    content: 'Search again'
};


ReactDOM.render( 

    <MessageBox 
        iconStyle={ m1.icon } 
        type={ m1.type } 
        content={ m1.content }
        onMount={ () => console.log( '0 mount' ) }
        onDismiss={ () => console.log( '1 dismiss' ) } 
    />,
    document.getElementById( 'message-box-1' )
);

