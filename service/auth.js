const sessionID = new Map();

function setUser(id, user) {
    sessionID.set(id, user);
}

function getUser(id) {
    return sessionID.get(id);
}

export { setUser, getUser };