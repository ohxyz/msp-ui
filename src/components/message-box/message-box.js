const util = require( '../../helpers/util.js' );
const React = require( 'react' );

const DEFAULT_ICON_STYLE = 'info';
const DEFAULT_SECONDS_TO_DISMISS = -1;

class MessageBox extends React.Component {

    constructor( props ) {

        super( props );

        this.state = {

            type: util.setDefault( props.type, '' ),
            iconStyle: util.setDefault( props.iconStyle, '' ),
            title: util.setDefault( props.title, '' ),
            content: util.setDefault( props.content, '' ),
            shouldDisplay: util.setDefault( props.shouldDisplay, true )
        };

        this.secondsToDismiss = util.setDefault( props.seconds, DEFAULT_SECONDS_TO_DISMISS );
        this.onPropsDismiss = util.setDefault( props.onDismiss, new Function() );
        this.onPropsMount = util.setDefault( props.onMount, new Function() );
        
        this.mapOfTypeAndIcon = {

            'warning': 'warning',
            'error': 'cancel',
            'success': 'check_circle',
            'info': 'info',
        };
    }

    dismissInSeconds( seconds ) {

        let milliseconds = parseInt( seconds, 10 ) * 1000;

        setTimeout( () => { 

            this.setState( {

                shouldDisplay: false

            } );

            this.onPropsDismiss( this );
        
        }, milliseconds );
    }

    componentDidMount() {

        this.onPropsMount( this );

        let seconds = this.secondsToDismiss;

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