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

    let userList = new UserStrip();
    let mockFn = jest.fn();

    userList.setState = mockFn;

    beforeEach(() => {

        mockFn.mockClear();
    });

    test( "changes it's state after calling handleChevronIconClick", () => { 

        userList.handleChevronIconClick();
        expect( mockFn.mock.calls.length ).toBe( 1 );

    } );

    test( "changes it's state after calling handleDeleteIconClick", () => { 

        userList.handleDeleteIconClick();
        expect( mockFn.mock.calls.length ).toBe( 1 );

    } );

    test( "calls it's prop's onDeleteUserYesButtonClick", () => { 

        userList.state.onPropsDeleteUserYesClick = mockFn;
        mockFn.mockReturnValue( new Promise( ( resolve, reject ) => {} ) );
        userList.handleDeleteUserYesButtonClick();

        expect( mockFn.mock.calls.length ).toBe( 1 );

    } );

    test( "change's its state after calling No button is clicked ", () => { 

        userList.state.onPropsDeleteUserYesClick = mockFn;
        userList.handleDeleteUserNoButtonClick();

        expect( mockFn.mock.calls.length ).toBe( 1 );
    } );

    test( "change's its state after calling Delete Icon is clicked ", () => { 

        userList.handleDeleteIconClick();

        expect( mockFn.mock.calls.length ).toBe( 1 );
        
    } );

} );