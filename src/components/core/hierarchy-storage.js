/* Store and process users data from SAP
 *
 */

const util = require( '../../helpers/util.js' );
const HierarchyNode = require( '../core/hierarchy-node.js' ).HierarchyNode;

class HierarchyStorage {

    constructor( sapRaw, shouldProcess = false ) {

        this.sapRaw = sapRaw;
        this.sapResults = null;
        this.nodes = []; // HierarchyNodes
        this.isProcessed = false;

        /*
         * @example [
         *
         *     { "CA2B1FE6-D50C-1ED6-B5FC-07B7BC728307": HierarchyNode },
         *     { "CA2B1FE6-D50C-1ED7-BD9E-55E1ACCF4802": HierarchyNode },
         *     { "CA2B1FE6-D50C-1ED8-8AFC-C1EFC84A5801": HierarchyNode },
         *     { "CA2B1FE6-D50C-1ED8-8AFC-D71F61F20303": HierarchyNode }
         * ]
         */
         this.mapOfHierarchyIdAndNode = { };

         if ( shouldProcess === true ) {

            this.process( this.sapRaw );
         }
    }

    /* 
     *
     * @param content can be a JSON string or an object
     */
    validateSapRaw( content ) {

        let sapObject = null;

        if ( util.isObject( content ) ===  true ) {

            sapObject = content;
        }
        else {

            let parsed = null;

            try {

                parsed = JSON.parse( content );
            }
            catch( error ) {

                throw new Error( '[MSP] Failed to parse SAP data. ' + error.message );
            }

            if ( util.isObject( parsed ) === false ) {

                throw new Error( '[MSP] SAP data should be parsed to an object.');
            }

            sapObject = parsed;
        }

        if ( sapObject.hasOwnProperty( 'results' )
                && Array.isArray( sapObject.results ) === true ) {

            this.sapResults = sapObject.results;

        }
        else {

            try {

                this.sapResults = sapObject.d.results;
            }
            catch( error ) {

                throw new Error( '[MSP] SAP data should have "d.results".' );
            }
        }

        if ( Array.isArray( this.sapResults ) === false ) {

            throw new Error( '[MSP] SAP data\'s "d.results" should be an array.' );
        }
    }

    process() {

        this.validateSapRaw( this.sapRaw );

        let lastNode = new HierarchyNode();
        let lastParentNode = new HierarchyNode();
        let hierarchyNodes = this.sapResults.map( result => new HierarchyNode( result ) );
        let allUsers = [];

        for ( let i = 0; i < hierarchyNodes.length; i ++ ) {

            let currentNode = hierarchyNodes[ i ];
            let hierarchyId = currentNode.hierarchyId;

            if ( currentNode.parentId === lastNode.hierarchyId ) {

                currentNode.parent = lastNode;
                lastNode.children.push( currentNode );
            }
            else if ( lastNode.parent !== null
                    && lastNode.parent.hierarchyId === currentNode.parentId ) {

                currentNode.parent = lastNode.parent;
                lastNode.parent.children.push( currentNode );
            }
            else {

                let parentId = currentNode.parentId;

                if ( this.mapOfHierarchyIdAndNode.hasOwnProperty( parentId ) ) {

                    let parent = this.mapOfHierarchyIdAndNode[ parentId ];
                    currentNode.parent = parent;
                    parent.children.push( currentNode );
                }
            }

            for ( let user of currentNode.users ) {

                user.parentNode = currentNode.parent;
                user.parentNodeDescription = user.parentNode === null ? '' : user.parentNode.description;

                let accessNodes = this.getUserAccessNodes( user );

                user.topNode = accessNodes[ 0 ];
                user.topNodeDescription = user.topNode.description;
                user.accessLevels = this.getUserAccessLevelsFromNodes( accessNodes );

                this.mergeUser( user, allUsers );
            }

            this.mapOfHierarchyIdAndNode[ hierarchyId ] = currentNode;
            this.nodes.push( currentNode );

            lastNode = currentNode;
        }

        this.isProcessed = true;
    }

    findUser( targetUser, users ) {

        return users.find( userInStorage => userInStorage.accountId === targetUser.accountId );
    }

    mergeUser( targetUser, users ) {

        let userInStorage = this.findUser( targetUser, users );

        if ( userInStorage === undefined ) {

            users.push( targetUser );
        }
        else {

            for ( let eachLevel of targetUser.accessLevels ) {

                if ( util.findIndexFromArrayOfArray( eachLevel, userInStorage.accessLevels ) === -1 ) {

                    userInStorage.accessLevels.push( eachLevel );
                }
            }
        }
    }

    getUserAccessNodes( user ) {

        let currentNode = user.currentNode;
        let accessNodes = [ currentNode ];

        let nodeWalkingAt = currentNode.parent;

        while ( nodeWalkingAt !== null ) {

            accessNodes.unshift( nodeWalkingAt );
            nodeWalkingAt = nodeWalkingAt.parent;
        }

        return accessNodes;
    }

    getUserAccessLevelsFromNodes( nodes ) {

        let eachAccessLevel = [];

        for ( let eachNode of nodes ) {

            eachAccessLevel.push( eachNode.description );
        }

        return [ eachAccessLevel ];
    }

    getUserAccessLevels( user ) {

        let currentNode = user.currentNode;
        let accessLevels = [ [ currentNode.description ] ];

        let nodeWalkingAt = currentNode.parent;

        while ( nodeWalkingAt !== null ) {

            accessLevels[ 0 ].unshift( nodeWalkingAt.description );
            nodeWalkingAt = nodeWalkingAt.parent;
        }

        return accessLevels;
    }

    getUsersByHierarchyId( hierarchyId ) {

        if ( this.isProcessed === false ) {

            this.process();
        }

        let users = [];
        let node = this.mapOfHierarchyIdAndNode[ hierarchyId ];

        return this.getUsersFromNodeAndChildren( node );

    }

    getUsersFromNodeAndChildren( node ) {

        let usersFound = node.users.slice();

        for ( let eachChildNode of node.children ) {

            let users = this.getUsersFromNodeAndChildren( eachChildNode );

            for ( let eachUser of users ) {

                this.mergeUser( eachUser, usersFound );
            }
        }

        return usersFound;
    }

    getAllUsers() {

        if ( this.isProcessed === false ) {

            this.process();
        }

        return this.getUsersFromNodeAndChildren( this.nodes[0] );
    }

    deleteUser( accountId, hierarchyIds ) {


    }
}


module.exports = {

    HierarchyStorage,
};