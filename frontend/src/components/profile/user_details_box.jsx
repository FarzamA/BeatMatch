import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphonesAlt } from '@fortawesome/free-solid-svg-icons';

class UserDetailsBox extends React.Component {

    constructor(props) {
        super(props);

        this.processFollow = this.processFollow.bind(this);
    }


    processFollow() {

        
        const { user,
            currentUser,
            followUser,
            unfollowUser,
            followers } = this.props;
            
        const followData = {
            user_id: currentUser.id,
            username: currentUser.username
        }

        console.log(followData);
        console.log(followers.find(user => user.username === currentUser.username))

        if (followers.find(user => user.username === currentUser.username)) {
            unfollowUser(user.username, followData);
        } else {
            followUser(user.username, followData);
        }
    }

    render () {

        const { user,
                currentUser,
                followers,
                following } = this.props;
        
        console.log(followers);
    
        let profilePhoto;
        // this shows either a user photo or a pair of headphones
        if (user.photoUrl) {
            profilePhoto = (<img className="user-photo" src={user.photoUrl} />);
        } else {
            profilePhoto = (<FontAwesomeIcon className="user-photo" icon={faHeadphonesAlt} />);
        }

        let followButton;
        if (followers.find(user => user.username === currentUser.username)) {
            followButton = (<button onClick={this.processFollow}>Unfollow</button>)
        } else if (user.username !== currentUser.username) {
            followButton = (<button onClick={this.processFollow}>Follow</button>)
        }

        const followersText = followers.length === 1 ? "Follower" : "Followers";

        return (
            
            <div className="user-details-box">
                <div className="user-profile-photo-box">
                    {profilePhoto}
                    {user.username}
                    <div className="followers-options">
                        {/* text should change depending on whether you're following */}
                        {followButton}
                        {/* should pluralize */}
                        <p>{followers.length} {followersText}</p>
                        <p>{following.length} Followed</p>
                    </div>
                </div>
                <ul className="user-details-ul">
                    <li className="user-detail-item"></li>
                    <li className="user-detail-item"></li>
                    <li className="user-detail-item"></li>
                    <li className="user-detail-item"></li>
                </ul>
            </div>
        )

    }

};

export default UserDetailsBox;