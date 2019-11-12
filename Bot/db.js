const firebase = require('firebase-admin')
const config = require('./config/db_config.json')

// initialize you admin sdk configuration snippet
firebase.initializeApp({
    credential: firebase.credential.cert(config),
    databaseURL: "https://ig-bot-10953.firebaseio.com"
});

//  declare a following object that stores the lists of users we have followed
let database = firebase.database();

const following = (param = '') => database.ref(`following/${param}`);
const followHistory = (param = '') => database.ref(`follow_history/${param}`);

//  declare a addFollowing that saves a username we started following along with the time
let addFollowing = async username => {
    const added = new Date().getTime()
    return following(username).set({username, added})
};

// declare a getFollowings that returns the list of all users we are following
let getFollowings = async () => following().once('value').then(data => data.val());

// declare a unfollow that takes a username from the list of all users we are following,
// unfollows them and add the username to the follow_history
let unFollow = async username => following(username).remove().then(() => followHistory(username).set({username}));

let inHistory = async username => followHistory(username).once('value').then(data => data.val());
// declare a unfollow that takes a username from the list of all users we are following,
// unfollows them and add the username to the follow_history

module.exports = {
    addFollowing,
    getFollowings,
    unFollow,
    inHistory
}