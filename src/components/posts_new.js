// form to add new posts

import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addPost } from '../actions';

class PostsNew extends Component {
    // render a form field
    renderField(field) {
        // shorten field.meta.touched to touched, same for error
        const { meta: { touched, error } } = field;
        
        // use class has-danger only if touched and invalid
        const className = `form-group 
            ${touched && error ? 'has-danger' : ''}`;
        
        return(
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input} // adds event handlers e.g. onChange
                />
                <div className="text-help">{touched ? error : ''}</div>
            </div>
        );
    }
    
    // call addPost action creator, go back to index when request is complete
    onSubmit(values) {
        this.props.addPost(values, () => {
            this.props.history.push('/');
        });
    }
    
    // render page
    render() {
        const { handleSubmit } = this.props;
        
        return (
            // if submission is valid, run onSubmit, bind 'this' context
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h3>Submit New Post</h3>
                <Field 
                    name="title" // piece of state this produces
                    label="Title" // used in renderField
                    component={this.renderField} // how to render field
                />
                <Field
                    name="categories"
                    label="Categories"
                    component={this.renderField}
                />
                <Field
                    name="content"
                    label="Content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

// validate form - no field can be empty
function validate(values) {
    const errors = {};
    
    if(!values.title) {
        errors.title = "Enter a title";
    }
    if(!values.categories) {
        errors.categories = "Enter a category";
    }
    if(!values.content) {
        errors.content = "Enter some content";
    }
    
    return errors;
}

// lets redux form communicate with reducer function
export default reduxForm({
    validate, // key and content are same
    form: 'PostsNewForm' // form name - must be unique
})(
    // no change to state so first arg is null
    connect(null,{ addPost })(PostsNew)
);