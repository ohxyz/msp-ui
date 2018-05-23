const util = require( '../../helpers/util.js' );

class User {

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
            isAdmin: false, // isAdmin is undefined when instantiated, figure it out! Busheng
            accessLevels: [ [] ],
            currentNode: null,
            currentNodeDescription: '',
            parentNode: null,
            parentNodeDescription: '',
            topNode: null,
            topNodeDescription: ''
        };

        Object.assign( this, obj );

        if ( arg === undefined ) {

            // Do nothing, just let it pass
        }
        else if ( util.isObject( arg ) === true || arg instanceof User === true ) {

            for ( let prop in obj ) {

                if ( arg.hasOwnProperty( prop ) === true ) {

                    this[ prop ] = arg[ prop ];
                }
            }
        }
        else {

            throw new Error( "[MSP] User's argument in constructor should be undefined, an plain object or User itself." );
        }

        this.name = ( this.firstName.trim() + ' ' + this.lastName.trim() ).trim();

        // Following properties are deprecated, will be removed after UserStrip is refactored.
        this.fullName = this.name;
    }
}

module.exports = {

    User
};