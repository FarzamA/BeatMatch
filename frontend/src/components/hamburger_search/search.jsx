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
        }
    }

    transformSearch() {
        this.setState({searchClicked: !this.state.searchClicked}, this.focusSearch);
    }

    closeSearch() {
        this.setState({searchClicked: false});
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