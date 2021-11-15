import React from 'react';
import PlaylistIndex from './playlist_index';
import UserDetailsBox from './user_details_box';

class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.fetchUser(this.props.match.params.userId);
    }

    componentDidUpdate() {
        if (!this.props.user) {
            this.props.fetchUser(this.props.match.params.userId);
        }
    }
    
    render() {

        const { currentUser, user, playlists, followUser, unfollowUser } = this.props;

        if (!user) return (<div className="placeholder"></div>)

        return (
            <div className="user-profile">
                <PlaylistIndex
                    currentUser={currentUser}
                    playlists={playlists}
                    user={user}
                />
                <UserDetailsBox
                    currentUser={currentUser}
                    followUser={followUser}
                    unfollowUser={unfollowUser}
                    user={user}
                />
            </div>
        );
    }
}

export default Profile;