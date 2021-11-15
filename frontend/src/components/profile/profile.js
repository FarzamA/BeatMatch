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

        const { user, playlists, followUser } = this.props;

        return (
            <div className="user-profile">
                <PlaylistIndex
                    playlists={playlists}
                    user={user}
                />
                <UserDetailsBox
                    followUser={followUser}
                    user={user}
                />
            </div>
        );
    }
}

export default Profile;