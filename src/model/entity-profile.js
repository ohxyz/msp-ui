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

        let argType = typeof arg;

        this.fullName = 'n/a';
        this.type = 'n/a';

        if ( util.isObject( arg ) === true ) {

            for ( let prop in obj ) {

                if ( arg.hasOwnProperty( prop ) === true ) {

                    obj[ prop ] = arg[ prop ];
                }
            }
        }
        else if ( argType === 'string'
                || argType === 'number'
                || argType === 'boolean' ) {

            this.fullName = arg;
        }

        for( let prop in obj ) {

            this[ prop ] = obj[ prop ].toString();
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