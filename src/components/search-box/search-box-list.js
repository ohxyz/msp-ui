import React from 'react';
import SearchListItem from './search-box-list-item.js';


export default class SearchList extends React.Component {

    constructor( props ) {

        super( props );
    }

    render() {

        let items = this.props.items;
        let onPropsSelect = new Function();

        if ( this.props.onSelect instanceof Function ) {

            onPropsSelect = this.props.onSelect;
        }

        return (

            <div className="search-box__list">
            {
                items.map( ( item, key ) => { 

                    return (

                        <SearchListItem 
                            key={ key }
                            item={ item }
                            onSelect={ onPropsSelect }
                        />
                    );
                    
                } )
            }
            </div>
        )
    }
}