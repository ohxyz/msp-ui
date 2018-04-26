const BusinessPartnerStorage = require( '../../../../../src/components/core/business-partner-storage.js' ).BusinessPartnerStorage;
const dummySapObject = require( './dummy-sap.js' ).dummySapObject;

describe( 'BusinessPartnerStorage', () => {

    test( 'throws an error when argument is empty', () => {

        let bps = new BusinessPartnerStorage();
        expect( () => bps.validateSapRaw() ).toThrow();

    } );

    test( 'throws an error when argument is an empty array', () => {

        let bps = new BusinessPartnerStorage( [] );
        expect( () => bps.validateSapRaw() ).toThrow();

    } );

    test( 'throws an error when argument is an object not having d.results ', () => {

        let bps = new BusinessPartnerStorage( { a: 'b' }  );
        expect( () => bps.validateSapRaw() ).toThrow();

    } );

    test( 'can get an object when argument is an object', () => {

        let bps = new BusinessPartnerStorage( { d: { results: [ 'a', null ] } } );

        bps.process();        
        expect( bps.sapResults ).toEqual( [ 'a', null ] );
    } );

    test( 'can get an object when argument is an JSON string', () => {

        let bps = new BusinessPartnerStorage( '{"d": {"results": ["a", null] } }' );
        bps.process();

        expect( bps.sapResults ).toEqual( [ 'a', null ] );
    } );

} );


describe( 'BusinessPartnerStorage that has valid SAP data', () => {

    let bps = new BusinessPartnerStorage( dummySapObject );
    bps.process();

    test( 'can get users', () => { 

        expect( bps.users.length > 0 ).toBe( true );
    } );

    test( 'can get parent ID of it\'s node', () => { 

        expect( bps.accounts[ 2 ].parentId ).toBe( "CA2B1FE6-D50C-1ED6-B5FC-07B7BC728307" );

    } );

    test( 'can assign users to an orgnisation', () => { 

        let account = bps.accounts[ 3 ];
        expect( account.users[ 1 ].firstName ).toBe( 'Jan-Marie' );

    } );

    test( 'can assign Parent', () => { 

        let node = bps.nodes[ 8 ].Parent.Parent.Parent;

        expect( node.Level ).toBe( '1' );
    } )

} );