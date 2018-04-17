const datatype = require( '../../../../src/model/entity-profile.js' );

describe( 'EntityProfile object', () => {

    test( 'can accept an empty string as the argument.', () => { 

        let user = new datatype.EntityProfile();
        expect( user.fullName ).toBe( 'N/A' );

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
