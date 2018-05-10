import React from 'react';
import SearchBox from '../search-box.js';
import { SearchItem } from '../data-model.js';
import renderer from 'react-test-renderer';

const items = [

    { 'org': 'abcd Education', name: 'abcd' },
    { 'org': 'abce Health', name: 'abce health people' },
    { 'org': 'abcde Transport' },
    { 'name': 'Mr abcdg ' },
    { 'name': 'abcd lady', 'org': 'abce LADY GROUP' }
];

it( 'renders with default settings', () => {

    const tree = renderer
        .create( 
            <SearchBox
                id="seach-box-users"
                name="my-box"
                onSelect={ ( item, self ) => { console.log( 'onSelect', item ); } }
                onIconClick= { self => { console.log( 'onIconClick', self ); self.showAllItems(); } }
                onChange= { self => console.log( 'onChange', self ) }
                placeholder="Search users by name, department or agency"
                onFocus={ self => { console.log( 'focus', self ); } }
                onBlur={ self => console.log( 'blur', self ) }
                items={ items }
                iconStyle="add"
                fields={ [ 'org', 'name' ] }
                strikes={ 3 } /> 
        )
        .toJSON();

    expect( tree ).toMatchSnapshot();

} );


describe( 'SearchBox React component instance', () => {

    // Stub
    let items = [

        'abcd', 'abce', 'bcde', 'cdef', 'cefg', 'defg', 'efgh'
    ];

    describe( 'static method: getDerivedStateFromProps', () => { 

        let state = SearchBox.getDerivedStateFromProps( {}, {} );
        expect( Object.keys( state ).length ).toBe( 18 );

    } );
    
    describe( 'filterSearchItemsByText method', () => {

        let props = { items: items };
        let searchBox = new SearchBox( props );

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

    describe( 'updateItems method', () => {

        let props = { items: items };
        let searchBox = new SearchBox( props );
        let spy = jest.spyOn( searchBox, 'filterSearchItemsByText' );

        // Mock
        searchBox.textInputElement = { value: 'mocked value' };
        searchBox.setState = new Function();
        searchBox.updateItems();

        expect( spy ).toHaveBeenCalled();

    } );


    describe( 'renderCount method', () => { 

        let searchBox = new SearchBox( {} );
        searchBox.state.shouldRenderCount = true;

        let result = searchBox.renderCount();

        expect( result.props.children[ 0 ].props.children ).toBe( 0 );
    } );

    describe( 'sortByIndexOfFields method', () => {

        

    } );

} );

