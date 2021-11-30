import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphonesAlt } from '@fortawesome/free-solid-svg-icons';


const FollowIndexItem = ({ follow }) => {
    return (
        <li className='follow-index-item'>
            <Link to={`/users/${follow.username}`}>
                <FontAwesomeIcon className="user-photo" icon={faHeadphonesAlt} />
                <p>{follow.username}</p>
            </Link>
        </li>
    )
};

export default FollowIndexItem;