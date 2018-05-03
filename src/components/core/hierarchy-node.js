const util = require( '../../util/util.js' );
const AccountProfile = require( './account-profile.js' ).AccountProfile;

class HierarchyNode {

    constructor( rawNode ) {

        if ( util.isObject( rawNode ) === false ) {

            rawNode = {};
        }

        this.hierarchyId = util.setDefault( rawNode.HierarchyID, '-1' );
        this.parentId = util.setDefault( rawNode.ParentID, '-1' );
        this.description = util.setDefault( rawNode.Description );
        this.level = util.setDefault( rawNode.Level, '-1' );
        this.rawNode = rawNode;
        this.parent = null;

        Object.assign( this, this.assignAccounts( this.rawNode ) );
    }

    assignAccounts( node ) {

        let accounts = [];
        let users = [];
        let orgs = [];
        let orgName = '';

        if ( node.hasOwnProperty( 'AssignedAccounts')
                && util.isObject( node.AssignedAccounts )
                && node.AssignedAccounts.hasOwnProperty( 'results' ) 
                && Array.isArray( node.AssignedAccounts.results ) === true ) {

            for ( let account of node.AssignedAccounts.results ) {

                let profile = {

                    accountId: account.AccountID,
                    hierarchyId: account.HierarchyID,
                    parentId: this.parentId,
                    name: account.Name,
                    firstName: account.FirstName,
                    lastName: account.LastName,
                };

                let accountProfile = new AccountProfile( profile );

                if ( accountProfile.type === 'organisation' ) {

                    accountProfile.users = users;
                    orgs.push( accountProfile );
                    
                }
                else if ( accountProfile.type === 'person' ) {

                    accountProfile.orgs = orgs;
                    users.push( accountProfile );
                }

                accountProfile.level = this.level;
                orgName = accountProfile.generateOrgName( orgs );
                accounts.push( accountProfile );
            }
                    
            users.forEach( user => { 

                user.orgName = orgName;

            } );
        }

        return {

            accounts: accounts,
            users: users,
            orgs: orgs
        };
    }

}

module.exports = {

    HierarchyNode,
}

