import React from 'react';
import SearchListItem from '../search-box-list-item.js';
import renderer from 'react-test-renderer';

let item = { __content__: 'Item content' };

it( 'should render with default settings', () => {

    const tree = renderer
        .create( <SearchListItem item={ item } /> )
        .toJSON();

    expect( tree ).toMatchSnapshot();

} );

describe( 'SearchListItem instance', () => {

    let mockCallback = jest.fn();
    let props = { item: item, onSelect: mockCallback }
    let searchListItem = new SearchListItem( props );

    test( 'can call onSelect from props', () => { 

        searchListItem.handleClick();
        expect( mockCallback.mock.calls.length ).toBe( 1 );

    } );


} );

