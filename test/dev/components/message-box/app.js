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

    <MessageBox iconStyle={ m1.icon } type={ m1.type } title={ m1.title } content={ m1.content } />,
    document.getElementById( 'message-box-1' )
);


ReactDOM.render( 

    <MessageBox type={ m2.type } title={ m2.title } content={ m2.content } />,
    document.getElementById( 'message-box-2' )
);