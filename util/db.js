const mongoose = require('mongoose')

exports.connect = () => {
    const dbUrl = process.env.MONGODB_URI;
    mongoose
        .connect(dbUrl, {
            useUnifiedTopology: true,
        })
        .then(() => console.log('DB connection successful!'))
        .catch((err) => console.error('Error connecting to the database:\n', err));

    // close db connection when application terminates using CTRL + C.
    process.on('SIGINT', () => {
        mongoose.connection.close()
            .then(() => {
                console.log('Database connection closed');
                process.exit(0); // Exit the application
            })
            .catch((err) => {
                console.log('Database connection close failed:\n' + err);
                process.exit(1); // Exit the application with an error status
            });
    });
}