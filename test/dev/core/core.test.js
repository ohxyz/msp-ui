const util = require( '../../../src/core/util.js' );

describe( 'isObject function', () => { 

    test( 'is false when argument is null', () => { 

        expect( util.isObject( null ) ).toBe( false );

    } );

    test( 'is false when argument is function', () => { 

        expect( util.isObject( new Function() ) ).toBe( false );

    } );

} );
