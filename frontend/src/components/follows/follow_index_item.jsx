import React from 'react';
import { Link } from 'react-router-dom';

const FollowIndexItem = ({ follow }) => {
    return (
        <li className='follow-index-item'>
            <Link to={`/users/${follow.username}`}>{follow.username}</Link>
        </li>
    )
};

export default FollowIndexItem;