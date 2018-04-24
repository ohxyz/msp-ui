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

        test( 'can filter searchItems by text', () => {

            let searchItems = items.map( item => new SearchItem( item ) );

            let filtered = searchBox.filterSearchItemsByText( searchItems, 'abc' );
            let expected = [

                { __content__: 'abcd', __origin__: 'abcd', '__field__': '' },
                { __content__: 'abce', __origin__: 'abce', '__field__': '' },

            ];

            expect( filtered ).toEqual( expected );

        } );

    } );

} );
