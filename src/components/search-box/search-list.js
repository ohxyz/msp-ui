import React from 'react';
import SearchListItem from './search-list-item.js';


export default class SearchList extends React.Component {

    constructor( props ) {

        super( props );

    }

    render() {

        let items = this.props.items;

        return (

            <div className="search-box__list">
            {
                items.map( ( item, key ) => { 

                    return (

                        <SearchListItem 
                            key={ key }
                            content={ item }
                        />
                    );

                } )

            }
            </div>

        )

    }

}