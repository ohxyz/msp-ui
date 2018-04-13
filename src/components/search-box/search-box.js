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
        this.handleFocus = this.handleFocus.bind( this );

        this.textInputElement = null;
        this.domElement = null;

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
        let itemsFiltered = [];

        if ( text.length > 2 ) {

            itemsFiltered = this.filterSearchItemsByText( text );
        }

        this.setState( { 

            itemsFiltered: itemsFiltered,
            shouldRenderList: true
        } )
    }

    handleFocus() {

        if ( this.state.itemsFiltered.length >= 0 ) {

            this.setState( {

                shouldRenderList: true
            } );
        }
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

        this.textInputElement.value = item;

        this.setState( { 

            shouldRenderList: false,
            itemsFiltered: []

        } );
    }

    handleCrossIconClick() {

        this.textInputElement.value = '';
    }

    handleClickOutside( event ) {

        if ( isDescendant( event.target, this.domElement ) === false ){
                        
            this.setState( {

                shouldRenderList: false
            } );
        }
    }

    componentDidMount() {
        
        document.addEventListener( 'mouseup', this.handleClickOutside );
    }
    
    componentWillUnmount() {

        document.removeEventListener( 'mouseup', this.handleClickOutside );

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
                <div className="search-box__clear" onClick={ this.handleCrossIconClick }></div>
                <input 
                    type="text" 
                    className="search-box__field"
                    placeholder={ this.state.placeholder }
                    onChange={ this.handleChange }
                    onFocus={ this.handleFocus }
                    ref={ elem => this.textInputElement = elem }
                />
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