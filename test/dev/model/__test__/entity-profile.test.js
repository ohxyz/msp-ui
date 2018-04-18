const datatype = require( '../../../../src/model/entity-profile.js' );

describe( 'EntityProfile object', () => {

    test( 'can accept an empty string as the argument.', () => { 

        let user = new datatype.EntityProfile();
        expect( user.fullName ).toBe( 'n/a' );

    } );

    test( 'can accept a string argument.', () => { 

        let user = new datatype.EntityProfile( 'Mike' );
        expect( user.fullName ).toBe( 'Mike' );

    } );

    test( 'can be created with a object as argument', () => {

        let arg = { name: 'tom', 'accountId': '123' };
        let user = new datatype.EntityProfile( arg );

        expect( user ).toEqual( expect.objectContaining( arg ) );

    } );

    test( 'will convert properties value to a string', () => {

        let arg = { name: 'tom', 'accountId': 123 };
        let user = new datatype.EntityProfile( arg );

        expect( user ).not.toEqual( expect.objectContaining( arg ) );

    } );

    test( 'does not have the property it does not want', () => {

        let arg = { name: 'tom', 'accountId': 123, email: 'ab@cd.efg' };
        let user = new datatype.EntityProfile( arg );

        expect( user ).not.toEqual( expect.objectContaining( arg ) );

    } );
    
} );


describe( 'EntityProfile\'s type and fullName', () => { 

    test( 'type is business', () => { 

        let arg = { firstName: '', lastName: '', name: 'corp' };
        let user = new datatype.EntityProfile( arg );

        expect( user.type ).toBe( 'business' );

    } );

    test( 'type is human', () => { 

        let arg = { firstName: 'Tom', lastName: '' };
        let user = new datatype.EntityProfile( arg );

        expect( user.type ).toBe( 'human' );

    } );

    test( 'type is mixed', () => { 

        let arg = { firstName: '', lastName: 'Rancie', name: 'Origin' };
        let user = new datatype.EntityProfile( arg );

        expect( user.type ).toBe( 'mixed' );

    } );

    test( 'type is empty', () => { 

        let arg = {};
        let user = new datatype.EntityProfile( arg );

        expect( user.type ).toBe( 'empty' );

    } );

    test( 'type is empty again', () => { 

        let arg = { name: '' };
        let user = new datatype.EntityProfile( arg );

        expect( user.type ).toBe( 'empty' );

    } );

    test( 'fullName is combined from firstName and LastName', () => { 

        let arg = { firstName: 'Su', lastName: 'ba' };
        let user = new datatype.EntityProfile( arg );

        expect( user.fullName ).toBe( 'Su ba' );

    } );

    test( 'fullName is a business name', () => { 

        let arg = { firstName: '', name: 'Origin' };
        let user = new datatype.EntityProfile( arg );

        expect( user.fullName ).toBe( 'Origin' );

    } );

} );
