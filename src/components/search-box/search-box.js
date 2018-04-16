import React from 'react';
import SearchList from './search-box-list.js';
import { componentManager } from '../../core/component-manager.js';
import { generateRandomString, setDefault, isDescendant } from '../../core/util.js';
import { SearchItem, makeSearchItemsByFields } from './data-model.js';

export default class SearchBox extends React.Component {

    constructor( props ) {

        super( props );
        
        this.handleChange = this.handleChange.bind( this );
        this.handleSelect = this.handleSelect.bind( this );
        this.handleCrossIconClick = this.handleCrossIconClick.bind( this );
        this.handleClickOutside = this.handleClickOutside.bind( this );
        this.handleTextInputFocus = this.handleTextInputFocus.bind( this );
        this.handleBlur = this.handleBlur.bind( this );
        this.handleListItemFocus = this.handleListItemFocus.bind( this );
        this.handleKeyDown = this.handleKeyDown.bind( this );

        this.textInputElement = null;
        this.searchListElement = null;
        this.domElement = null;
        this.itemFocused = null;
        this.isTextInputFocused = false;

        this.state = {

            fields: props.fields,
            placeholder: props.placeholder,
            items: props.items,
            searchItems: makeSearchItemsByFields( props.items, props.fields ),
            itemsFiltered: [],
            shouldRenderList: false
        };

        this.id = setDefault( props.id, generateRandomString() );
        componentManager.addComponent( this.id, this );
    }

    static getDerivedStateFromProps( nextProps, prevState ) {
        
        return {

            items: nextProps.items,
            placeholder: nextProps.placeholder,
            fields: nextProps.fields,
            searchItems: makeSearchItemsByFields( nextProps.items, nextProps.fields )
        };
    }

    handleChange() {

        let text = this.textInputElement.value;

        if ( text.length > 2 ) {

            let itemsFiltered = this.filterSearchItemsByText( text );

            this.setState( { 

                itemsFiltered: itemsFiltered,
                shouldRenderList: true
            } );
        }
        else {

            this.setState( {

                itemsFiltered: [],
                shouldRenderList: false

            } ); 
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

    handleBlur() {

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

        this.setState( {

            itemsFiltered: itemsFiltered,
            shouldRenderList: false

        } );
    }

    handleCrossIconClick() {

        this.textInputElement.value = '';

        this.setState( {

            itemsFiltered: [],
            shouldRenderList: false,

        } );
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

        if ( event.key === 'Enter' ) {

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
        this.textInputElement.addEventListener( 'keydown', this.handleKeyDown );
    }
    
    componentWillUnmount() {

        document.removeEventListener( 'mouseup', this.handleClickOutside );
        this.textInputElement.removeEventListener( 'keydown', this.handleKeyDown );
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
                    placeholder={ this.state.placeholder }
                    onChange={ this.handleChange }
                    onFocus={ this.handleTextInputFocus }
                    onBlur={ this.handleBlur }
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