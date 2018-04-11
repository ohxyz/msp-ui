const datatype = require( '../../../src/core/datatype.js' );

describe( 'User object', () => { 

    test( 'can accept a string argument.', () => { 

        let user = new datatype.User( 'Mike' );
        expect( user.name ).toBe( 'Mike' );

    } );

    test( 'can accept a string argument, and it org is an empty string', () => { 

        let user = new datatype.User( 'Mike' );
        expect( user.org ).toBe( '' );

    } );

    test( 'is created with a object as argument', () => {

        let arg = { name: 'tom', 'org': 123, 'email': '@' };
        let user = new datatype.User( arg );

        expect( user ).toEqual( { name: "tom", org: 123 } );

    } );
} );
