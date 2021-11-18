import React from 'react';
import ReactDOM from 'react-dom';
import SearchBarContainer from './search_bar_container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

class Search extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            searchClicked: false
        }

        this.handleOutsideSearch = this.handleOutsideSearch.bind(this);
        this.transformSearch = this.transformSearch.bind(this);
        this.closeSearch = this.closeSearch.bind(this);
        this.activateSearch = this.activateSearch.bind(this);
    }

    componentDidMount() {
        document.addEventListener('click', this.handleOutsideSearch)
    }
    
    componentWillUnmount() {
        document.removeEventListener('click', this.handleOutsideSearch);
    }

    handleOutsideSearch(e) {
        const domNode = ReactDOM.findDOMNode(this);

        if (!domNode || !domNode.contains(e.target)) {
            this.closeSearch();
            this.props.deactivateSearchModal();
        }
    }

    transformSearch() {
        if (this.state.searchClicked) {
            console.log("search:transformsearch")
            this.setState({searchClicked: false}, this.props.deactivateSearchModal)
        } else {
            this.setState({searchClicked: true}, this.activateSearch)
        }
    }

    activateSearch() {
        this.focusSearch();
        this.props.activateSearchModal();
    }

    closeSearch() {
        this.setState({searchClicked: false}, this.props.deactivateSearchModal);
    }

    focusSearch() {
        const search = document.getElementById("user-search");
        search.focus();
    }

    render() {

        let searchClicked;
        if (this.state.searchClicked) {
            searchClicked = "clicked"
        }

        return (
            <div className="toplevel-search-container">
                <div onClick={this.transformSearch}>
                    <FontAwesomeIcon className={`search-icon ${searchClicked}`} icon={faSearch}/>
                </div>
                <SearchBarContainer
                    searchClicked={searchClicked}
                    clearSearch={this.clearSearch}
                    closeSearch={this.closeSearch}
                />
            </div>
        )

    }


}

export default Search;