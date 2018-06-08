import React from 'react';
import ReactDOM from 'react-dom';
import { MessageBox } from '../../../../src/components/message-box/message-box.js';
import '../../../../less/components/message-box.less';

const CHANGE_CONTENT = 'CHANGE_CONTENT';
const SET_MESSAGE_TYPE = 'SET_MESSAGE_TYPE';

const MessageTypes = {

    INFO: 'INFO',
    SUCCESS: 'SUCCESS',
    WARNING: 'WARNING'
};

function changeContent( content ) {

    return {

        type: CHANGE_CONTENT,
        content,
    };
}

function setMessageType( messageType ) {

    return {

        type: SET_MESSAGE_TYPE,
        messageType
    };
}


const initialState = {

    messageType: MessageTypes.INFO,
    content: 'Content 1'
};


function messageBoxApp( state = initialState, action ) {

    switch ( action.type ) {

        case CHANGE_CONTENT:

            return Object( {}, state, { content: action.content } );

        case SET_MESSAGE_TYPE:

            return Object.assign( {}, state, { messageType: action.filter } );

        default:

            return state;
    }

    return state;
}


let m1 = {

    title: 'M1 TITLE',
    content: 'Cloud content',
    type: 'success',
};

ReactDOM.render( 

    <MessageBox 
        iconStyle={ m1.icon } 
        type={ m1.type } 
        content={ m1.content }
        title={ m1.title }
        onMount={ () => console.log( 0, 'mount' ) }
        onDismiss={ () => console.log( 1, 'dismiss' ) } 
    />,
    document.getElementById( 'message-box-1' )
);

