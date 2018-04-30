const React = require( 'react' );
const util = require( '../core/util.js' );
const SearchBox = require( '../search-box/search-box.js' ).SearchBox;
const UserList = require( '../user-list/user-list.js' ).UserList;
const componentManager = require( '../core/component-manager.js' ).componentManager;

class SearchUsers extends React.Component {

    constructor( props ) {

        super( props );

        this.handleSearchBoxItemSelect = this.handleSearchBoxItemSelect.bind( this );

        this.state = {

            storage: null,
            usersFound: [],
            shouldRenderUserList: false,
        };

        this.id = util.setDefault( props.id, util.generateRandomString() );
        componentManager.addComponent( this.id, this );
    }

    static getDerivedStateFromProps( nextProps, prevState ) {

        let storage = nextProps.storage;

        if ( storage === undefined ) {

            throw new Error( '[MSP] SearchUsers component must have a HierarchyStorage instance as property.' );
        }

        storage.process();

        return {

            storage: storage
        };
    }

    handleSearchBoxItemSelect( item, searchBox ) {

        let account = item.__origin__;
        let users = this.state.storage.getUsersByHierarchyId( account.hierarchyId );

        if ( account.type === 'person' ) {

            users = [ account ];
        }

        this.setState( { 

            usersFound: users,
            shouldRenderUserList: true

        } );
    }

    renderSearchBox() {

        return (

            <SearchBox
                id="search-box"
                items={ this.state.storage.accounts }
                fields={ [ 'fullName' ] }
                strikes={ 3 }
                onSelect={ this.handleSearchBoxItemSelect }
                onIconClick={ self => self.clearSearch() }
            />
        );
    }

    renderUserList() {

        if( this.state.shouldRenderUserList === false ) {

            return;
        }

        return (

            <UserList
                id="user-list"
                users={ this.state.usersFound }
                onRenderCount={ count => `${count} users found.` }
                sortByFields={ [ 'firstName', 'lastName' ] }
            />
        );
    }

    render() {

        return (

            <div id="search-users-section">
                { this.renderSearchBox() }
                { this.renderUserList() }
            </div>
        );
    }
}

module.exports = {

    SearchUsers
};