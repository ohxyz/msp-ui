import React from 'react';
import { SearchItem } from './data-model.js';

export default class SearchListItem extends React.Component {

    constructor( props ) {

        super( props );
        this.handleClick = this.handleClick.bind( this );

        this.domElement = null;
    }

    handleClick() {

        this.props.onSelect( this.props.item );
    }

    render() {

        let item = this.props.item;
        let content = item.__content__;
        let isFocused = this.props.isFocused;

        let className = this.props.isFocused === true
                      ? 'search-box__list-item search-box__list-item--focused'
                      : 'search-box__list-item';

        return (

            <div className={ className } onClick={ this.handleClick } ref={ elem => this.domElement = elem }>
                { content }
            </div>
        )
    }

}