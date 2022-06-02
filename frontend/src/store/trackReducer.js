import { csrfFetch } from "./csrf";

const LOAD_TRACK = 'track/loadTrack';
const LOAD_TRACKS = 'track/loadTracks'
const LOAD_GENRES = 'track/loadGenres'
const ADD_TRACK = 'track/addTrack'
const UPDATE_TRACK = 'track/updateTrack'
const DELETE_TRACK = 'track/deleteTrack'

// Action creators
export const loadTrack = (track) => {
    return {
        type: LOAD_TRACK,
        track
    }
}

export const loadTracks = (tracks) => {
    return {
        type: LOAD_TRACKS,
        tracks
    }
}

export const loadGenres = (genres) => {
    return {
        type: LOAD_GENRES,
        genres
    }
}

export const addTrack = (track) => {
    return {
        type: ADD_TRACK,
        track
    }
}

export const updateTrack = (track) => {
    return {
        type: UPDATE_TRACK,
        track
    }
}

export const deleteTrack = (trackId, userId) => {
    return {
        type: DELETE_TRACK,
        trackId,
        userId
    }
}

// export const getGenres = () => async (dispatch) => {
//     console.log('in get Genres')
//     const response = await csrfFetch('/api/tracks/genres');

//     if (response.ok) {
//         const genres = await response.json();
//         dispatch(loadGenres(genres));
//     }
// }

export const getOneTrack = (trackId) => async (dispatch) => {
    const response = await csrfFetch(`/api/tracks/${trackId}`)

    if (response.ok) {
        const track = await response.json();
        dispatch(loadTrack(track));
    }
}

export const getTracks = () => async (dispatch) => {
    const response = await fetch('/api/tracks')
    const tracks = await response.json();
    dispatch(loadTracks(tracks));
}

export const createTrack = (payload) => async (dispatch) => {
    const response = await csrfFetch('/api/tracks', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })

    const track = await response.json();
    dispatch(addTrack(track))
    return track;
}

export const removeTrack = (trackId, userId) => async (dispatch) => {
    const response = await fetch(`api/tracks/${trackId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const { id: deletedTrackId } = await response.json();
        dispatch(deleteTrack(deletedTrackId, userId))
        return deletedTrackId;
    }
}

const initialState = { entries: {}, isLoading: true };

const trackReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        // case LOAD_GENRES:
        //     return {
        //         ...state,
        //         genres: action.genres
        //     }
        // case LOAD_TRACK:
        //     /* Returns {
        //         track
        //         |- entries: { trackId: { backend data } }
        //     } */
        //     return {
        //         ...state,
        //         entries: {...state.entries, [action.track.id]: action.track}
        //     }
        case LOAD_TRACKS:
            newState = { ...state, entries: {...state.entries} };
            action.tracks.forEach(track => (newState.entries[track.id] = track))
            return newState
        case ADD_TRACK:
            return {
                ...state,
                entries: { ...state.entries, [action.track.id]: action.track }
            }

        case DELETE_TRACK:
            newState = { ...state };
            delete newState[action.trackId]
            return newState;
        default:
            return state;
    }
}

export default trackReducer;
