import React from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";

class SpotifyModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spotifyModalClicked: false,
    };
    this.handleOutsideSpotifyModal = this.handleOutsideSpotifyModal.bind(this);
    this.transformSpotifyModal = this.transformSpotifyModal.bind(this);
  }

  componentDidMount() {
    document.addEventListener("click", this.handleOutsideSpotifyModal);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleOutsideSpotifyModal);
  }

  handleOutsideSpotifyModal(e) {
    const domNode = ReactDOM.findDOMNode(this);

    if (!domNode || !domNode.contains(e.target)) {
      this.setState({ spotifyModalClicked: false });
    }
  }

  transformSpotifyModal() {
    if (this.state.spotifyModalClicked) {
      this.setState({ spotifyModalClicked: false });
    } else {
      this.setState({ spotifyModalClicked: true });
    }
  }

  render() {
    let spotifyModalClicked = "";

    if (this.state.spotifyModalClicked) {
      spotifyModalClicked = "clicked";
    }

    return (
      <div className="spotify-export-container">
        <div className="spotify-export" onClick={this.transformSpotifyModal}>
          Export to Spotify
        </div>
        <div className={`spotify-modal ${spotifyModalClicked}`}>
          <FontAwesomeIcon icon={faSpotify} />
          <div className="spotify-modal-text">
            Hello! Spotify is currently reviewing BeatMatch in order to allow
            its users to export playlists created by Beatmatch. We are very
            excited and expect the feature to be available in the next couple of
            weeks. Thank you for your patience.
          </div>
        </div>
      </div>
    );
  }
}

export default SpotifyModal;
