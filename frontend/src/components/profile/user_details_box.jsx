import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphonesAlt } from '@fortawesome/free-solid-svg-icons';
import { FacebookShareButton,TwitterShareButton,LinkedinShareButton } from "react-share";
import { faFacebook,faTwitter,faLinkedin } from "@fortawesome/free-brands-svg-icons";

class UserDetailsBox extends React.Component {

    constructor(props) {
        super(props);

        this.processFollow = this.processFollow.bind(this);
    }

    componentDidMount() {
        const { user, currentUser } = this.props;

        if (!user) this.props.fetchUser(currentUser.username);
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

        if (!user) return (<div className="placeholder"></div>)
        
        let profilePhoto;
        // this shows either a user photo or a pair of headphones
        if (user.profilePicUrl) {
            profilePhoto = (<img className="user-photo" src={user.profilePicUrl} />);
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
                    <p className="header">{user.username}</p>
                    <div className="followers-options">
                        {/* text should change depending on whether you're following */}
                        {/* should pluralize */}
                        <p>{followers.length} {followersText}</p>
                        <p>{following.length} Following</p>
                    </div>
                    {followButton}
                    <div className="share-buttons">
                        <FacebookShareButton url={`https://beat-match-mern.herokuapp.com/users/${user.username}`} quote={`Checkout ${user.username}'s playlists on BeatMatch!`}>
                            <FontAwesomeIcon icon={faFacebook}/>
                        </FacebookShareButton>
                        <TwitterShareButton url={`https://beat-match-mern.herokuapp.com/users/${user.username}\n\n`} hashtags={["Spotify","Music"]} title={` Checkout ${user.username}'s playlists on BeatMatch!\n\n`}>
                            <FontAwesomeIcon icon={faTwitter}/>
                        </TwitterShareButton>
                        <LinkedinShareButton url={`https://beat-match-mern.herokuapp.com/users/${user.username}`} summary={`Checkout ${user.username}'s playlists on BeatMatch!`}>
                            <FontAwesomeIcon icon={faLinkedin}/>
                        </LinkedinShareButton>
                    </div>
                </div>
                {/* <ul className="user-details-ul">
                    <li className="user-detail-item"></li>
                    <li className="user-detail-item"></li>
                    <li className="user-detail-item"></li>
                    <li className="user-detail-item"></li>
                </ul> */}
            </div>
        )

    }

};

export default UserDetailsBox;