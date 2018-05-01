/* Manages all UI apps and exposed to browsers' window object
 * 
 */

class AppManager {

    constructor() {

        this.apps = {};
    }

    addApp( id, app ) {

        this.apps[ id ] = app;
    }

    getAppById( id ) {

        let app = this.apps[ id ];

        if ( app !== undefined ) {

            return app;
        }

        return null;
    }

    get() {

        return this.getAppById.apply( this, arguments );
    }

    add() {

        return this.addApp.apply( this, arguments );
    }
}

let appManager = new AppManager();

if ( Window && window instanceof Window === true ) {

    window.aman = appManager;
}

module.exports = {

    appManager
};
