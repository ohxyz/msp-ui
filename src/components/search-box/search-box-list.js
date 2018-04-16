import React from 'react';
import SearchListItem from './search-box-list-item.js';

export default class SearchList extends React.Component {

    constructor( props ) {

        super( props );
        this.handleKeyDown = this.handleKeyDown.bind( this );

        this.itemFocused = null;
        this.domElement = null;
        this.searchListItemElement = null;

        this.searchListItemHeight = 0;

        this.state = {

            indexOfItemFocused: -1,
            items: props.items
        }
    }

    static getDerivedStateFromProps( nextProps, prevState ) {
        
        return {

            items: nextProps.items
        };
    }

    handleKeyDown( event ) {

        let countOfItems = this.state.items.length;
        let indexOfItemFocused = this.state.indexOfItemFocused;

        if ( event.key === 'ArrowDown' ) {

            if ( indexOfItemFocused < countOfItems - 1 ) {

                indexOfItemFocused ++;
            }

        }
        else if ( event.key === 'ArrowUp' ) {

            if ( indexOfItemFocused > 0 ) {

                indexOfItemFocused --;
            }

        }
        else {

            return;
        }

        this.domElement.scrollTop = indexOfItemFocused * this.searchListItemHeight;

        this.itemFocused = this.state.items[ indexOfItemFocused ];

        if ( this.props.onListItemFocus instanceof Function ) {

            this.props.onListItemFocus( this.itemFocused );
        }

        this.setState( {

            indexOfItemFocused: indexOfItemFocused

        } );

    }
    
    componentDidMount() {

        let style = window.getComputedStyle( this.searchListItemElement.domElement );
        
        this.searchListItemHeight = parseInt( style.height, 10 );

        document.addEventListener( 'keydown', this.handleKeyDown );
    }
    
    componentWillUnmount() {

        document.removeEventListener( 'keydown', this.handleKeyDown );
    }

    render() {

        let items = this.state.items;
        let onPropsSelect = new Function();

        if ( this.props.onSelect instanceof Function ) {

            onPropsSelect = this.props.onSelect;
        }

        return (

            <div 
                className="search-box__list"
                ref={ elem => { this.domElement = elem; } }
            >
            {
                
                items.map( ( item, key ) => {

                    let isFocused = false;

                    if ( key === this.state.indexOfItemFocused ) {

                        isFocused = true;
                    }

                    return (

                        <SearchListItem 
                            key={ key }
                            item={ item }
                            isFocused={ isFocused }
                            onSelect={ onPropsSelect }
                            ref={ elem => this.searchListItemElement = elem }
                        />
                    );
                    
                } )
            }
            </div>
        )
    }
}