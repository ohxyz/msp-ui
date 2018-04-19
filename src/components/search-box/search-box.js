import React from 'react';
import SearchList from './search-box-list.js';
import { componentManager } from '../core/component-manager.js';
import { generateRandomString, setDefault, isDescendant } from '../core/util.js';
import { SearchItem, makeSearchItemsByFields } from './data-model.js';

export default class SearchBox extends React.Component {

    constructor( props ) {

        super( props );
        
        this.handleTextInputChange = this.handleTextInputChange.bind( this );
        this.handleSelect = this.handleSelect.bind( this );
        this.handleCrossIconClick = this.handleCrossIconClick.bind( this );
        this.handleClickOutside = this.handleClickOutside.bind( this );
        this.handleTextInputFocus = this.handleTextInputFocus.bind( this );
        this.handleTextInputBlur = this.handleTextInputBlur.bind( this );
        this.handleListItemFocus = this.handleListItemFocus.bind( this );
        this.handleKeyDown = this.handleKeyDown.bind( this );
        this.showSearchList = this.showSearchList.bind( this );
        this.clearSearchList = this.clearSearchList.bind( this );

        this.textInputElement = null;
        this.searchListElement = null;
        this.domElement = null;
        this.itemFocused = null;
        this.isTextInputFocused = false;

        this.state = {

            fields: props.fields,
            placeholder: props.placeholder,
            items: props.items,
            name: props.name,
            onPropsSelect: props.onSelect,
            searchItems: makeSearchItemsByFields( props.items, props.fields ),
            itemsFiltered: [],
            shouldRenderList: false
        };

        this.id = setDefault( props.id, generateRandomString() );
        componentManager.addComponent( this.id, this );
    }

    static getDerivedStateFromProps( nextProps, prevState ) {
        
        return {

            items: setDefault( nextProps.items, [] ),
            name: setDefault( nextProps.name, ''),
            placeholder: setDefault( nextProps.placeholder, ''),
            onPropsSelect: setDefault( nextProps.onSelect, new Function() ),
            fields: setDefault( nextProps.fields, ''),
            searchItems: makeSearchItemsByFields( nextProps.items, nextProps.fields )
        };
    }

    showSearchList( items ) {

        this.setState( { 

            itemsFiltered: items,
            shouldRenderList: true
        } );
    }

    clearSearchList() {

        this.setState( { 

            itemsFiltered: [],
            shouldRenderList: false
        } );
    }

    handleTextInputChange() {

        this.itemFocused = null;

        let text = this.textInputElement.value;

        if ( text.length <= 2 ) {

            this.clearSearchList();

            return;
        }

        let itemsFiltered = this.filterSearchItemsByText( text );

        if ( itemsFiltered.length > 0 ) {

            this.showSearchList( itemsFiltered );
        }
        else { 

            this.clearSearchList();
        }
    }

    handleTextInputFocus() {

        this.isTextInputFocused = true;

        if ( this.state.itemsFiltered.length > 0 ) {

            this.setState( {

                shouldRenderList: true
            } );
        }
    }

    handleTextInputBlur() {

        this.isTextInputFocused = false;
    }

    filterSearchItemsByText( text ) {

        let itemsFiltered = [];
        let searchItems = this.state.searchItems;

        for ( let i = 0; i < searchItems.length; i ++ ) {

            let searchItem = searchItems[ i ];
            let content = searchItem.content.toLowerCase();

            if ( content.indexOf( text.toLowerCase() ) >= 0 ) {

                itemsFiltered.push( searchItem );
            }
        }

        return itemsFiltered;
    }

    handleSelect( item ) {

        this.textInputElement.value = item.content;
        let itemsFiltered = this.filterSearchItemsByText( item.content );

        this.state.onPropsSelect( item );

        this.setState( {

            itemsFiltered: itemsFiltered,
            shouldRenderList: false

        } );
    }

    handleCrossIconClick() {

        this.textInputElement.value = '';

        this.clearSearchList();
    }

    handleClickOutside( event ) {

        if ( isDescendant( event.target, this.domElement ) === false ){
                        
            this.setState( {

                shouldRenderList: false
            } );
        }
    }

    handleKeyDown( event ) {

        if ( this.isTextInputFocused === false ) {

            return;
        }

        if ( event.key === 'Enter'
                && ( this.itemFocused instanceof SearchItem ) === true ) {

            this.handleSelect( this.itemFocused );
        }
    }

    handleListItemFocus( item ) {

        if ( item instanceof SearchItem === false ) {

            return;
        }

        this.itemFocused = item;
        this.textInputElement.value = item.content;
    }

    componentDidMount() {
        
        document.addEventListener( 'mouseup', this.handleClickOutside );
        document.addEventListener( 'keydown', this.handleKeyDown );
    }
    
    componentWillUnmount() {

        document.removeEventListener( 'mouseup', this.handleClickOutside );
        document.removeEventListener( 'keydown', this.handleKeyDown );
    }

    renderCount() {

        let count = this.state.itemsFiltered.length;

        return (

            <div className="search-box__count">
                <span className="search-box__count-number">{ count }</span>
                <span className="search-box__count-text"> found</span>
            </div>
        )
    }

    renderHeader() {

        return (

            <div className="search-box__header">
                <input 
                    type="text" 
                    className="search-box__field"
                    name={ this.state.name }
                    placeholder={ this.state.placeholder }
                    onChange={ this.handleTextInputChange }
                    onFocus={ this.handleTextInputFocus }
                    onBlur={ this.handleTextInputBlur }
                    ref={ elem => this.textInputElement = elem }
                />
                <span className="search-box__clear" onClick={ this.handleCrossIconClick }>
                     <i className="material-icons">close</i>
                </span>
            </div>
        );
    }

    renderContent() {

        if ( this.state.shouldRenderList === false ) {

            return;
        }

        return (

            <div className="search-box__content">
                <SearchList
                    items={ this.state.itemsFiltered }
                    onSelect={ this.handleSelect }
                    onListItemFocus={ this.handleListItemFocus }
                    ref={ elem => { this.searchListElement = elem; } }
                />
            </div>
        );
    }

    render() {

        return (

            <div className="search-box" ref={ elem => { this.domElement = elem; } } >
                { this.renderCount() }
                { this.renderHeader() }
                { this.renderContent() }
            </div>
        );
    }
}