import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

class SearchBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            query: "",
            resultsReceived: false
        };

        this.bindFuncs();
    }

    bindFuncs() {
        this.handleChange = this.handleChange.bind(this);
        this.search = this.search.bind(this);
    }

    search() {
        if (this.state.query !== "") {
            this.props.fetchSearchResults(this.state.query)
                .then(() => this.setState({resultsReceived: true}));
        } else {
            this.props.clearSearchResults();
            this.setState({resultsReceived: false});
        }
    }


    handleChange(e) {
        this.setState({query: e.currentTarget.value}, this.search);
    }

    render() {

        const { results } = this.props;

        let resultsDisplay;
        if (this.state.resultsReceived) {

            if (results.length > 0) {

                resultsDisplay = (
                    <ul>
                        {results.map(result => (
                            <li><Link to={`/users/${result}`}>{result}</Link></li>
                        ))}
                    </ul>
                )
            } else {
                resultsDisplay = (<ul><li>No results found</li></ul>)
            }

        }

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
                {resultsDisplay}
            </div>
        )

    }


};

export default SearchBar;