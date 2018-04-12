import SearchBox from '../../../../src/components/search-box/search-box.js';

describe( 'SearchBox React object', () => {

    // Stub
    let items = [

        'Apple', 'Banana', 'Cat', 'Dog', 'Elphant',
        'abcd', 'abce', 'bcde', 'cdef', 'cefg', 'defg', 'efgh'
    ];

    let props = {

        items: items
    };

    let searchBox = new SearchBox( props );

    describe( 'FilterItemsByText method', () => { 

        test( 'has normal a argument', () => {

            let filtered = searchBox.filterItemsByText( 'abc' );
            expect( filtered ).toEqual( [ 'abcd', 'abce' ] );

        } );

    } );

} );
