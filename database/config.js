const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log('DataBase is online!');
    } catch (err) {
        console.log(err);
        throw new Error('Mongoose Error');
    }

}

module.exports = { dbConnection }