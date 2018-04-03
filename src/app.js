import React from 'react';
import ReactDOM from 'react-dom';
import { InsertText } from 'web-form-controls';

require( '../less/main.less' );

class App extends React.Component {

    render() {

        return (

            <div>
                <InsertText hint="Agencies" />
                <h1>Hello, world X !</h1>
            </div>
        );
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('root')
);