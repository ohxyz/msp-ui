/* Collection of definition of data argTypes and structures 
 *
 * CommonJS styles eg. require, module.exports
 *
 * US English style eg. organisation
 */
const util = require( '../core/util.js' );

class EntityProfile {

    constructor( arg ) {

        let obj = { 

            accountId: '',
            hierarchyId: '',
            parentId: '',
            firstName: '',
            lastName: '',
            name: '',
            emailAddress: '',
            level: '',
        };

        let argType = typeof arg;

        this.fullName = 'N/A';

        if ( argType === 'string'
                || argType === 'number'
                || argType === 'boolean' ) {

            this.fullName = arg;
        }
        else if ( util.isObject( arg ) === true ) {

            for ( let prop in obj ) {

                if ( arg.hasOwnProperty( prop ) === true ) {

                    obj[ prop ] = arg[ prop ];
                }
            }
        }

        for( let prop in obj ) {

            this[ prop ] = obj[ prop ].toString();
        }

        if ( this.firstName === '' && this.lastName === '' && this.name !== '' ) {

            this.fullName = this.name;
        }
        else if ( ( this.firstName !== '' || this.lastName !== '' )
                        && this.name === '' ) {

            this.fullName = this.firstName + ' ' + this.lastName;
        }

    }
}

module.exports = {

    EntityProfile
};