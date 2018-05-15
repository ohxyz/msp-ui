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

    test( "changes it's state after calling handleExpandIconClick", () => { 

        userList.handleExpandIconClick();
        expect( mockFn.mock.calls.length ).toBe( 1 );

    } );

    test( "changes it's state after calling handleDeleteIconClick", () => { 

        userList.handleExpandIconClick();
        expect( mockFn.mock.calls.length ).toBe( 1 );

    } );

    test( "changes it's state after calling renderDropDownContent for AccessLevelBox", () => { 

        userList.renderAccessLevelsBox = mockFn;
        userList.state.shouldRenderAccessLevelsBox = true;
        userList.renderDropDownContent();

        expect( mockFn.mock.calls.length ).toBe( 1 );

    } );

    test( "changes it's state after calling renderDropDownContent for DeleteUserBox", () => { 

        userList.renderDeleteUserBox = mockFn;
        userList.state.shouldRenderDeleteUserBox = true;
        userList.renderDropDownContent();

        expect( mockFn.mock.calls.length ).toBe( 1 );

    } );

    test( "calls it's prop's onDeleteUserYesButtonClick", () => { 

        userList.state.onPropsDeleteUserYesClick = mockFn;
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