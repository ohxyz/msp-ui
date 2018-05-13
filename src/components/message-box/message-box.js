const util = require( '../../helpers/util.js' );
const React = require( 'react' );

const DEFAULT_ICON_STYLE = 'info';

class MessageBox extends React.Component {

    constructor( props ) {

        super( props );

        this.state = {

            type: '',
            iconStyle: '',
            title: '',
            content: '',
            shouldDisplay: true,
            secondsToClose: 0,
        };

        this.mapOfTypeAndIcon = {

            'warning': 'warning',
            'error': 'cancel',
            'success': 'check circle',
            'info': 'info',
        };
    }

    static getDerivedStateFromProps( nextProps, prevState ) {
        
        return {

            type: util.setDefault( nextProps.type, '' ),
            iconStyle: util.setDefault( nextProps.iconStyle, '' ),
            title: util.setDefault( nextProps.title, '' ),
            content: util.setDefault( nextProps.content, '' ),
            shouldDisplay: util.setDefault( nextProps.shouldDisplay, true ),
            secondsToClose: util.setDefault( nextProps.seconds, 0 ),
        };
    }

    closeInSeconds( seconds ) {

        let ms = parseInt( seconds, 10 ) * 1000;

        setTimeout( () => { 

            this.setState( {

                shouldDisplay: false

            } );
        
        }, ms );
    }

    componentDidMount() {

        let seconds = this.state.secondsToClose;

        if ( seconds > 0 ) {

            this.closeInSeconds( seconds );
        }
    }

    render() {

        if ( this.state.shouldDisplay === false ) {

            return null;
        }

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