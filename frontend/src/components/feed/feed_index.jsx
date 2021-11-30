import React from "react";

import FeedIndexItem from './feed_index_item';

class FeedIndex extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            offset: 0
        };
    }

    componentDidMount() {
        let username = this.props.currentUser.username;
        let offset = this.state.offset;

        this.props.fetchFeedPlaylists(username, offset);
    }

    render() {

        const { feedPlaylists } = this.props;

        if (!feedPlaylists) return (<div className="placeholder"></div>);

        return (
            <div className="feed-index-container">
                <ul className="feed-index">
                    {feedPlaylists.map((feedPlaylist, idx) => 
                        <FeedIndexItem key={idx} feedPlaylist={feedPlaylist} />
                    )}
                </ul>
            </div>
        )
    }
}

export default FeedIndex;