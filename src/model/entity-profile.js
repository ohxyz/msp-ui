/* Collection of definition of data argTypes and structures 
 *
 * CommonJS styles eg. require, module.exports
 *
 * US English style eg. organization
 */
const util = require( '../helpers/util.js' );

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
            group: '',   // Organization, group, etc
            topGroup: '', // Name of top level 
        };

        Object.assign( this, obj );

        let argType = typeof arg;

        this.fullName = 'n/a';
        this.type = 'n/a';

        if ( util.isObject( arg ) === true || arg instanceof EntityProfile ) {

            for ( let prop in arg ) {

                if ( arg.hasOwnProperty( prop ) === true ) {

                    this[ prop ] = arg[ prop ].toString();
                }
            }
        }
        else if ( argType === 'string'
                || argType === 'number'
                || argType === 'boolean' ) {

            this.fullName = arg;
        }
        else if ( arg === null ) {

            this.fullName = 'null';
        }

        this.generateFullNameAndType();
    }

    generateFullNameAndType() {

        if ( this.firstName === '' && this.lastName === '' ) {

            if ( this.name !== '' ) {

                this.fullName = this.name.trim();
                this.type = 'business';
            }
            else {

                this.type = 'empty';
            }
        }
        // this.firstName !== '' || this.lastName !== ''
        else {

            if ( this.name === '' ) {

                this.fullName = ( this.firstName + ' ' + this.lastName ).trim();
                this.type = 'human';
            }
            else {

                this.fullName = ( this.firstName + ' ' + this.lastName + ' ' + this.name ).trim();
                this.type = 'mixed';
            }
        }
    }
}

module.exports = {

    EntityProfile
};