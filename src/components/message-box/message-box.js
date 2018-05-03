const util = require( '../../helpers/util.js' );
const React = require( 'react' );

class MessageBox extends React.Component {

    constructor( props ) {

        super( props );

        this.state = {

            type: util.setDefault( props.type, '' ),
            iconStyle: util.setDefault( props.iconStyle, '' ),
            title: util.setDefault( props.title, '' ),
            content: util.setDefault( props.content, '' )
        };

        this.mapOfTypeAndIcon = {

            'default': 'message',
            'warning': 'warning',
            'error': 'cancel',
            'success': 'check circle',
            'info': 'info',
        };
    }

    render() {

        let className = 'message-box';
        let iconLiteral = this.state.iconStyle;
        let messageType = this.state.type;

        if ( messageType !== '' ) {

            className += ' message-box--' + messageType;
        }

        if ( iconLiteral === '' && messageType !== '' ) {

            iconLiteral = this.mapOfTypeAndIcon[ messageType ];

            if ( typeof iconLiteral === 'undefined' ) {

                iconLiteral = this.mapOfTypeAndIcon[ messageType ];
            }
        }

        return (

            <div className={ className }>
                <i className="material-icons">{ iconLiteral }</i>
                <div className="message-box__title">{ this.state.title }</div>
                <div className="message-box__content">{ this.state.content }</div>
            </div>
        );
    }
}

module.exports = {

    MessageBox,
};