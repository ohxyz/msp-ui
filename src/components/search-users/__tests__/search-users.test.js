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