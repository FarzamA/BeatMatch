import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadPhonesAlt } from '@fortawesome/free-solid-svg-icons';

const UserDetailsBox = (props) => {

    const { currentUser, user, followUser, unfollowUser } = props;

    let profilePhoto;
    // this shows either a user photo or a pair of headphones
    if (user.photoUrl) {
        profilePhoto = (<img className="user-photo" src={user.photoUrl} />);
    } else {
        profilePhoto = (<FontAwesomeIcon className="user-photo" icon={faHeadPhonesAlt} />);
    }

    let followButton;
    if (user.followers.find(user => user.id === currentUser.id)) {
        followButton = (<button onClick={unfollowUser}>Unfollow</button>)
    } else {
        followButton = (<button onClick={followUser}>Follow</button>)
    }

    const followersText = user.followers.length === 1 ? "Follower" : "Followers";

    return (
        <div className="user-details-box">
            <div className="user-profile-photo-box">
                {profilePhoto}
                <div className="followers-options">
                    {/* text should change depending on whether you're following */}
                    {followButton}
                    {/* should pluralize */}
                    <p>{user.followers.length} {followersText}</p>
                    <p>{user.followed.length} Followed</p>
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

};

export default UserDetailsBox;