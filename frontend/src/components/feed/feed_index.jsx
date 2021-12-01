import React from "react";

import FeedIndexItem from './feed_index_item';

class FeedIndex extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            offset: 0,
            didSearch: false,
            morePosts: true
        };

        this.observer = React.createRef();

        this.lastPlaylistRef = node => {
            this.observer.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting && this.state.morePosts) {
                    props.fetchAddlFeedPlaylists(props.currentUser.username, this.state.offset + 5)
                    .then((res) => {
                        if (res.playlists.length < 5) {
                            this.setState({morePosts: false})
                        }
                    });
                    this.incrementOffset();
                }
            });

            console.log(node);
            if (node) this.observer.current.observe(node);
        }

        this.bindFuncs();
    }

    bindFuncs() {
        this.incrementOffset = this.incrementOffset.bind(this);
    }

    componentDidMount() {
        let username = this.props.currentUser.username;
        let offset = this.state.offset;

        this.props.fetchInitialFeedPlaylists(username, offset)
            .then(this.setState({didSearch: true}));
    }

    incrementOffset() {
        this.setState({ offset: (this.state.offset + 5) });
    }

    render() {

        const { feedPlaylists } = this.props;

        if (!feedPlaylists) return (<div className="placeholder"></div>);

        let endMessage;
        if (this.state.didSearch && feedPlaylists.length === 0) {
            endMessage = (
                <div className="end-message"><p>Your feed is empty! Try following more people.</p></div>
            )
        } else if (!this.state.morePosts) {
            endMessage = (
                <div className="end-message"><p>You've reached the end of your feed!</p></div>
            )
        }

        return (
            <ul className="feed-index">
                {feedPlaylists.map((feedPlaylist, idx) => {
                    if (idx === feedPlaylists.length - 1) {
                        return (
                            <div ref={this.lastPlaylistRef} >
                                <FeedIndexItem key={idx} feedPlaylist={feedPlaylist} />
                            </div>
                        )
                    } else {
                        return (
                            <div>
                                <FeedIndexItem key={idx} feedPlaylist={feedPlaylist} />
                            </div>
                        )
                    }
                }
                )}
                {endMessage}
            </ul>
        )
    }
}

export default FeedIndex;