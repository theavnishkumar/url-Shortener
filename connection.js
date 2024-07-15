import mongoose from 'mongoose';

// MongoDB Connection

async function mongoDBConnection(dbUrl) {
    return mongoose.connect(dbUrl)
}

export default mongoDBConnection;