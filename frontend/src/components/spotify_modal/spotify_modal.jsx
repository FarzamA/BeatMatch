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
    const modal = document.querySelector('.spotify-modal');
    const modalBg = document.querySelector('.modal-bg');
    const domNode = ReactDOM.findDOMNode(modal);
    console.log(e.target);
    if (e.target === modalBg) {
      modalBg.style.display = 'none';
      this.setState({ spotifyModalClicked: false });
    }
  }

  transformSpotifyModal() {
    if (this.state.spotifyModalClicked) {
      document.querySelector('.modal-bg').style.display = 'none';
      this.setState({ spotifyModalClicked: false });
    } else {
      document.querySelector('.modal-bg').style.display = 'block';
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
        <div className='modal-bg'>
          <div className={`spotify-modal ${spotifyModalClicked}`}>
            <FontAwesomeIcon icon={faSpotify} />
            <div className="spotify-modal-text">
              Hello! Spotify is currently in the process of reviewing Beat Match. As soon as
              the review finishes, you'll be able to export playlists directly from Beat Match
              to your Spotify profile. We are very excited and expect this feature
              to be available in the next few weeks. Thank you for your patience.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SpotifyModal;
