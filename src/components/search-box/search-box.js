import React from 'react';
import SearchList from './search-box-list.js';
import { componentManager } from '../core/component-manager.js';
import { generateRandomString, setDefault, isDescendant } from '../core/util.js';
import { SearchItem, makeSearchItems } from './data-model.js';

const DEFAULT_NUMBER_OF_STRIKES = 3;

export default class SearchBox extends React.Component {

    constructor( props ) {

        super( props );
        
        this.handleTextInputChange = this.handleTextInputChange.bind( this );
        this.handleSelect = this.handleSelect.bind( this );
        this.handleIconClick = this.handleIconClick.bind( this );
        this.handleClickOutside = this.handleClickOutside.bind( this );
        this.handleTextInputFocus = this.handleTextInputFocus.bind( this );
        this.handleTextInputBlur = this.handleTextInputBlur.bind( this );
        this.handleListItemFocus = this.handleListItemFocus.bind( this );
        this.handleKeyDown = this.handleKeyDown.bind( this );

        this.textInputElement = null;
        this.searchListElement = null;
        this.domElement = null;
        this.itemFocused = null;
        this.isTextInputFocused = false;

        this.state = {

            fields: [],
            placeholder: '',
            items: [],
            name: '',
            onPropsSelect: new Function(),
            onPropsIconClick: new Function(),
            onPropsTextChange: new Function(),
            onPropsFocus: new Function(),
            onPropsBlur: new Function(),
            searchItems: makeSearchItems( props.items, props.fields ),
            itemsFiltered: [],
            shouldRenderList: false,
            shouldRenderCount: false,
            shouldRenderIcon: true,
            iconStyle: 'close',
            strikes: DEFAULT_NUMBER_OF_STRIKES

        };
        
        this.id = setDefault( props.id, generateRandomString() );
        componentManager.addComponent( this.id, this );
    }

    static getDerivedStateFromProps( nextProps, prevState ) {

        let numberOfStrikes = parseInt( nextProps.strikes, 10 );

        if ( isNaN( numberOfStrikes ) || numberOfStrikes < 1 ) {

            numberOfStrikes = DEFAULT_NUMBER_OF_STRIKES;
        }
        
        return {

            items: setDefault( nextProps.items, [] ),
            name: setDefault( nextProps.name, ''),
            placeholder: setDefault( nextProps.placeholder, ''),
            onPropsSelect: setDefault( nextProps.onSelect, new Function() ),
            onPropsIconClick: setDefault( nextProps.onIconClick, new Function() ),
            onPropsTextChange: setDefault( nextProps.onChange, new Function() ),
            onPropsFocus: setDefault( nextProps.onFocus, new Function() ),
            onPropsBlur: setDefault( nextProps.onBlur, new Function() ),
            fields: setDefault( nextProps.fields, [] ),
            searchItems: makeSearchItems( nextProps.items, nextProps.fields ),
            shouldRenderCount: setDefault( nextProps.shouldRenderCount, false ),
            shouldRenderIcon: setDefault( nextProps.shouldRenderIcon, true ),
            strikes: numberOfStrikes,
            iconStyle: setDefault( nextProps.iconStyle, 'close' )
        };
    }

    updateItems( items, fields ) {

        let fieldArray = [];

        if ( fields === undefined || Array.isArray( fields ) === false) {

            fieldArray = this.state.fields;
        }

        let searchItems = makeSearchItems( items, fieldArray );
        let text = this.textInputElement.value;
        let itemsFiltered = this.filterSearchItemsByText( searchItems, text );

        this.setState( { 

            items: items,
            searchItems: searchItems,
            itemsFiltered: itemsFiltered
        } );
    }

    showSearchList( items ) {

        if ( Array.isArray( items ) === true && items.length > 0 ) {

            this.setState( { 

                itemsFiltered: items,
                shouldRenderList: true
            } );
        }
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

        if ( text.length < this.state.strikes ) {

            this.clearSearchList();
        }
        else { 

            let itemsFiltered = this.filterSearchItemsByText( this.state.searchItems, text );

            if ( itemsFiltered.length > 0 ) {

                this.showSearchList( itemsFiltered );
            }
            else { 

                this.clearSearchList();
            }
        }

        this.state.onPropsTextChange( this );
    }

    handleTextInputFocus() {

        this.isTextInputFocused = true;

        if ( this.state.itemsFiltered.length > 0 ) {

            this.setState( {

                shouldRenderList: true
            } );
        }

        this.state.onPropsFocus( this );
    }

    handleTextInputBlur() {

        this.isTextInputFocused = false;
        this.state.onPropsBlur( this );
    }

    filterSearchItemsByText( searchItems, text ) {

        let itemsFiltered = [];

        for ( let i = 0; i < searchItems.length; i ++ ) {

            let searchItem = searchItems[ i ];
            let content = searchItem.__content__.toLowerCase();

            if ( content.indexOf( text.toLowerCase() ) >= 0 ) {

                itemsFiltered.push( searchItem );
            }
        }
        
        return itemsFiltered;
    }

    handleSelect( item ) {

        this.textInputElement.value = item.__content__;
        let itemsFiltered = this.filterSearchItemsByText( this.state.searchItems, item.__content__ );

        this.setState( {

            itemsFiltered: itemsFiltered,
            shouldRenderList: false

        } );

        this.state.onPropsSelect( item, this );
    }

    clearSearch() {

        this.textInputElement.value = '';

        this.clearSearchList();
    }

    showAllItems() {

        this.setState( {

            itemsFiltered: this.state.searchItems,
            shouldRenderList: true
        } );
    }

    handleIconClick() {

        this.state.onPropsIconClick( this );
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
        this.textInputElement.value = item.__content__;
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

        if ( this.state.shouldRenderCount === false ) {

            return;
        }

        let count = this.state.itemsFiltered.length;

        return (

            <div className="search-box__count">
                <span className="search-box__count-number">{ count }</span>
                <span className="search-box__count-text"> found</span>
            </div>
        )
    }

    renderIcon() {

        return (

            <span className="search-box__icon" onClick={ this.handleIconClick }>
                <i className="material-icons">{ this.state.iconStyle }</i>
            </span>
        );
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
                { this.renderIcon() }
            </div>
        );
    }

    renderContent() {

        if ( this.state.shouldRenderList === false 
                || this.state.itemsFiltered.length === 0 ) {

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

export {

    SearchBox,
}