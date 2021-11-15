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
                <b>{this.props.currentUser.username}'s</b> Profile
            </div>
        );
    }
}

export default Profile;