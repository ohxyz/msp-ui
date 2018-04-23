const EntityProfile = require( '../../../../src/model/entity-profile.js' ).EntityProfile;

describe( 'EntityProfile class/object', () => {

    test( 'can accept an empty string as the argument.', () => { 

        let entity = new EntityProfile();
        expect( entity.fullName ).toBe( 'n/a' );

    } );

    test( 'can accept a string argument.', () => { 

        let entity = new EntityProfile( 'Mike' );
        expect( entity.fullName ).toBe( 'Mike' );

    } );

    test( 'can accept a null argument and it\'s type is empty', () => { 

        let entity = new EntityProfile( null );

        expect( entity.fullName ).toBe( 'null' );
        expect( entity.type ).toBe( 'empty' );

    } );

    test( 'can be created with a object as argument', () => {

        let arg = { name: 'tom', 'accountId': '123' };
        let entity = new EntityProfile( arg );

        expect( entity ).toEqual( expect.objectContaining( arg ) );

    } );

    test( 'will convert properties value to a string', () => {

        let arg = { name: 'tom', 'accountId': 123 };
        let entity = new EntityProfile( arg );

        expect( entity ).not.toEqual( expect.objectContaining( arg ) );

    } );

    test( 'does not have the property it does not want', () => {

        let arg = { name: 'tom', 'accountId': 123, email: 'ab@cd.efg' };
        let entity = new EntityProfile( arg );

        expect( entity ).not.toEqual( expect.objectContaining( arg ) );

    } );

    test( 'can receive an EntityProfile instance as an argument', () => {

        let e = new EntityProfile( { name: 'jones' } );
        let ne = new EntityProfile( e );

        expect( e ).toEqual( ne );

    } );
    
} );


describe( 'EntityProfile\'s type and fullName', () => { 

    test( 'type is business', () => { 

        let arg = { firstName: '', lastName: '', name: 'corp' };
        let entity = new EntityProfile( arg );

        expect( entity.type ).toBe( 'business' );

    } );

    test( 'type is human', () => { 

        let arg = { firstName: 'Tom', lastName: '' };
        let entity = new EntityProfile( arg );

        expect( entity.type ).toBe( 'human' );

    } );

    test( 'type is mixed', () => { 

        let arg = { firstName: '', lastName: 'Rancie', name: 'Origin' };
        let entity = new EntityProfile( arg );

        expect( entity.type ).toBe( 'mixed' );

    } );

    test( 'type is empty', () => { 

        let arg = {};
        let entity = new EntityProfile( arg );

        expect( entity.type ).toBe( 'empty' );

    } );

    test( 'type is empty again', () => { 

        let arg = { name: '' };
        let entity = new EntityProfile( arg );

        expect( entity.type ).toBe( 'empty' );

    } );

    test( 'fullName is combined from firstName and LastName', () => { 

        let arg = { firstName: 'Su', lastName: 'ba' };
        let entity = new EntityProfile( arg );

        expect( entity.fullName ).toBe( 'Su ba' );

    } );

    test( 'fullName is a business name', () => { 

        let arg = { firstName: '', name: 'Origin' };
        let entity = new EntityProfile( arg );

        expect( entity.fullName ).toBe( 'Origin' );

    } );

} );
