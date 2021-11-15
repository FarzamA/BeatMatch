import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadPhonesAlt } from '@fortawesome/free-solid-svg-icons';

const UserDetailsBox = (props) => {

    const { user, followUser } = props;

    let profilePhoto;
    // this shows either a user photo or a pair of headphones
    if (user.photoUrl) {
        profilePhoto = (<img className="user-photo" src={user.photoUrl} />);
    } else {
        profilePhoto = (<FontAwesomeIcon className="user-photo" icon={faHeadPhonesAlt} />);
    }

    return (
        <div className="user-details-box">
            <div className="user-profile-photo-box">
                {profilePhoto}
                <button onClick={followUser}>Follow</button>
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