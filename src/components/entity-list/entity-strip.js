import React from 'react';
import { setDefault } from '../../core/util.js';
import { EntityProfile } from '../../model/entity-profile.js';

export default class entityStrip extends React.Component {

    constructor( props ) {

        super( props );

        this.state = {

            entity: null
        };
    }

    static getDerivedStateFromProps( nextProps, prevState ) {
        
        return {

            entity: setDefault( nextProps.entity, new EntityProfile() )

        };
    }

    render() {

        let entity = this.state.entity;

        return (

            <div className="entity-list__entity">
                <div className="entity-list__name">{ entity.name }</div>
            </div>

        )
    }
}
