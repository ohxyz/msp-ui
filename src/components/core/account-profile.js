/* Collection of definition of data argTypes and structures 
 *
 * CommonJS styles eg. require, module.exports
 *
 * AU English style eg. organisation
 */
const util = require( '../../helpers/util.js' );

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
            orgs: [],
            topOrg: null,
            orgName: 'n/a',
            topOrgName: 'n/a',
            fullName: 'n/a',
            type: 'n/a'
        };

        Object.assign( this, obj );

        let argType = typeof arg;

        if ( util.isObject( arg ) === true || arg instanceof AccountProfile ) {

            for ( let prop in obj ) {

                if ( arg.hasOwnProperty( prop ) === true ) {

                    this[ prop ] = arg[ prop ];
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

    generateOrgName( orgs ) {

        let orgName = 'n/a';

        if ( util.isNotEmptyArray( orgs ) ) {

            // orgName is the concated by all org names
            orgName = this.orgs.reduceRight( ( allOrgNames, org ) => { 

                return org.name + ', ' + allOrgNames;

            }, '' ).slice( 0, -2 );
        }

        return orgName;
    }

    generateFullNameAndType() {

        if ( this.firstName === '' && this.lastName === '' ) {

            if ( this.name !== '' ) {

                this.fullName = this.name.trim();
                this.type = 'organisation';
                this.users = []; // if type is organisation, then `users` will be user accounts in that organisation
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
                this.orgName = this.generateOrgName( this.orgs );

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