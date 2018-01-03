// show a single post

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {
    // fetch post by id once page loaded
    componentDidMount() {
        // provided by react-router to get values from URLs
        const { id } = this.props.match.params;
        this.props.fetchPost(id);
    }
    
    // call delete post action creator and go back to index
    onDeleteClick() {
        const { id } = this.props.match.params;
        this.props.deletePost(id, () => {
            this.props.history.push('/');
        });
    }
    
    // render page
    render() {
        const { post } = this.props;
        
        // if post has not been loaded yet, return this
        if (!post) {
            return <div>Loading</div>;
        }
        
        return (
            <div>
                <Link to="/">Back to News List</Link>
                <button 
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}>
                Delete Post</button>
                
                <h3>{post.title}</h3>
                <small><b>{post.categories}</b></small>
                <p>{post.content}</p>
            </div>
        );
    }
}

function mapStateToProps({ posts }, ownProps) {
    // only return one post, not whole list
    return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);