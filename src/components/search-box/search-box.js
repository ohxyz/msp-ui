import React from 'react';
import SearchList from './search-list.js';

export default class SearchBox extends React.Component {

    constructor( props ) {

        super( props );

        this.handleChange = this.handleChange.bind( this );
        this.textInputElement = null;

        this.state = {

            items: props.items,
            itemsFiltered: []
        }
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

        // console.log( text );
        // console.log( itemsFiltered );

        this.setState( { 

            itemsFiltered: itemsFiltered
        } )
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
                <SearchList items={ this.state.itemsFiltered } />
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