import React from 'react';
import ReactDOM from 'react-dom';
import { MessageBox } from '../../../../src/components/message-box/message-box.js';

import '../../../../less/components/message-box.less';

let m1 = {

    title: 'Cloud title 2',
    content: 'Cloud content',
    type: 'info',
};

let m2 = {

    type: 'error',
    title: 'Users not found',
    content: 'Search again'
};

class MessageBoxTest extends React.Component {

    constructor( props ) {

        super( props );

        this.state = {

            foo: 1
        };

        this.handleButtonClick = this.handleButtonClick.bind( this );
    }

    handleButtonClick() {

        this.setState( { foo: 2 } );
    }

    render() {
        
        console.log( 'rendered', this.state );

        return (

            <div>
                <button onClick={ this.handleButtonClick }>Re-render</button>
                <MessageBox 
                    iconStyle={ m1.icon } 
                    type={ m1.type }
                    content={ m1.content }
                    onMount={ () => console.log( 0, 'mounted' ) }
                    onDismiss={ () => console.log( 1, 'dismissed' ) }
                    seconds={ 5 }
                />
            </div>
        );
    }
}

let container = document.getElementById( 'message-box-1' );

ReactDOM.render( 

    <MessageBoxTest />,
    container
);

document.getElementById( 'reload' ).addEventListener( 'click', () => { 

    ReactDOM.unmountComponentAtNode( container );
    ReactDOM.render( <MessageBoxTest />, container );

} );

