import React from 'react';
import SearchBox from '../search-box.js';
import { SearchItem } from '../data-model.js';
import TestRenderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import ReactTestUtils from 'react-dom/test-utils';

const items = [

    { 'org': 'abcd Education', name: 'abcd' },
    { 'org': 'abce Health', name: 'abce health people' },
    { 'org': 'abcde Transport' },
    { 'name': 'Mr abcdg ' },
    { 'name': 'abcd lady', 'org': 'abce LADY GROUP' }
];

describe( 'SearchBox', () => { 

    it( 'creates snapshots', () => {

        let component = TestRenderer.create(

            <SearchBox
                id="seach-box-users"
                name="my-box"
                onSelect={ () => {} }
                onIconClick={ self=> self.showAllItems() }
                onChange={ () => {} }
                placeholder="Search users by name, department or agency"
                onFocus={ () => {} }
                onBlur={ () => {} }
                items={ items }
                iconStyle="add"
                fields={ [ 'org', 'name' ] }
                strikes={ 3 } 
            /> 
        )
        
        let tree = component.toJSON();

        expect( tree ).toMatchSnapshot();

        let textInput = tree.children[ 0 ].children[ 0 ];
        let span = tree.children[ 0 ].children[ 1 ];

        textInput.props.onFocus();
        expect( tree ).toMatchSnapshot();

        textInput.props.onBlur();
        expect( tree ).toMatchSnapshot();

        // Mock
        textInput.props.onChange( { target: { value: 'abc' } } );
        expect( tree ).toMatchSnapshot();

        span.props.onClick();
        expect( tree ).toMatchSnapshot();

    } );

} );



describe( 'SearchBox React component instance', () => {

    // Stub
    let items = [

        'abcd', 'abce', 'bcde', 'cdef', 'cefg', 'defg', 'efgh'
    ];

    it( 'static method: getDerivedStateFromProps', () => { 

        let state = SearchBox.getDerivedStateFromProps( {}, {} );
        expect( Object.keys( state ).length ).toBe( 18 );

    } );
    

    it( 'updateItems method', () => {

        let props = { items: items };
        let searchBox = new SearchBox( props );
        let spy = jest.spyOn( searchBox, 'filterSearchItemsByText' );

        // Mock
        searchBox.textInputElement = { value: 'mocked value' };
        searchBox.setState = new Function();
        searchBox.updateItems();

        expect( spy ).toHaveBeenCalled();

    } );

    it( 'renderCount method', () => { 

        let searchBox = new SearchBox( {} );
        searchBox.state.shouldRenderCount = true;

        let result = searchBox.renderCount();

        expect( result.props.children[ 0 ].props.children ).toBe( 0 );
    } );



} );
