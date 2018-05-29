import React from 'react';
import { SearchUsers } from '../search-users.js';
import renderer from 'react-test-renderer';
import { HierarchyStorage } from '../../core/hierarchy-storage.js';

it( 'should render with defaults', () => {

    let sap = { results: [] };
    let hs = new HierarchyStorage( sap );

    const tree = renderer
        .create( <SearchUsers storage={ hs } /> )
        .toJSON();

    expect( tree ).toMatchSnapshot();

} );

describe( 'SearchUsers Class', () => { 

    test( 'static method should throw an error', () => {
        
        expect( () => SearchUsers.getDerivedStateFromProps( {} ) ).toThrow();
    } ) 

} );

describe( 'SearchUsers Instance', () => { 

    let component = new SearchUsers( {} );
    let mockFn = jest.fn();
    component.setState = mockFn;

    let user = {

        fullName: 'Jordan Rancie'
    };

    test( 'will call showAllusers when searchbox \'s text is empty', () => { 

        component.showAllUsers = jest.fn();
        component.handleTextChange( { text: '' } );

        expect( component.showAllUsers.mock.calls.length ).toBe( 1 );
    } );

    test( 'renders a message box when message code is 200', () => {

        let result = component.renderMessageBox( '200', user )

        expect( result ).not.toBe( null );

    } );

    test( 'renders a message box when message code is 4xx', () => {

        let result = component.renderMessageBox( '4xx', user )

        expect( result ).not.toBe( null );

    } );

} );