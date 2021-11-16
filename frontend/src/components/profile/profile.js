import React from 'react';
import PlaylistIndex from './playlist_index';
import UserDetailsBox from './user_details_box';

class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        if (this.props.homeProfile) {
            this.props.fetchUser(this.props.currentUser.username);
        } else {
            this.props.fetchUser(this.props.match.params.username);
        }
    }

    componentDidUpdate() {
        if (!this.props.user) {
            if (this.props.homeProfile) {
                this.props.fetchUser(this.props.currentUser.username);
            } else {
                this.props.fetchUser(this.props.match.params.username);
            }
        }
    }
    
    render() {

        const {
            currentUser,
            user,
            playlists,
            followUser,
            unfollowUser,
            followers,
            following } = this.props;

        if (!user) return (<div className="placeholder"></div>)

        return (
            <div className="user-profile">
                <PlaylistIndex
                    currentUser={currentUser}
                    following={following}
                    playlists={playlists}
                    user={user}
                />
                <UserDetailsBox
                    {...this.props}
                />
            </div>
        );
    }
}

export default Profile;