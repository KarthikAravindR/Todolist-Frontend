import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}
export const authSuccess = (userId, token, email, image, username) => {
    console.log(userId, token, email, image, username)
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId: userId,
        token: token,
        email: email,
        image: image,
        username: username,
    }
}
export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    }
}
export const clearall = () => {
    return {
        type: "CLEAR_ALL",
    }
}
export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('email')
    localStorage.removeItem('image')
    localStorage.removeItem('username')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}
export const authTimeOut = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
            dispatch(clearall())
        }, expirationTime * 1000)
    }
}
export const auth = (email, password, isSignup, username) => {
    return dispatch => {
        dispatch(authStart())
        let url = process.env.REACT_APP_BACKEND_URL + '/auth/signup'
        let authData = {
            username: username,
            email: email,
            password: password,
        }
        if (!isSignup) {
            url = process.env.REACT_APP_BACKEND_URL + '/auth/login'
            authData = {
                email: email,
                password: password,
            }
        }
        axios.post(url, authData)
            .then(response => {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('userId', response.data.userId)
                localStorage.setItem('email', response.data.email)
                localStorage.setItem('image', response.data.image)
                localStorage.setItem('username', response.data.username)
                dispatch(authSuccess(response.data.userId, response.data.token, response.data.email, response.data.image, response.data.username))
            })
            .catch(error => {
                dispatch(authFailed(error.response.data.message))
            })
    }
}
export const authCheckState = () => {
    const token = localStorage.getItem('token')
    const localId = localStorage.getItem('userId')
    const email = localStorage.getItem('email')
    const image = localStorage.getItem('image')
    const username = localStorage.getItem('username')
    return dispatch => {
        if (token === null) {
            dispatch(logout())
            dispatch(clearall())
        } else {
            dispatch(authSuccess(localId, token , email, image, username))
        }
    }
}
export const googleauth = (response) => {
    return dispatch => {
        dispatch(authStart())
        let url = process.env.REACT_APP_BACKEND_URL + '/auth/googlelogin'
        let authData = {
            tokenId: response.tokenId
        }
        console.log(authData)
        axios.post(url, authData)
            .then(response => {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('userId', response.data.userId)
                localStorage.setItem('email', response.data.email)
                localStorage.setItem('image', response.data.image)
                localStorage.setItem('username', response.data.username)
                dispatch(authSuccess(response.data.userId, response.data.token, response.data.email, response.data.image, response.data.username))
            })
            .catch(error => {
                dispatch(authFailed(error.response.data.message))
            })
    }
}
export const facebookauth = (response) => {
    return dispatch => {
        dispatch(authStart())
        let url = process.env.REACT_APP_BACKEND_URL + '/auth/facebooklogin'
        let authData = {
            userId: response.userID,
            accessToken: response.accessToken
        }
        axios.post(url, authData)
            .then(response => {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('userId', response.data.userId)
                localStorage.setItem('email', response.data.email)
                localStorage.setItem('image', response.data.image)
                localStorage.setItem('username', response.data.username)
                dispatch(authSuccess(response.data.userId, response.data.token, response.data.email, response.data.image, response.data.username))
            })
            .catch(error => {
                dispatch(authFailed(error.response.data.message))
            })
    }
}

// export const authStart = () => {
//     return {
//         type: actionTypes.AUTH_START
//     }
// }

// export const authSuccess = (idToken, localId) => {
//     return {
//         type: actionTypes.AUTH_SUCCESS,
//         idToken: idToken,
//         localId: localId
//     }
// }

// export const authFailed = (error) => {
//     return {
//         type: actionTypes.AUTH_FAILED,
//         error: error
//     }
// }

// export const logout = () => {
//     localStorage.removeItem('token')
//     localStorage.removeItem('userId')
//     localStorage.removeItem('expirationDate')
//     return {
//         type: actionTypes.AUTH_LOGOUT
//     }
// }
// export const logout2 = () => {
//     return {
//         type: actionTypes.AUTH_LOGOUT_2
//     }
// }

// export const authTimeOut = (expirationTime) => {
//     return dispatch => {
//         setTimeout(() => {
//             dispatch(logout())
//             dispatch(logout2())
//         },expirationTime * 1000)
//     }
// }

// export const auth = (email, password, isSignup) => {
//     return dispatch => {
//         dispatch(authStart())
//         let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDmebw5c4PnRUDtuoRqMVdUTud83xRHRZU'
//         if (!isSignup) {
//             url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDmebw5c4PnRUDtuoRqMVdUTud83xRHRZU'
//         }
//         const authData = {
//             email: email,
//             password: password,
//             returnSecureToken: true
//         }
//         axios.post(url, authData)
//             .then(response => {
//                 console.log(response.data)
//                 const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
//                 localStorage.setItem('token', response.data.idToken)
//                 localStorage.setItem('userId', response.data.localId)
//                 localStorage.setItem('expirationDate', expirationDate)
//                 dispatch(authSuccess(response.data.idToken, response.data.localId))
//                 dispatch(authTimeOut(response.data.expiresIn))
//             })
//             .catch(error => {
//                 console.log(error)
//                 dispatch(authFailed(error.response.data.error))
//             })
//     }
// }

// export const authCheckState = () => {
//     const token = localStorage.getItem('token')
//     const expirationDate = new Date(localStorage.getItem('expirationDate'))
//     const localId = localStorage.getItem('localId')
//     return dispatch => {
//         if(token === null) {
//             dispatch(logout())
//             dispatch(logout2())
//         }else {
//             if (expirationDate <= new Date()) {
//                 dispatch(logout())
//                 dispatch(logout2())
//             }else {
//                 console.log("in")
//                 dispatch(authSuccess(token, localId))
//                 dispatch(authTimeOut((expirationDate.getTime() - new Date().getTime())/1000))
//             }
//         }
//     }
// }