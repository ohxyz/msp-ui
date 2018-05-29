import React from 'react';
import { UserStrip } from '../user-strip.js';
import ReactTestRender from 'react-test-renderer';

it( 'should render with defaults', () => {

    let user = { 

        fullName: 'Full Name',
        topOrgName: 'Top Orgnisation Name',
        orgName: 'Orgnisation Name'
    };
    
    const tree = ReactTestRender
        .create( <UserStrip user={ user }/> )
        .toJSON();

    expect( tree ).toMatchSnapshot();

} );


describe( 'UserStrip instance', () => { 

    let userStrip = new UserStrip();
    let mockFn = jest.fn();

    userStrip.setState = mockFn;

    beforeEach(() => {

        mockFn.mockClear();
    });

    test( "changes it's state after calling handleChevronIconClick", () => { 

        userStrip.handleChevronIconClick();
        expect( mockFn.mock.calls.length ).toBe( 1 );

    } );

    test( "changes it's state after calling handleDeleteIconClick", () => { 

        userStrip.handleDeleteIconClick();
        expect( mockFn.mock.calls.length ).toBe( 1 );

    } );

    test( "change's its state after calling No button is clicked ", () => { 

        userStrip.state.onPropsDeleteUserYesClick = mockFn;
        userStrip.handleDeleteUserNoButtonClick();

        expect( mockFn.mock.calls.length ).toBe( 1 );
    } );

    test( "change's its state after calling Delete Icon is clicked ", () => { 

        userStrip.handleDeleteIconClick();

        expect( mockFn.mock.calls.length ).toBe( 1 );
        
    } );

} );