import SearchBox from '../../../../../src/components/search-box/search-box.js';
import { SearchItem } from '../../../../../src/components/search-box/data-model.js';

describe( 'SearchBox React object', () => {

    // Stub
    let items = [

        'abcd', 'abce', 'bcde', 'cdef', 'cefg', 'defg', 'efgh'
    ];

    let props = {

        items: items
    };

    let searchBox = new SearchBox( props );

    describe( 'filterSearchItemsByText method', () => { 

        test( 'has normal a argument', () => {

            let searchItem = new SearchItem( 'abc' );
            let filtered = searchBox.filterSearchItemsByText( 'abc' );
            let expected = [

                { name: '', content: 'abcd' },
                { name: '', content: 'abce' }

            ]

            expect( filtered ).toEqual( expected );

        } );

    } );

} );
