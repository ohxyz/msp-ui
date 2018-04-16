import React from 'react';
import SearchListItem from './search-box-list-item.js';

export default class SearchList extends React.Component {

    constructor( props ) {

        super( props );
        this.handleKeyDown = this.handleKeyDown.bind( this );

        this.itemFocused = null;
        this.domElement = null;
        this.domElementTabIndex = Math.floor( Math.random() * Math.floor( 65535 ) );

        this.state = {

            itemIndexFocused: -1,
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
        let itemIndexFocused = this.state.itemIndexFocused;

        if ( event.key === 'ArrowDown' ) {

            this.domElement.focus();

            if ( itemIndexFocused < countOfItems - 1 ) {

                itemIndexFocused ++;
            }
            else {

                // itemIndexFocused = 0;
            }
        }
        else if ( event.key === 'ArrowUp' ) {

            if ( itemIndexFocused > 0 ) {

                itemIndexFocused --;
            }
            else {

                // itemIndexFocused = countOfItems - 1;
            }
        }
        else {

            return;
        }

        this.itemFocused = this.state.items[ itemIndexFocused ];

        if ( this.props.onListItemFocus instanceof Function ) {

            this.props.onListItemFocus( this.itemFocused );
        }

        this.setState( {

            itemIndexFocused: itemIndexFocused

        } );

    }
    
    componentDidMount() {

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
                tabIndex={ this.domElementTabIndex }
            >
            {
                
                items.map( ( item, key ) => {

                    let isFocused = false;

                    if ( key === this.state.itemIndexFocused ) {

                        isFocused = true;
                    }

                    return (

                        <SearchListItem 
                            key={ key }
                            item={ item }
                            isFocused={ isFocused }
                            onSelect={ onPropsSelect }
                        />
                    );
                    
                } )
            }
            </div>
        )
    }
}