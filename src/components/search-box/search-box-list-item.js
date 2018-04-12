import React from 'react';

export default class SearchListItem extends React.Component {

    constructor( props ) {

        super( props );
        this.handleClick = this.handleClick.bind( this );
    }

    handleClick() {

        this.props.onSelect( this.props.item.content );
    }

    render() {

        return (

            <div className="search-box__list-item" onClick={ this.handleClick }>
                {this.props.item.content }
            </div>
        )
    }

}