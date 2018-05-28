import React from 'react';
import ReactDOM from 'react-dom';
import { SearchUsers } from '../../components/search-users/search-users.js';
import { HierarchyStorage } from '../../components/core/hierarchy-storage.js';
import { appManager } from '../core/app-manager.js';

class SearchUsersApp { 

    constructor( { id, sapData, domElement } ) {

        this.sapData = sapData;
        this.domElement = domElement;
        this.hierarchyStorage = new HierarchyStorage( sapData );
        this.searchUsersReactElement = <SearchUsers storage={ this.hierarchyStorage } onDeleteUser={ this.deleteUser } />;
        this.searchUsersReactComponent = null;

        if ( typeof id === 'string' ) {

            appManager.addApp( id, this );
        }
    }

    deleteUser( user ) {

        let httpStatusCode = 200;
        let httpStatusCodeLiteral = httpStatusCode.toString();

        // Mock
        let promise = new Promise( ( resolve, reject ) => {

            if ( httpStatusCodeLiteral === '200' ) {

                setTimeout( () => resolve( user ), 2000 );
            }
            else { 

                setTimeout( () => { 

                    reject( new Error( httpStatusCodeLiteral ) );

                }, 2000 );
            }

        } );

        return promise;
    }

    reload( sapData ) {

        this.hierarchyStorage = new HierarchyStorage( sapData );
        this.searchUsersReactElement = <SearchUsers storage={ this.hierarchyStorage } onDeleteUser={ this.deleteUser } />;
        this.unload();
        this.load();
    }

    load() {

        this.searchUsersReactComponent = ReactDOM.render( this.searchUsersReactElement, this.domElement );
        this.searchUsersReactComponent.showAllUsers();
    }

    unload() {

        this.searchUsersReactComponent = null;
        return ReactDOM.unmountComponentAtNode( this.domElement );
    }

    /* 
     * @param user object {
     *
     *      hierarchyId: '"00215A9C-537A-1ED8-91D7-9D2EA1B25283"
     *      firstName: "Tom",
     *      lastName: "Lu"
     *      emailAddress: "tom.lu@tom.lu"
     * }
     *
     */
    addUser( user ) {

        this.hierarchyStorage.addUser( user );
        this.searchUsersReactComponent.showAllUsers();
    }
}

export {

    SearchUsersApp
};