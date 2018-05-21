const User = require( '../user.js' ).User;

describe( 'User object', () => {

    test( 'name/fullName is a concatenated by first name and last name', () => { 

        let o = {

            firstName: 'Tom',
            lastName: '  Lu   '
        }

        let user = new User( o );

        expect( user.name ).toBe( 'Tom Lu' );
        expect( user.fullName ).toBe( 'Tom Lu' );

    } );

} );