/* Store and process users data from SAP
 *
 */

const util = require( '../core/util.js' );
const AccountProfile = require( '../core/account-profile.js' ).AccountProfile;
const SapNode = require( '../core/sap-node.js' ).SapNode;

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
         *     { "CA2B1FE6-D50C-1ED6-B5FC-07B7BC728307": SapNode }
         *     { "CA2B1FE6-D50C-1ED7-BD9E-55E1ACCF4802": SapNode },
         *     { "CA2B1FE6-D50C-1ED8-8AFC-C1EFC84A5801": SapNode },
         *     { "CA2B1FE6-D50C-1ED8-8AFC-D71F61F20303": SapNode }
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

        let lastNode = new SapNode();
        let lastParentNode = new SapNode();
        let sapNodes = this.sapResults.map( result => new SapNode( result ) );

        for ( let i = 0; i < sapNodes.length; i ++ ) {

            let currentNode = sapNodes[ i ];
            let hierarchyId = currentNode.hierarchyId;

            if ( currentNode.parentId === lastNode.hierarchyId ) {

                currentNode.parent = lastNode;
            }
            else if ( lastNode.parent !== null
                    && lastNode.parent.hierarchyId === currentNode.parentId ) {

                currentNode.parent = lastNode.parent;
            }
            else {

                let parentId = currentNode.parentId;

                if ( this.mapOfHierarchyIdAndNode.hasOwnProperty( parentId ) ) {

                    let parent = this.mapOfHierarchyIdAndNode[ parentId ];
                    currentNode.parent = parent;
                }
            }

            this.users.push( ...currentNode.users );
            this.orgs.push( ...currentNode.orgs );
            this.accounts.push( ...currentNode.accounts );

            this.mapOfHierarchyIdAndNode[ hierarchyId ] = currentNode;
            this.nodes.push( currentNode );

            lastNode = currentNode;
        }
    }

    getUsersByHierarchyId( hierarchyId ) {

        let node = this.mapOfHierarchyIdAndNode[ hierarchyId ];
        let users = node.users;

        while ( node.parent !== null ) {

            let parent = node.parent;
            
            users.push( ...parent.users );

            node = parent;
        }

        return users;
    }

}


module.exports = {

    BusinessPartnerStorage,
};