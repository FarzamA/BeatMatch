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
            this.setState({burgerClicked: false}, this.props.deactivateBurgerModal);
        }
    }

    transformBurger() {
        if (this.state.burgerClicked) {
            this.setState({burgerClicked: false}, this.props.deactivateBurgerModal)
        } else {
            this.setState({burgerClicked: true}, this.props.activateBurgerModal)
        }
    }

    render() {

        const { loggedIn, logout, loginDemo, deactivateBurgerModal } = this.props;
        let burgerClicked;
        if (this.state.burgerClicked) {
            burgerClicked = "clicked"
        }

        return (
            <div className="hamburger-container">
                <div className="hamburger" onClick={this.transformBurger}>
                    <div className={`burger-bar1 burger ${burgerClicked}`}></div>
                    <div className={`burger-bar2 burger ${burgerClicked}`}></div>
                    <div className={`burger-bar3 burger ${burgerClicked}`}></div>
                </div>
                <BurgerLinks
                    loggedIn={loggedIn}
                    logout={logout}
                    loginDemo={loginDemo}
                    burgerClicked={burgerClicked}
                    transformBurger={this.transformBurger}
                />
            </div>
        )

    }


}

export default Burger;
