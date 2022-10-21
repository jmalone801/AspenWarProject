const { Wins } = require('../models/war.model');

// Creates win
module.exports.createWin = (request, response) => {
    const { playerTotalWins, computerTotalWins } = request.body;
    Wins.create({
        playerTotalWins,
        computerTotalWins
    })
        .then(win => response.json(win))
        .catch(err => response.json(err));
};

// Returns all wins
module.exports.findAllWins = (req, res) => {
    Wins.find({})
        .then(allWins => res.json( allWins ))
        .catch(err => res.json(err));
};


// Deletes all wins
module.exports.deleteWin = (req, res) => {
    Wins.deleteMany({})
        .then(confirmDelete => res.json(confirmDelete))
        .catch(err => res.json(err))
}