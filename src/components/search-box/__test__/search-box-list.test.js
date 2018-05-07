import React from 'react';
import SearchList from '../search-box-list.js';
import renderer from 'react-test-renderer';

let items = [

    { __content__: 'Item content' },
    { __content__: 'Item content 2' },
    { __content__: 'Item content 3' }
];

it( 'should render with default settings', () => {

    const tree = renderer
        .create( <SearchList items={ items } /> )
        .toJSON();

    expect( tree ).toMatchSnapshot();

} );

describe( 'SearchList instance with 3 items', () => {

    let props = {

        items: items,
    };

    let searchList = new SearchList( props );

    test( 'should have 3 items', () => {

        expect( searchList.state.items.length ).toBe( 3 );

    } );

    test( 'can get item by pressing Arrow Down', () => {

        // Mocks
        searchList.syncScrollBar = new Function();
        searchList.setState = new Function();
        searchList.handleKeyDown( { key: 'ArrowDown' } );

        expect( searchList.itemFocused.__content__ ).toBe( 'Item content' );

    } );

    test( 'can get right selected item', () => {

        // Mocks
        searchList.syncScrollBar = new Function();
        searchList.setState = new Function();
        searchList.state.indexOfItemFocused = 1;

        expect( searchList.render().props.children[ 1 ].props.isFocused ).toBe( true );
        expect( searchList.render().props.children[ 0 ].props.isFocused ).toBe( false );
       
    } );
} );

