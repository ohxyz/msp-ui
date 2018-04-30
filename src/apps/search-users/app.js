const React = require( 'react' );
const ReactDOM = require( 'react-dom' );
const SearchUsers = require( '../../components/search-users/search-users.js' ).SearchUsers;
const HierarchyStorage = require( '../../components/core/hierarchy-storage.js' ).HierarchyStorage;

class SearchUsersApp { 

    constructor( { sapData, domElement } ) {

        this.sapData = sapData;
        this.domElement = domElement;
        this.hierarchyStorage = new HierarchyStorage( sapData );
        this.searchUsersComponent = <SearchUsers storage={ this.hierarchyStorage } />;
    }

    reload( sapData ) {

        this.hierarchyStorage = new HierarchyStorage( sapData );
        this.searchUsersComponent = <SearchUsers storage={ this.hierarchyStorage } />;
        this.unload();
        this.load();
    }

    load() {

        ReactDOM.render( this.searchUsersComponent, this.domElement );
    }

    unload() {

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
    }
}

module.exports = {

    SearchUsersApp
};