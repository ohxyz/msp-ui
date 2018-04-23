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

            entities: [],
            shouldRenderCount: true,
            onRenderCount: new Function()
        };
    }

    static getDerivedStateFromProps( nextProps, prevState ) {
        
        return {

            entities: util.setDefault( nextProps.entities, [] ),
            shouldRenderCount: util.setDefault( nextProps.shouldRenderCount, true ),
            onRenderCount: util.setDefault( nextProps.onRenderCount, new Function ),
        };
    }

    renderCount() {

        if ( this.state.shouldRenderCount === false ) {

            return;
        }

        let count = this.state.entities.length;

        return (

            <div className="entity-list__count">
                <span className="entity-list__count__literal">{ this.state.onRenderCount( count ) }</span>
            </div>

        );
    }

    render() {

        return (

            <div className="entity-list">
            { this.renderCount() }
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