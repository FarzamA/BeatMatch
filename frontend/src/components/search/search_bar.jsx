import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

class SearchBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            query: ""
        };

        this.bindFuncs();
    }

    bindFuncs() {
        this.handleChange = this.handleChange.bind(this);
        this.search = this.search.bind(this);
    }

    search() {
        if (this.state.query !== "") {
            this.props.fetchSearchResults(this.state.query);
        }
    }


    handleChange(e) {
        this.setState({query: e.currentTarget.value});
        this.search();
    }

    render() {



        return (
            <div className="searchbar-container">
                <form className="searchbar">
                    <input
                        type="text"
                        placeholder="Find users..."
                        onChange={this.handleChange}
                        value={this.state.query}
                    />
                    <FontAwesomeIcon icon={faSearch}/>
                </form>
            </div>
        )

    }


};

export default SearchBar;