const SearchUsersApp = require( '../index.js' ).SearchUsersApp;

describe( 'SearchUsersApp Instance', () => { 

    let arg = {

        id: 'app-1',
        sapData: { results: [] },
        domElement: null,
    };

    let app = new SearchUsersApp( arg );

    test( 'searchUsersReactComponent is null when instantiated', () => { 

        expect( app.searchUsersReactComponent ).toBe( null );

    } );

    test( 'should throw an error if there is no sapData when reload', () => { 

        expect( () => { app.reload() } ).toThrow();

    } );

} );
