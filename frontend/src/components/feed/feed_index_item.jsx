import React from 'react';
import { Link } from 'react-router-dom';

const FeedIndexItem = (props) => {

    const { feedPlaylist } = props;

    const date = new Date(feedPlaylist.creation_date);

    let timeAgo = Date.now() - Date.parse(date);
    // console.log(timeAgo);

    let realTime; 

    if (timeAgo < 60000) {
        realTime = '<1m'; 
    } else if (timeAgo < 3600000) {
        realTime = Math.floor(timeAgo / 60000) + 'm ago';
    } else if (timeAgo < 86400000) {
        realTime = Math.floor(timeAgo / 3600000) + 'h ago';
    }else if (timeAgo < 31536000000) {
        realTime = Math.floor(timeAgo / 86400000) + 'd ago';
    } else {
        realTime = Math.floor(timeAgo / 31536000000) +'y ago';
    }

    // console.log(realTime);

    return (
        <li className="feed-index-item">
            <p>
                Created by&nbsp;
                <Link to={`/users/${feedPlaylist.creator_name}`}>{feedPlaylist.creator_name}</Link>
                {/* &nbsp; on {date.toLocaleDateString()} at {date.toLocaleTimeString()} */}
                {/* &nbsp; {realTime} */}
            </p>
            <iframe
                src={feedPlaylist.spotify_embed_link}
                width="500"
                height="680"
                frameBorder="0"
                allowtransparency="true"
                allow="encrypted-media"
            ></iframe>
            <p>{realTime}</p>
        </li>
    )
};

export default FeedIndexItem;