import React from 'react';

const FeedIndexItem = (props) => {

    const { feedPlaylist } = props;

    return (
        <li className="feed-index-item">
            <iframe
                src={feedPlaylist.spotify_embed_link}
                width="400"
                height="380"
                frameBorder="0"
                allowtransparency="true"
                allow="encrypted-media"
            ></iframe>
        </li>
    )
};

export default FeedIndexItem;