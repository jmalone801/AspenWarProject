const WinsController = require('../controllers/war.controller');

module.exports = function (app) {
    // creates new win
    app.post('/api/war/winround', WinsController.createWin);

    // Returns all wins
    app.get("/api/win/all", WinsController.findAllWins); 

    // Deletes one win
    app.delete("/api/win/delete", WinsController.deleteWin);
}