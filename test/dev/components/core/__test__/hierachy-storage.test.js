const HierarchyStorage = require( '../../../../../src/components/core/hierarchy-storage.js' ).HierarchyStorage;
const dummySapObject = require( './dummy-sap.js' ).dummySapObject;

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

    test( 'can get users', () => { 

        expect( storage.users.length > 0 ).toBe( true );
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


} );