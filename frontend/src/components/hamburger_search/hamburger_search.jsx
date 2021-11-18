import React from 'react';
import BurgerContainer from './burger_container';
import SearchContainer from './search_container';

const HamburgerSearch = () => {

    return (
        <div className="hamburger-search-container">
                <SearchContainer/>
                <BurgerContainer/>
        </div>
    )

};

export default HamburgerSearch;