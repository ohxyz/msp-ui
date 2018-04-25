/* Collection of definition of data argTypes and structures 
 *
 * CommonJS styles eg. require, module.exports
 *
 * AU English style eg. organisation
 */
const util = require( './util.js' );

class AccountProfile {

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
            org: '',   // Group, organisation, etc
            topOrg: '', // Name of top level 
        };

        Object.assign( this, obj );

        let argType = typeof arg;

        this.fullName = 'n/a';
        this.type = 'n/a';

        if ( util.isObject( arg ) === true || arg instanceof AccountProfile ) {

            for ( let prop in obj ) {

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
                this.type = 'organisation';
            }
            else {

                this.type = 'empty';
            }
        }
        // this.firstName !== '' || this.lastName !== ''
        else {

            if ( this.name === '' ) {

                this.fullName = ( this.firstName + ' ' + this.lastName ).trim();
                this.type = 'person';
            }
            else {

                this.fullName = ( this.firstName + ' ' + this.lastName + ' ' + this.name ).trim();
                this.type = 'mixed';
            }
        }
    }
}

module.exports = {

    AccountProfile
};