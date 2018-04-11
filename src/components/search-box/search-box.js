import React from 'react';
import SearchList from './search-box-list.js';
import { componentManager } from '../../core/component-manager.js';
import { generateRandomString, setDefault } from '../../core/util.js';

console.log( componentManager );

export default class SearchBox extends React.Component {

    constructor( props ) {

        super( props );

        this.handleChange = this.handleChange.bind( this );
        this.handleSelect = this.handleSelect.bind( this );
        this.handleCrossIconClick = this.handleCrossIconClick.bind( this );

        this.textInputElement = null;

        this.state = {

            items: props.items,
            itemsFiltered: []
        };

        this.id = setDefault( props.id, generateRandomString() );
        componentManager.addComponent( this.id, this );
    }

    static getDerivedStateFromProps( nextProps, prevState ) {
        
        return {

            items: nextProps.items
        };
    }

    handleChange() {

        let text = this.textInputElement.value;
        let itemsFiltered = [];

        if ( text.length > 2 ) {

            itemsFiltered = this.filterItemsByText( text );
        }

        this.setState( { 

            itemsFiltered: itemsFiltered
        } )
    }

    handleSelect( item ) {

        this.textInputElement.value = item;

        this.setState( { 

            itemsFiltered: []
        } );
    }

    handleCrossIconClick() {

        this.textInputElement.value = '';
    }

    filterItemsByText( text ) {

        let itemsFiltered = [];

        for ( let i = 0; i < this.state.items.length; i ++ ) {

            let item = this.state.items[ i ];

            if ( item.indexOf( text ) >= 0 ) {

                itemsFiltered.push( item );
            }
        }

        return itemsFiltered;
    }

    renderHeader() {

        return (

            <div className="search-box__header">
                <span className="search-box__clear" onClick={ this.handleCrossIconClick }></span>
                <input 
                    type="text" 
                    className="search-box__field" 
                    onChange={ this.handleChange }
                    ref={ elem => this.textInputElement = elem }
                />
            </div>
        );
    }

    renderContent() {

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

            <div className="search-box">
                { this.renderHeader() }
                { this.renderContent() }
            </div>
        );
    }
}