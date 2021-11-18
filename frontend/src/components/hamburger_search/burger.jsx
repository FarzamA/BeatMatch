import React from 'react';
import BurgerLinks from './burger_links';
import ReactDOM from 'react-dom';

class Burger extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            burgerClicked: false
        }

        this.handleOutsideBurger = this.handleOutsideBurger.bind(this);
        this.transformBurger = this.transformBurger.bind(this);
    }

    componentDidMount() {
        document.addEventListener('click', this.handleOutsideBurger)
    }
    
    componentWillUnmount() {
        document.removeEventListener('click', this.handleOutsideBurger);
    }

    handleOutsideBurger(e) {
        const domNode = ReactDOM.findDOMNode(this);

        if (!domNode || !domNode.contains(e.target)) {
            this.setState({burgerClicked: false});
        }
    }

    transformBurger() {
        this.setState({burgerClicked: !this.state.burgerClicked});
    }

    render() {

        const { loggedIn, logout } = this.props;
    
        let burgerClicked;
        if (this.state.burgerClicked) {
            burgerClicked = "clicked"
        }

        return (
            <div>
                <div className="hamburger" onClick={this.transformBurger}>
                    <div className={`burger-bar1 ${burgerClicked}`}></div>
                    <div className={`burger-bar2 ${burgerClicked}`}></div>
                    <div className={`burger-bar3 ${burgerClicked}`}></div>
                </div>
                <BurgerLinks
                    loggedIn={loggedIn}
                    logout={logout}
                    burgerClicked={burgerClicked}
                />
            </div>
        )

    }


}

export default Burger;