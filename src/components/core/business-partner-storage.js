/* Store and process users data from SAP
 *
 */

const util = require( '../core/util.js' );
const AccountProfile = require( '../core/account-profile.js' ).AccountProfile;
const HierarchyNode = require( '../core/hierarchy-node.js' ).HierarchyNode;

class BusinessPartnerStorage {

    constructor( sapRaw ) {

        this.sapRaw = sapRaw;
        this.sapObject = null;
        this.sapResults = null;
        this.users = [];
        this.orgs = [];
        this.accounts = []; // users + orgs
        this.nodes = []; // HierarchyNodes

        /*
         *
         * @example [
         *
         *     { "CA2B1FE6-D50C-1ED6-B5FC-07B7BC728307": HierarchyNode }
         *     { "CA2B1FE6-D50C-1ED7-BD9E-55E1ACCF4802": HierarchyNode },
         *     { "CA2B1FE6-D50C-1ED8-8AFC-C1EFC84A5801": HierarchyNode },
         *     { "CA2B1FE6-D50C-1ED8-8AFC-D71F61F20303": HierarchyNode }
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

        let lastNode = new HierarchyNode();
        let lastParentNode = new HierarchyNode();
        let hierarchyNodes = this.sapResults.map( result => new HierarchyNode( result ) );

        for ( let i = 0; i < hierarchyNodes.length; i ++ ) {

            let currentNode = hierarchyNodes[ i ];
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

            for ( let user of currentNode.users ) {

                if ( currentNode.parent !== null  ) {

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

    getUsersByHierarchyId( hierarchyId, untilLevel = 1 ) {

        let node = this.mapOfHierarchyIdAndNode[ hierarchyId ];
        let users = node.users;
        let topOrg = null;
        let topOrgName = '';
        let levelLiteral = untilLevel.toString();

        while ( node.parent !== null && node.level !== levelLiteral ) {

            let parent = node.parent;

            if ( parent.orgs.length > 0 ) {

                let parentOrg = parent.orgs[ 0 ];

                topOrg = parentOrg;
                topOrgName = parentOrg.name;
            }
            
            users.push( ...parent.users );
            node = parent;
        }

        for ( let user of users ) {

            user.topOrg = topOrg;
            user.topOrgName = topOrgName;
        }

        return users;
    }

}


module.exports = {

    BusinessPartnerStorage,
};