const util = require( '../../helpers/util.js' );
const User = require( './user.js' ).User;

class HierarchyNode {

    constructor( rawNode ) {

        if ( util.isObject( rawNode ) === false ) {

            rawNode = {};
        }

        this.rawNode = rawNode;
        this.hierarchyId = util.setDefault( rawNode.HierarchyID, '-1' );
        this.parentId = util.setDefault( rawNode.ParentID, '-1' );
        this.description = util.setDefault( rawNode.Description );
        this.level = util.setDefault( rawNode.Level, '-1' );

        this.fullName = this.description;
        this.parent = null;
        this.children = [];
        this.users = this.assignUsers( rawNode );
    }

    assignUsers( node ) {

        let users = [];

        if ( node.hasOwnProperty( 'AssignedAccounts')
                && util.isObject( node.AssignedAccounts )
                && node.AssignedAccounts.hasOwnProperty( 'results' ) 
                && Array.isArray( node.AssignedAccounts.results ) === true ) {

            for ( let account of node.AssignedAccounts.results ) {

                let firstName = account.FirstName;
                let lastName = account.LastName;

                if ( firstName === undefined || lastName === undefined ) {

                    throw new Error( "[MSP] Assigned account does not have FirstName or LastName" );
                }
                else if ( firstName !== '' || lastName !== '' ) {

                    let user = new User( { 

                        accountId: account.AccountID,
                        firstName: firstName,
                        lastName: lastName,
                        isAdmin: account.IsAdmin,
                        hierarchyId: account.HierarchyID,
                        parentId: this.parentId,
                        currentNode: this,
                        currentNodeDescription: this.description,
                        level: this.level
                    } );

                    users.push( user );
                }
            }
        }

        return users;
    }
}

module.exports = {

    HierarchyNode,
}

