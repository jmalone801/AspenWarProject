const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/wins", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("You're connected to MongoDB!!!"))
    .catch(err => console.log("You're no longer connected to the database", err));