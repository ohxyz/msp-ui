import React from 'react';
import ReactDOM from 'react-dom';
import { MessageBox } from '../../../../src/components/message-box/message-box.js';

import '../../../../less/components/message-box.less';

let m1 = {

    icon: 'cloud',
    title: 'Cloud title',
    content: 'Cloud content'
};

let m2 = {

    type: 'info',
    title: 'Users not found',
    content: 'Search again'
};


ReactDOM.render( 

    <MessageBox iconStyle={ m1.icon } title={ m1.title } content={ m1.content } />,
    document.getElementById( 'message-box-1' )
);


ReactDOM.render( 

    <MessageBox type={ m2.type } title={ m2.title } content={ m2.content } />,
    document.getElementById( 'message-box-2' )
);