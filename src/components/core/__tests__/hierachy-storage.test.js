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


describe( 'HierarchyStorage that has valid SAP data', () => {

    let storage = new HierarchyStorage( dummySapObject );

    storage.process();

    test( 'has a list of acounts', () => { 

        expect( storage.accounts.length > 0 ).toBe( true );
    } );

    test( 'can get parent ID of it\'s node', () => { 

        expect( storage.accounts[ 2 ].parentId ).toBe( "CA2B1FE6-D50C-1ED6-B5FC-07B7BC728307" );

    } );

    test( 'can assign users to an orgnisation', () => {

        let account = storage.accounts[ 3 ];
        expect( account.users[ 1 ].firstName ).toBe( 'Jan-Marie' );

    } );

    test( 'can assign Parent', () => { 

        let node = storage.nodes[ 8 ].parent.parent.parent;
        expect( node.level ).toBe( '1' );
    } );

    test( 'can get users by hierarchy ID', () => { 

        let hid = "CA2B1FE6-D50C-1ED7-BD9E-55E1ACCF4802";
        let users = storage.getUsersByHierarchyId( hid );

        expect( users.length ).toBe( 1 );
    } );

    test( 'can get users by hierarchy ID until some level', () => { 

        let hid = "CA2B1FE6-D50C-1ED8-8AFB-D6D075228702";
        let users = storage.getUsersByHierarchyId( hid, 2 );

        expect( users.length ).toBe( 3 );
    } );

    test( 'throws an error when adding a user but can not find Hierarchy ID', () => { 

        let user = { hierarchyId: '1234', firstName: 'Tom', lastName: 'Lu', emailAddress: 'tom.lu@tom.lu' };
        expect( () => storage.addUser( user ) ).toThrow();

    } );

    test( 'can add a user', () => {

        let hid = "CA2B1FE6-D50C-1ED8-8AFC-D71F61F20303";
        let user = { hierarchyId: hid, firstName: 'Tom', lastName: 'Lu', emailAddress: 'tom.lu@tom.lu' };

        storage.addUser( user );

        expect( storage.nodes[ 3 ].accounts.length ).toBe( 2 );

    } );

    test( 'can add a user again', () => {

        let hid = "CA2B1FE6-D50C-1ED8-8AFC-D71F61F20303";
        let user = { hierarchyId: hid, firstName: 'Tom', lastName: 'Cruise', emailAddress: 'tom.cruise@tom.cruise' };

        storage.addUser( user );
        
        expect( storage.nodes[ 3 ].users.length ).toBe( 2 );
    } );

} );


describe( 'HierarchyStorage that has SAP data from session', () => {

    let storage = new HierarchyStorage( sessionObject.userHierarchy );
    storage.process();

    test( 'can get 0 users by hierarchy ID', () => { 

        let hid = "00215A9B-AA4A-1EE7-83A4-CFB9DBFF038B";
        let users = storage.getUsersByHierarchyId( hid );

        expect( users.length ).toBe( 0 );
    } );

    test( 'can get 10 users by hierarchy ID', () => { 

        let hid = "00215A9C-536A-1ED8-929B-5E0739B2D4B7";
        let users = storage.getUsersByHierarchyId( hid );

        expect( users.length ).toBe( 10 );
    } );
} );