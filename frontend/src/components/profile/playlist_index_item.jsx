import React from 'react';
import { NavLink } from "react-router-dom";

const PlaylistIndexItem = (props) => {

    const { playlist } = props;

    return (
        <li className="playlist-index-item">
            <NavLink
                to={`/playlists/${playlist.id}`}
            >
                <p>PLACEHOLDER FOR PLAYLIST PREVIEW IMAGES</p>
                <p>{playlist.title}</p>
            </NavLink>
        </li>
    )



};

export default PlaylistIndexItem;