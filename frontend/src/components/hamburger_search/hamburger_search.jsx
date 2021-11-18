import React from 'react';
import BurgerContainer from './burger_container';
import Search from './search';

const HamburgerSearch = () => {

    return (
        <div className="hamburger-search-container">
            <Search/>
            <BurgerContainer/>
        </div>
    )

};

export default HamburgerSearch;