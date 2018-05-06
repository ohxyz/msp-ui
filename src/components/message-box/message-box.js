const util = require( '../../helpers/util.js' );
const React = require( 'react' );

const DEFAULT_ICON_STYLE = 'info';

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
        let defaultIconStyle = 'info';

        if ( iconLiteral === '' ) {

            iconLiteral = this.mapOfTypeAndIcon[ messageType ];

            if ( iconLiteral === undefined ) {

                iconLiteral = DEFAULT_ICON_STYLE;
            }
        }
        else {

            if ( messageType !== '' ) {

                className += ' message-box--' + messageType;
            }
            else {

                className += ' message-box--info';
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