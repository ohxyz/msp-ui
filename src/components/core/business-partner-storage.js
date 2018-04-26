/* Store and process users data from SAP
 *
 */

const util = require( '../core/util.js' );
const AccountProfile = require( '../core/account-profile.js' ).AccountProfile;
const SapNode = require( '../core/sap-node.js' ).SapNode;

function doAccountsExist( node ) {

    if ( node.hasOwnProperty( 'AssignedAccounts')
            && util.isObject( node.AssignedAccounts )
            && node.AssignedAccounts.hasOwnProperty( 'results' ) 
            && Array.isArray( node.AssignedAccounts.results ) === true ) {

        return true;
    }

    return false;
}

class BusinessPartnerStorage {

    constructor( sapRaw ) {

        this.sapRaw = sapRaw;
        this.sapObject = null;
        this.sapResults = null;
        this.users = [];
        this.orgs = [];
        this.accounts = []; // users + orgs
        this.nodes = []; // Each node in sapResults plus additional info

        /*
         *
         * @example [
         *
         *     { "CA2B1FE6-D50C-1ED6-B5FC-07B7BC728307": Object }
         *     { "CA2B1FE6-D50C-1ED7-BD9E-55E1ACCF4802": Object },
         *     { "CA2B1FE6-D50C-1ED8-8AFC-C1EFC84A5801": Object },
         *     { "CA2B1FE6-D50C-1ED8-8AFC-D71F61F20303": Object }
         * ]
         */
         this.mapOfHierarchyIdAndNode = { };
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

        this.validateSapRaw();

        let lastNode = { HierarchyID: '', ParentID: '' };
        let lastParentNode = { HierarchyID: '', ParentID: '' };

        for ( let i = 0; i < this.sapResults.length; i ++ ) {

            let currentNode = this.sapResults[ i ];

            if ( util.isObject( currentNode ) === false
                || currentNode.hasOwnProperty( 'HierarchyID' ) === false
                || currentNode.hasOwnProperty( 'ParentID') === false ) {

                continue;
            }

            let hierarchyId = currentNode.HierarchyID;
            let usersOrgs = { users: [], orgs: [] };

            // Process AssignedAccounts
            if ( doAccountsExist( currentNode ) === true ) {

                let results = currentNode.AssignedAccounts.results;
                let moreInfo = {

                    parentId: currentNode.ParentID
                };

                usersOrgs = this.processAccounts( results, moreInfo );
            }

            //Process currentNode
            if ( currentNode.ParentID === lastNode.HierarchyID ) {

                currentNode.Parent = lastNode;
            }
            else if ( lastNode.hasOwnProperty( 'Parent' )
                    && util.isObject( lastNode.Parent )
                    && lastNode.Parent.hasOwnProperty( 'HierarchyID' ) 
                    && lastNode.Parent.HierarchyID === currentNode.ParentID ) {

                currentNode.Parent = lastNode.Parent;
            }
            else {

                let parentId = currentNode.ParentID;

                if ( this.mapOfHierarchyIdAndNode.hasOwnProperty( parentId ) ) {

                    let parent = this.mapOfHierarchyIdAndNode[ parentId ];
                    currentNode[ 'Parent' ] = parent;
                }
            }

            currentNode.Users = usersOrgs.users;
            currentNode.Orgs = usersOrgs.orgs;

            this.mapOfHierarchyIdAndNode[ hierarchyId ] = currentNode;
            this.nodes.push( currentNode );
            lastNode = currentNode;
        }
    }

    processAccounts( accounts, moreInfo ) {

        let usersInAccount = [];
        let orgsInAccount = [];

        for ( let account of accounts ) {

            let acccountWithMoreInfo = Object.assign( {

                accountId: account.AccountID,
                hierarchyId: account.HierarchyID,
                name: account.Name,
                firstName: account.FirstName,
                lastName: account.LastName,

            }, moreInfo );

            let profile = new AccountProfile( acccountWithMoreInfo );

            if ( profile.type === 'organisation' ) {

                this.orgs.push( profile );
                orgsInAccount.push( profile );
            }
            else if ( profile.type === 'person' ) {

                this.users.push( profile );
                usersInAccount.push( profile );
            }

            this.accounts.push( profile );
        }

        for( let org of orgsInAccount ) {

            org.users = usersInAccount;
        }

        return {

            users: usersInAccount,
            orgs: orgsInAccount
        };

    }

    getUsersByHierarchyId( hierarchyId ) {

        let node = this.mapOfHierarchyIdAndNode[ hierarchyId ];

        let users = node.Users;

        while ( node.hasOwnProperty( 'Parent') ) {

            let parent = node.Parent;

            if ( doAccountsExist( parent ) === true ) {

                users.push( ...parent.Users );
            }

            node = parent;
        }

        return users;
    }

}


module.exports = {

    BusinessPartnerStorage,
};