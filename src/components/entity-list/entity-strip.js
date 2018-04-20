import React from 'react';
import { setDefault } from '../core/util.js';
import { EntityProfile } from '../../model/entity-profile.js';


function getExpandIconText( shouldExpand ) {

    return shouldExpand === true ? 'remove' : 'add';

}

export default class EntityStrip extends React.Component {

    constructor( props ) {

        super( props );

        this.handleExpandClick = this.handleExpandClick.bind( this );

        this.state = {

            entity: null,
            shouldDropDownExpanded: false,
            expandIconText: 'add'
        };
    }

    static getDerivedStateFromProps( nextProps, prevState ) {

        let shouldExpand = setDefault( nextProps.shouldDropDownExpanded, false );
        
        return {

            entity: setDefault( nextProps.entity, new EntityProfile() ),
            shouldDropDownExpanded: shouldExpand,
            expandIconText: getExpandIconText( shouldExpand )
        };
    }

    handleExpandClick() {

        let shouldExpand = !this.state.shouldDropDownExpanded;

        this.setState( { 

            shouldDropDownExpanded: shouldExpand,
            expandIconText: getExpandIconText( shouldExpand )

        } );
    }

    renderDropDown() {

        if ( this.state.shouldDropDownExpanded === true ) {

            return (

                <div className="entity-strip__dropdown">
                    <div className="entity-strip__dropdown__content">User access level</div>
                </div>
            );
        }
    }

    render() {

        let entity = this.state.entity;

        return (

            <div className="entity-strip">
                <div className="entity-strip__main">
                    <div className="entity-strip__delete material-icons">close</div>
                    <div 
                        className="entity-strip__expand material-icons" 
                        onClick={ this.handleExpandClick }
                    >
                        { this.state.expandIconText }
                    </div>
                    <div className="entity-strip__top-bar">
                        <span className="entity-strip__full-name">{ entity.fullName }</span>
                        <span className="entity-strip__top-group">{ entity.topGroup }</span>
                    </div>
                    <div className="entity-strip__middle-bar">
                        <div className="entity-strip__group">{ entity.group }</div>
                    </div>
                </div>
                { this.renderDropDown() }
            </div>
        );
    }
}
