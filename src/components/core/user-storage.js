/* Store and process users data from SAP
 *
 */

const util = require( '../core/util.js' );
const AccountProfile = require( '../core/account-profile.js' ).AccountProfile;

class UserStorage {

    constructor( sapRaw ) {

        this.sapRaw = sapRaw;
        this.sapObject = null;
        this.sapResults = null;
        this.users = [];
        this.orgs = [];
        this.entities = []; // users + orgs

        this.validateSapRaw();
    }

    validateSapRaw() {

        if ( util.isObject( this.sapRaw ) ===  true ) {

            this.sapObject = this.sapRaw;
        }
        else {

            let parsed = null;

            try {

                parsed = JSON.parse( this.sapRaw );
            }
            catch( error ) {

                throw new Error( '[MSP] Failed to parse SAP data. ' + error.message );
            }

            if ( util.isObject( parsed ) === false ) {

                throw new Error( '[MSP] SAP data should be parsed to an object.');
            }

            this.sapObject = parsed;
        }

        try {

            this.sapResults = this.sapObject.d.results;
        }
        catch( error ) {

            throw new Error( '[MSP] SAP data should have "d.results".' );
        }

        if ( Array.isArray( this.sapResults ) === false ) {

            throw new Error( '[MSP] SAP data\'s "d.results" should be an array.' );
        }
    }

    process() {

        let hierarchyIds = [];

        for( let node of this.sapResults ) {

            if ( node.hasOwnProperty( 'AssignedAccounts') 
                    && node.AssignedAccounts.hasOwnProperty( 'results') 
                    && Array.isArray( node.AssignedAccounts.results ) === true ) {


                let results = node.AssignedAccounts.results;
                console.log( results );
                this.processAccounts( results );

            }
        }
    }

    processAccounts( accounts ) {

        for ( let account of accounts ) {

            console.log( 1, account );

            let profile = new AccountProfile( {

                accountId: account.AccountID,
                hierarchyId: account.HierarchyID,
                name: account.Name,
                firstName: account.FirstName,
                lastName: account.LastName

            } );

            console.log( 2, profile );

            if ( profile.type === 'organisation' ) {

                this.orgs.push( profile );
            }
            else if ( profile.type === 'person' ) {

                this.users.push( profile );
            }

            this.entities.push( profile );
        }
    }

}

module.exports = {

    UserStorage,
};