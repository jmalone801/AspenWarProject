const mongoose = require('mongoose');

const WinSchema = new mongoose.Schema(
    {
        playerTotalWins: { type: Number },
        computerTotalWins: { type: Number },
    },
    { timestamps: true }
)

module.exports.Wins = mongoose.model('Wins', WinSchema);