import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

class SearchBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            query: "",
            resultsReceived: false
        };
        
        this.liCount = 0;
        
        this.ulRef = React.createRef()
        this.bindFuncs();
    }

    componentDidUpdate() {
        if (!this.props.searchClicked && this.state.query !== "") {
            this.setState({query: "", resultsReceived: false});
        }
    }

    bindFuncs() {
        this.handleChange = this.handleChange.bind(this);
        this.search = this.search.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.generateResults = this.generateResults.bind(this);
    }

    search() {
        if (this.state.query !== "") {
            this.props.fetchSearchResults(this.state.query)
                .then(() => this.setState({resultsReceived: true}));
        } else {
            this.props.clearSearchResults();
            this.setState({resultsReceived: false})
        }
    }

    handleChange(e) {
        this.setState({query: e.currentTarget.value}, this.search);
    }

    handleKeyDown(e) {
        console.log(e.key);
        let next;
        if (e.key === "ArrowDown") {
            if (e.target.id === "user-search") {
                if (this.liCount > 0) {
                    next = document.getElementById("results-1");
                    next.focus();
                }
            } else {
                // dirty way of turning "results-1" into 2
                next = parseInt(e.target.id.slice(8)) + 1;
                if (this.liCount >= next) {
                    next = document.getElementById(`results-${next}`);
                } else {
                    next = document.getElementById("results-1");
                }
                next.focus();
            }
        } else if (e.key === "ArrowUp") {
            if (e.target.id === "user-search") {
                if (this.liCount > 0) {
                    next = document.getElementById(`results-${this.liCount}`);
                    next.focus();
                }
            } else {
                next = parseInt(e.target.id.slice(8)) - 1;
                if (next > 0) {
                    next = document.getElementById(`results-${next}`);
                } else {
                    // next = document.getElementById(`results-${this.liCount}`);
                    next = document.getElementById("user-search");
                }
                next.focus();
            }
        } else if (e.key === "Escape") {
            this.props.closeSearch();
        }
    }

    generateResults() {

        const { results } = this.props; 

        let resultsDisplay;
        let liCount = 0;
        
        if (this.state.resultsReceived) {

            if (results.length > 0) {

                resultsDisplay = (
                    <ul className="search-results">
                        {results.map((result, i) => {
                            liCount += 1;
                                return (
                                    <Link onKeyDown={this.handleKeyDown} id={`results-${liCount}`} key={`results-${liCount}`} to={`/users/${result}`}>
                                        <li>
                                            <FontAwesomeIcon icon={faUserAlt}/>
                                            {result}
                                        </li>
                                    </Link>
                                )                            
                            }
                        )}
                    </ul>
                )
            } else {
                resultsDisplay = (
                    <ul className="search-results">
                        <li>No results found</li>
                    </ul>
                )
            }

        }
        this.liCount = liCount;
        return resultsDisplay;
    }

    render() {

        const { results, searchClicked } = this.props;

        // let resultsDisplay;
        // if (this.state.resultsReceived) {

        //     if (results.length > 0) {

        //         resultsDisplay = (
        //             <ul className="search-results">
        //                 {results.map((result, i) => {
        //                     if (i === 0) {
        //                         return (
        //                             <Link ref={this.ulRef} to={`/users/${result}`}>
        //                                 <li>
        //                                     <FontAwesomeIcon icon={faUserAlt}/>
        //                                     {result}
        //                                 </li>
        //                             </Link>
        //                         )                            
        //                     } else {
        //                         return (
        //                             <Link to={`/users/${result}`}>
        //                                 <li>
        //                                     <FontAwesomeIcon icon={faUserAlt}/>
        //                                     {result}
        //                                 </li>
        //                             </Link>
        //                         )
        //                     }
        //                 })}
        //             </ul>
        //         )
        //     } else {
        //         resultsDisplay = (
        //             <ul className="search-results">
        //                 <li>No results found</li>
        //             </ul>
        //         )
        //     }

        // }

        return (
            <div className={`searchbar-container ${searchClicked}`}>
                <form id="user-search-form" className="searchbar">
                    <input
                        type="text"
                        key="user-search"
                        placeholder="Search Users"
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeyDown}
                        value={this.state.query}
                        id="user-search"
                    />
                    {/* <FontAwesomeIcon onClick={this.props.transformSearch} icon={faSearch}/> */}
                </form>
                {this.generateResults()}
            </div>
        )

    }


};

export default SearchBar;