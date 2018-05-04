import React from 'react';
import { MessageBox } from '../message-box.js';
import renderer from 'react-test-renderer';

it( 'should render with defaults', () => { 

    const tree = renderer
        .create( <MessageBox title="Hi" content="Hello there!"/> )
        .toJSON();

    expect( tree ).toMatchSnapshot();

} );
