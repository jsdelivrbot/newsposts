// show list of posts

import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
// Link prevents default <a> tag behaviours e.g. server request
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';

class PostsIndex extends Component {
    // autocalled by React after Component appears in DOM
    componentDidMount() {
        this.props.fetchPosts();
    }

    // render list of posts
    renderPosts() {
        // iterates through state and renders each post
        return _.map(this.props.posts, post => {
            return (
                <li className="list-group-item" key={post.id}>
                    <Link to={`/posts/${post.id}`}>
                        {post.title}
                    </Link>
                        
                </li>
            );
        })
    }

    // render page
    render() {
        return (
            <div>
                <div className="text-xs-right">
                    <Link className="btn btn-primary" to="/posts/new">
                    Add News</Link>
                </div>
                <h3>News Posts</h3>
                <ul className="list-group">
                    {this.renderPosts()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { posts: state.posts };
}

// wire up action creator so it can be used inside component
export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
