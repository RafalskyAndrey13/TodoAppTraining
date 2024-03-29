import { push } from 'connected-react-router';
import { auth, googleAuthProvider } from '../firebase';


export const loading = () => ({
    type: 'LOADING'
});

export const loaded = () => ({
    type: 'LOADED'
});

export const authed = () => ({
    type: 'AUTHED'
});

export const unauthed = () => ({
    type: 'UNAUTHED'
});

export const authenticate = () => {
    return dispatch => {
        auth.onAuthStateChanged(user => {
            if (user !== null) {
                dispatch(authed());
            } else {
                dispatch(unauthed());
            }
            dispatch(loaded());
        });
    }
}

export const login = (email, password) => {
    return dispatch => {

        dispatch(loading());
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                dispatch(push('/'));
            })
            .catch(error => {
                dispatch(loaded());
                alert(error.message);
            });

    }
}

export const googleLogin = () => {
    return dispatch => {
        auth.signInWithPopup(googleAuthProvider).then(result => {
            dispatch(push('/'));
        }).catch(error => {
            alert(error.message);
        });
    }
}

export const signup = (email, password) => {
    return dispatch => {

        dispatch(loading());
        auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                dispatch(push('/login'));
            })
            .catch(error => {
                dispatch(loaded());
                alert(error.message);
            });

    }
}

export const logout = () => {
    return (dispatch) => {
        dispatch(loading());
        auth.signOut()
            .then(() => {
                dispatch(push('/login'))
            });
    }
}