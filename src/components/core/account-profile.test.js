const AccountProfile = require( './account-profile.js' ).AccountProfile;

describe( 'AccountProfile class/object', () => {

    test( 'can accept an empty string as the argument.', () => { 

        let user = new AccountProfile();
        expect( user.fullName ).toBe( 'n/a' );

    } );

    test( 'can accept a string argument.', () => { 

        let user = new AccountProfile( 'Mike' );
        expect( user.fullName ).toBe( 'Mike' );

    } );

    test( 'can accept a null argument and it\'s type is empty', () => { 

        let user = new AccountProfile( null );

        expect( user.fullName ).toBe( 'null' );
        expect( user.type ).toBe( 'empty' );

    } );

    test( 'can be created with a object as argument', () => {

        let arg = { name: 'tom', 'accountId': '123' };
        let user = new AccountProfile( arg );

        expect( user ).toEqual( expect.objectContaining( arg ) );

    } );

    test( 'does not have the property it does not want', () => {

        let arg = { name: 'tom', 'accountId': 123, email: 'ab@cd.efg' };
        let user = new AccountProfile( arg );

        expect( user ).not.toEqual( expect.objectContaining( arg ) );

    } );

    test( 'can receive an AccountProfile instance as an argument', () => {

        let e = new AccountProfile( { name: 'jones' } );
        let ne = new AccountProfile( e );

        expect( e ).toEqual( ne );

    } );
    
} );


describe( 'AccountProfile\'s type and fullName', () => { 

    test( 'type is organisation', () => { 

        let arg = { firstName: '', lastName: '', name: 'corp' };
        let user = new AccountProfile( arg );

        expect( user.type ).toBe( 'organisation' );

    } );

    test( 'type is person', () => { 

        let arg = { firstName: 'Tom', lastName: '' };
        let user = new AccountProfile( arg );

        expect( user.type ).toBe( 'person' );

    } );

    test( 'type is mixed', () => { 

        let arg = { firstName: '', lastName: 'Rancie', name: 'Origin' };
        let user = new AccountProfile( arg );

        expect( user.type ).toBe( 'mixed' );

    } );

    test( 'type is empty', () => { 

        let arg = {};
        let user = new AccountProfile( arg );

        expect( user.type ).toBe( 'empty' );

    } );

    test( 'type is empty again', () => { 

        let arg = { name: '' };
        let user = new AccountProfile( arg );

        expect( user.type ).toBe( 'empty' );

    } );

    test( 'fullName is combined from firstName and LastName', () => { 

        let arg = { firstName: 'Su', lastName: 'ba' };
        let user = new AccountProfile( arg );

        expect( user.fullName ).toBe( 'Su ba' );

    } );

    test( 'fullName is a business name', () => { 

        let arg = { firstName: '', name: 'Origin' };
        let user = new AccountProfile( arg );

        expect( user.fullName ).toBe( 'Origin' );

    } );

} );
