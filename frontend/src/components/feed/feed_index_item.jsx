import React from 'react';

const FeedIndexItem = (props) => {

    const { feedPlaylist } = props;

    const date = new Date(feedPlaylist.creation_date);

    return (
        <li className="feed-index-item">
            <p>{feedPlaylist.creator_name} created this playlist on {date.toLocaleDateString()} at {date.toLocaleTimeString()}</p>
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