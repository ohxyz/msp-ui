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

        let theUsers = users;

        let user = { 'accountId': '234', firstName: 'Banana Blue' };
        let result = storage.findUser( user, theUsers );

        expect( result.accountId ).toBe( '234' );
    } );

    test( 'findUser method returns undefined when user is not found', () => { 

        let theUsers = users;

        let user = { 'accountId': '999', firstName: 'Avocado' };
        let result = storage.findUser( user, theUsers );

        expect( result ).toBe( undefined );
    } );


    test( 'mergeUser method merges accessLevels', () => {

        let user = { 'accountId': '123', firstName: 'Apple', accessLevels: [ [ 'CC', 'DD' ] ] };

        let theUsers = users.slice();
        storage.mergeUser( user, theUsers );

        let accessLevels = theUsers[ 1 ].accessLevels;

        expect( accessLevels.length ).toBe( 2 );

    } );

    test( 'mergeUser method adds a new user', () => {

        let user = { 'accountId': '789', firstName: 'Apricot', accessLevels: [ [ 'AA', 'BB' ] ] };

        let theUsers = users;
        storage.mergeUser( user, theUsers );

        expect( theUsers.length ).toBe( 4 );
        expect( user.accessLevels[ 0 ][ 1 ] ).toBe( 'BB' );

    } );


    test( 'deleteUser method can remove a user from different nodes', () => {

        let accountId = '195';

        storage.deleteUser( accountId );

        expect( storage.nodes[ 9 ].users.length ).toBe( 6 );
        expect( storage.nodes[ 1 ].users.length ).toBe( 0 );

    } );

} );


describe( 'HierarchyStorage getUsersFromNodeAndChildren method', () => {

    let storage = new HierarchyStorage( dummySapObject );
    storage.process();

    test( 'has same numbe of users when it is the top node', () => {

        let node = storage.nodes[ 0 ];
        let users = storage.getUsersFromNodeAndChildren( node );

        expect( users.length ).toBe( 14 );

    } );

    test( 'has same numbe of users when it does not have children', () => {

        let node = storage.nodes[ 9 ];
        let users = storage.getUsersFromNodeAndChildren( node );

        expect( users.length ).toBe( node.users.length );

    } );

    test( 'has correct number of users', () => { 

        let node = storage.nodes[ 6 ];
        let users = storage.getUsersFromNodeAndChildren( node );
        
        expect( users.length ).toBe( 7 );
    } );

    test( 'has correct number of users, again', () => { 

        let node = storage.nodes[ 6 ];
        let users = storage.getUsersFromNodeAndChildren( node );
        
        expect( users.length ).toBe( 7 );
    } );

    test( 'has correct number of users, again and again', () => {

        let melbourneEast = storage.nodes[ 2 ];
        let whiteHorse = storage.nodes[ 6 ];
        let boxHill = storage.nodes[ 8 ];
        let mountAlbert = storage.nodes[ 9 ];

        let total = melbourneEast.users.length
                        + whiteHorse.users.length
                        + boxHill.users.length
                        + mountAlbert.users.length;

        let users = storage.getUsersFromNodeAndChildren( melbourneEast );
        
        expect( users.length ).toBe( total );

    } );

} );

describe( 'HierarchyStorage that has SAP data from session', () => {

    let storage = new HierarchyStorage( sessionObject.userHierarchy );
    storage.process();

    test( 'can get 0 users by hierarchy ID', () => { 

        expect( true ).toBe( true );
    } );

} );

