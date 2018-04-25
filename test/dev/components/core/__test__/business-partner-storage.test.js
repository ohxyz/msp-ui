const BusinessPartnerStorage = require( '../../../../../src/components/core/business-partner-storage.js' ).BusinessPartnerStorage;
const dummySapString = require( './dummy-sap.js' ).dummySapString;

describe( 'BusinessPartnerStorage', () => {

    test( 'throws an error when argument is empty', () => {

        expect( () => new BusinessPartnerStorage() ).toThrow();

    } );

    test( 'does not throws errors when argument is an empty array', () => {

        expect( () => new BusinessPartnerStorage( [] ) ).toThrow();

    } );

    test( 'throws an error when argument is an object with d.results ', () => {

        expect( () => new BusinessPartnerStorage( { a: 'b' } ) ).toThrow();

    } );

    test( 'get an object when argument is an object', () => {

        let object = new BusinessPartnerStorage( { d: { results: [ 'a', null ] } } ).sapResults;

        expect( object ).toEqual( [ 'a', null ] );
    } );

    test( 'get an object when argument is an JSON string', () => {

        let object = new BusinessPartnerStorage( '{"d": {"results": ["a", null] } }' ).sapResults;

        expect( object ).toEqual( [ 'a', null ] );
    } );

} );

describe( 'BusinessPartnerStorage that has SAP data', () => {

    test( 'can process', () => { 

        let bp = new BusinessPartnerStorage( dummySapString );

    } );

} );