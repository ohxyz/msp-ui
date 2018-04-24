const UserStorage = require( '../../../../../src/components/core/user-storage.js' ).UserStorage;

describe( 'UserStorage', () => {

    test( 'throws an error when argument is empty', () => {

        expect( () => new UserStorage() ).toThrow();

    } );

    test( 'does not throws errors when argument is an empty array', () => {

        expect( () => new UserStorage( [] ) ).toThrow();

    } );

    test( 'throws an error when argument is an object with d.results ', () => {

        expect( () => new UserStorage( { a: 'b' } ) ).toThrow();

    } );

    test( 'get an object when argument is an object', () => {

        let object = new UserStorage( { d: { results: [ 'a', null ] } } ).sapResults;

        expect( object ).toEqual( [ 'a', null ] );
    } );

    test( 'get an object when argument is an JSON string', () => {

        let object = new UserStorage( '{"d": {"results": ["a", null] } }' ).sapResults;

        expect( object ).toEqual( [ 'a', null ] );
    } );

} );
