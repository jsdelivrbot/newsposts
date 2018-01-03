// update state based on action received

import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';

// make state an object, not an array
export default function(state = {}, action) {
    switch (action.type) {
        // delete post with given id from local state
        case DELETE_POST:
            // payload = id (see actions)
            return _.omit(state, action.payload);
        // get post with given id, add to overall state object
        case FETCH_POST:
            // code below is shortened ES6 for:
            // const post = action.payload.data;
            // const newState = { ...state  }; // new state from existing
            // newState[post.id] = post; // add/update post in new state
            // return newState;
            return { ...state, [action.payload.data.id]: action.payload.data }
        // return list of posts
        case FETCH_POSTS:
            // convert fetched array to object with lodash
            return _.mapKeys(action.payload.data, 'id');
        default:
            return state;
    }
}