import React from 'react';

export default class SearchListItem extends React.Component {

    constructor( props ) {

        super( props );
    }

    render() {

        return (

            <div className="search-box__list-item">
                {this.props.content }
            </div>
        )
    }

}