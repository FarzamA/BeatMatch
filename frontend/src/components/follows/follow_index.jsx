import React from "react";

import FollowIndexItem from './follow_index_item';

class FollowIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { followers, following } = this.props;
        const followerValues = Object.values(followers);
        console.log('props', this.props);

        return(
            <div className='follow-index-container'>
                <ul className='follow-index'>
                    {
                        this.props.location.pathname === '/followers' ?
                            followerValues.map((follow, idx) => 
                                <FollowIndexItem key={idx} follow={follow} />)
                            : following.map((follow, idx) => 
                                <FollowIndexItem key={idx} follow={follow} />)
                    }
                </ul>
            </div>
        )
    }
};

export default FollowIndex;