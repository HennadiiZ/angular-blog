export interface User {
    email: string
    password: string
    returnSecureToken?: boolean 
    // returnSecureToken from firebase
}


// from response obj in console.log
// displayName: ""
// email: "gz@gmail.com"
// expiresIn: "3600"
export interface FbAuthResponse {
    idToken: string
    expiresIn: string
}

export interface Post {
    id?: string
    title: string
    text: string
    author: string
    date: Date
}