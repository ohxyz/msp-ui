import React from 'react';
import SearchList from '../search-box-list.js';
import renderer from 'react-test-renderer';

describe( 'SearchList instance with 3 items', () => {

    let items = [

        { __content__: 'Item content' },
        { __content__: 'Item content 2' },
        { __content__: 'Item content 3' }
    ];

    let props = {

        items: items,
    };

    let searchList = new SearchList( props );

    test( 'should have 3 items', () => {

        expect( searchList.state.items.length ).toBe( 3 );

    } );

    test( 'can get item focused', () => {

        // Mocks
        searchList.syncScrollBar = new Function();
        searchList.setState = new Function();
        searchList.handleKeyDown( { key: 'ArrowDown' } );

        expect( searchList.itemFocused.__content__ ).toBe( 'Item content' );

    } );

} );

