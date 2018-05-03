const util = require( './util.js' );

describe( 'isObject function', () => { 

    test( 'is false when argument is null', () => { 

        expect( util.isObject( null ) ).toBe( false );

    } );

    test( 'is false when argument is function', () => { 

        expect( util.isObject( new Function() ) ).toBe( false );

    } );

} );

describe( 'isNotEmptyArray', () => { 

    test( 'has null as argument', () => { 

        expect( util.isNotEmptyArray( null ) ).toBe( false );
    } );

    test( 'has an array ', () => { 

        expect( util.isNotEmptyArray( [ null ] ) ).toBe( true );
    } );

    test( 'has an empty array ', () => { 

        expect( util.isNotEmptyArray( [] ) ).toBe( false );
    } );

} )
