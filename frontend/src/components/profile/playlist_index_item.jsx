import React from "react";
import { NavLink } from "react-router-dom";

const PlaylistIndexItem = (props) => {
  const { playlist } = props;

  return (
    <li className="playlist-index-item">
      <NavLink to={`/playlists/${playlist.id}`}>
        <iframe
          src={playlist.spotify_embed_link}
          width="300"
          height="380"
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media"
        ></iframe>
      </NavLink>
    </li>
  );
};

export default PlaylistIndexItem;
