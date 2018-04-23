/* User List component 
 * 
 * Markups:
 * 
 * <EntityList entities={ UserProfile[] } /> 
 *
 */

const React = require( 'react' );
const util = require( '../core/util.js' );
const EntityStrip = require( './entity-strip.js' ).EntityStrip;

class EntityList extends React.Component {

    constructor( props ) {

        super( props );

        this.state = {

            entities: []
        };
    }

    static getDerivedStateFromProps( nextProps, prevState ) {
        
        return {

            entities: util.setDefault( nextProps.entities, [] )
        };
    }

    render() {

        return (

            <div className="entity-list">
            {
                this.state.entities.map( ( entity, key ) => 

                    <EntityStrip key={ key } entity={ entity } />
                )
            }
            </div>
        );
    }
}

module.exports = {

    EntityList
}