import React from 'react';

class Profile extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentWillMount() {
        console.log(this.props.currentUser);
    }
    
    render() {
        return (
            <div>
                <b>Email:</b> {this.props.currentUser.email}
            </div>
        );
    }
}

export default Profile;