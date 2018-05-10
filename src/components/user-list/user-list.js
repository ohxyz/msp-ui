/* User List component 
 * 
 * Markups:
 * 
 * <UserList users={ AccountProfile[] } /> 
 *
 */

import React from 'react';
import util from '../../helpers/util.js';
import { UserStrip } from './user-strip.js';
import { MessageBox } from '../message-box/message-box.js';
import { componentManager } from '../core/component-manager.js';

class UserList extends React.Component {

    constructor( props ) {

        super( props );

        this.state = {

            domElementId: undefined,
            users: [],
            shouldRenderCount: true,
            countIconStyle: '',
            onRenderCount: new Function(),
            sortByFields: []
        };

        this.id = util.setDefault( props.id, util.generateRandomString() );
        componentManager.addComponent( this.id, this );
    }

    static getDerivedStateFromProps( nextProps, prevState ) {
        
        return {

            domElementId: util.setDefault( nextProps.id, undefined ),
            users: util.setDefault( nextProps.users, [] ),
            shouldRenderCount: util.setDefault( nextProps.shouldRenderCount, true ),
            onRenderCount: util.setDefault( nextProps.onRenderCount, new Function() ),
            sortByFields: util.setDefault( nextProps.sortByFields, [] ),
            countIconStyle: util.setDefault( nextProps.countIconStyle, 'perm_identity' )
        };
    }

    sortUsersByFields( users, fieldNames ) {

        if ( Array.isArray( fieldNames) === false || fieldNames.length === 0 ) {

            return users;
        }

        function compare( a, b, fields, fieldIndex ) {

            let field = fields[ fieldIndex ];

            if ( a[ field ] === undefined || b[ field ] === undefined ) {

                return false;
            }
            else {

                return a[ field ].localeCompare( b[ field ] );
            }

        }

        return users.sort( ( a, b ) => {

            let result = 0;

            for ( let i = 0; i < fieldNames.length; i ++ ) {

                result = compare( a, b, fieldNames, i )

                if ( result !== 0 ) {

                    return result;
                }
            }

            return result;

        } );
    }

    renderCount() {

        if ( this.state.shouldRenderCount === false ) {

            return;
        }

        let count = this.state.users.length;

        return (

            <div className="user-list__count">
                <i className="material-icons">{ this.state.countIconStyle }</i>
                <span className="user-list__count__literal">{ this.state.onRenderCount( count ) }</span>
            </div>
        );
    }

    renderUserList( users ) {

        if ( users.length === 0 ) {

            return (

                <MessageBox 
                    type="info"
                    title="No users found"
                    content="That orgnisation has no registered users"
                />
            );
        }

        return (

            <div className="user-list__users">
            {
                users.map( ( user, key ) => {

                    return <UserStrip key={ key } user={ user } />
                } )
            }
            </div>
        );
    }

    render() {

        let users = this.sortUsersByFields( this.state.users, this.state.sortByFields );

        return (

            <div id={ this.state.domElementId } className="user-list">
                { this.renderCount() }
                { this.renderUserList( users ) }
            </div>
        );
    }
}

module.exports = {

    UserList
};