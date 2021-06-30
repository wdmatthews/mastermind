/* eslint-disable no-undef */
/* eslint-disable semi */
exports = async function submitGuess(name, guess) {
  const { id: userId } = context.user;
  const mongodb = context.services.get('mongodb-atlas');
  const gamesCollection = mongodb.db('mastermind').collection('games');
  const game = await gamesCollection.findOne({ name });
  
  if (!game) {
    return { error: 'Game does not exist' };
  } else if (!game.started) {
    return { error: 'Game not started' };
  } else if (game.winnerId) {
    return { error: 'Game won' };
  } else if (!game.participantIds.includes(userId)) {
    return { error: 'Not in game' };
  } else if (game.turn.participantId !== userId) {
    return { error: 'Not your turn' };
  } else if (game.code === guess) {
    await gamesCollection.updateOne({ name }, { $set: { winnerId: userId } });
  } else {
    let participantIndex = game.participantIds.indexOf(userId) + 1;
    
    if (participantIndex >= game.participantIds.length) {
      participantIndex = 0;
    }
    
    game.turn.number++;
    game.turn.participantId = game.participantIds[participantIndex];
    game.guesses = [...game.guesses, guess];
    await gamesCollection.updateOne({ name }, { $set: { turn: game.turn, guesses: game.guesses } });
  }
  
  return { };
};
