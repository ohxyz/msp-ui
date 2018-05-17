const util = require( '../../helpers/util.js' );
const React = require( 'react' );

const DEFAULT_ICON_STYLE = 'info';
const DEFAULT_SECONDS_TO_DISMISS = -1;

class MessageBox extends React.Component {

    constructor( props ) {

        super( props );

        this.state = {

            type: '',
            iconStyle: '',
            title: '',
            content: '',
            shouldDisplay: true,
            secondsToDismiss: 0,
            onPropsDismiss: new Function()
        };

        this.mapOfTypeAndIcon = {

            'warning': 'warning',
            'error': 'cancel',
            'success': 'check_circle',
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
            secondsToDismiss: util.setDefault( nextProps.seconds, DEFAULT_SECONDS_TO_DISMISS ),
            onPropsDismiss: util.setDefault( nextProps.onDismiss, new Function() )
        };
    }

    dismissInSeconds( seconds ) {

        let milliseconds = parseInt( seconds, 10 ) * 1000;

        setTimeout( () => { 

            this.setState( {

                shouldDisplay: false

            } );

            this.state.onPropsDismiss();
        
        }, milliseconds );
    }

    componentDidMount() {

        let seconds = this.state.secondsToDismiss;

        if ( seconds > 0 ) {

            this.dismissInSeconds( seconds );
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

        if ( messageType !== '' ) {

            className += ' message-box--' + messageType;
        }
        else {

            className += ' message-box--info';
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

export {

    MessageBox,
};