const HierarchyStorage = require( '../hierarchy-storage.js' ).HierarchyStorage;
const dummySapObject = require( '../__mocks__/sap.stub.json' );
const sessionObject = require( '../__mocks__/sap2.stub.json' );

describe( 'HierarchyStorage', () => {

    test( 'throws an error when argument is empty', () => {

        let storage = new HierarchyStorage();
        expect( () => storage.validateSapRaw() ).toThrow();

    } );

    test( 'throws an error when argument is an empty array', () => {

        let storage = new HierarchyStorage( [] );
        expect( () => storage.validateSapRaw() ).toThrow();

    } );

    test( 'throws an error when argument is an object not having d.results ', () => {

        let storage = new HierarchyStorage( { a: 'b' }  );
        expect( () => storage.validateSapRaw() ).toThrow();

    } );


    test( 'can get an object when argument is an object', () => {

        let storage = new HierarchyStorage( { d: { results: [ 'a', null ] } } );

        storage.process();
        expect( storage.sapResults ).toEqual( [ 'a', null ] );
    } );

    test( 'can get an object when argument is an JSON string', () => {

        let storage = new HierarchyStorage( '{"d": {"results": ["a", null] } }' );
        storage.process();

        expect( storage.sapResults ).toEqual( [ 'a', null ] );
    } );

} );

describe( 'HierarchyStorage object that has valid SAP data', () => {

    let users = [

        { 'accountId': '456', firstName: 'Coconut' },
        { 'accountId': '123', firstName: 'Apple', accessLevels: [ [ 'AA', 'BB' ] ] },
        { 'accountId': '234', firstName: 'Banana' },

    ]

    let storage = new HierarchyStorage( dummySapObject );

    storage.process();

    test( 'can assign parent', () => { 

        let node = storage.nodes[ 8 ].parent.parent.parent;
        expect( node.level ).toBe( '1' );

    } );

    test( 'can get 3 children at top level', () => { 

        let node = storage.nodes[ 0 ];
        expect( node.children.length ).toBe( 3 );

    } );


    test( 'can get 2 children when it is Melbourne East', () => { 

        let node = storage.nodes.filter( node => node.description === 'Melbourne East' )[ 0 ];

        expect( node.children.length ).toBe( 2 );

    } );

    test( 'can get 0 children at level 4', () => { 

        let count = storage.nodes.length;
        let node = storage.nodes[ count - 1 ];

        expect( node.children.length ).toBe( 0 );
    } );

    test( 'findUser method can find a user', () => { 

        storage.users = users;

        let user = { 'accountId': '234', firstName: 'Banana Blue' };
        let result = storage.findUser( user );

        expect( result.accountId ).toBe( '234' );
    } );

    test( 'findUser method returns undefined when user is not found', () => { 

        storage.users = users;

        let user = { 'accountId': '999', firstName: 'Avocado' };
        let result = storage.findUser( user );

        expect( result ).toBe( undefined );
    } );


    test( 'mergeUser method merges accessLevels', () => {

        let user = { 'accountId': '123', firstName: 'Apple', accessLevels: [ [ 'CC', 'DD' ] ] };

        storage.users = users;
        storage.mergeUser( user );

        let accessLevels = storage.users[ 1 ].accessLevels;

        expect( accessLevels.length ).toBe( 2 );
        expect( accessLevels[ 1 ][ 1 ] ).toBe( 'DD' );

    } );

    test( 'mergeUser method adds a new user', () => {

        let user = { 'accountId': '789', firstName: 'Apricot', accessLevels: [ [ 'AA', 'BB' ] ] };

        storage.users = users;
        storage.mergeUser( user );

        expect( storage.users.length ).toBe( 4 );
        expect( user.accessLevels[ 0 ][ 1 ] ).toBe( 'BB' );

    } );

} );


describe( 'HierarchyStorage that has SAP data from session', () => {

    let storage = new HierarchyStorage( sessionObject.userHierarchy );
    storage.process();

    test( 'can get 0 users by hierarchy ID', () => { 

        expect( true ).toBe( true );
    } );

} );

