import React from 'react';
import { Link } from 'react-router-dom';

const FeedIndexItem = (props) => {

    const { feedPlaylist } = props;

    const date = new Date(feedPlaylist.creation_date);

    return (
        <li className="feed-index-item">
            <p>
                created by &nbsp;
                <Link to={`/users/${feedPlaylist.creator_name}`}>{feedPlaylist.creator_name}</Link>
                &nbsp; on {date.toLocaleDateString()} at {date.toLocaleTimeString()}
            </p>
            <iframe
                src={feedPlaylist.spotify_embed_link}
                width="500"
                height="680"
                frameBorder="0"
                allowtransparency="true"
                allow="encrypted-media"
            ></iframe>
        </li>
    )
};

export default FeedIndexItem;