import React from 'react';
import FeedIndexContainer from './feed_index_container';
import UserDetailsBoxContainer from './feed_user_details_box_container'

const FeedPage = (props) => {


    return (
        <div className="feed-page-container">
            <FeedIndexContainer/>
            <UserDetailsBoxContainer/>
        </div>
    )
};

export default FeedPage;