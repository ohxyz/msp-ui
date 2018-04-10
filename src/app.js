import React from 'react';
import ReactDOM from 'react-dom';

require( '../less/main.less' );

class App extends React.Component {

    render() {

        return (

            <div>
                <h1>MSP</h1>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);