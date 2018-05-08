const util = require( '../util.js' );

describe( 'setDefault function', () => { 

    test( 'sets a default value when a variable is undefined', () => { 

        let a = undefined;

        expect( util.setDefault( a, 1) ).toBe( 1 );
    } );

    test( 'sets a default value when an object not having a property', () => { 

        let a = {};

        expect( util.setDefault( a.x, 2) ).toBe( 2 );
    } );

} );

describe( 'generateRandomString function', () => { 

    test( 'returns a string that at least has 1 character', () => { 

        expect( util.generateRandomString().length ).toBeGreaterThan( 0 );
    } );

} );

describe( 'isDescendant function', () => { 

    test( 'will return false when childElem\'s parentNode is empty', () => {

        let child = {

            parentNode: {

                parentNode: {}
            }
        };

        let result = util.isDescendant( child, {} );
        expect( result ).toBe( false );

    } );

} );

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
