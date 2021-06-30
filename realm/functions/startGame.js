/* eslint-disable no-undef */
/* eslint-disable semi */
exports = async function startGame(name) {
  const { id: userId } = context.user;
  const mongodb = context.services.get('mongodb-atlas');
  const gamesCollection = mongodb.db('mastermind').collection('games');
  const game = await gamesCollection.findOne({ name });
  
  if (!game) {
    return { error: 'Game does not exist' };
  } else if (game.started) {
    return { error: 'Game already started' };
  } else if (!game.participantIds.includes(userId)) {
    return { error: 'Not in game' };
  } else {
    const numColors = 4;
    let code = '';
    
    for (let i = 0; i < 4; i++) {
      code += Math.floor((Math.random() * numColors) + 1);
    }
    
    game.turn.participantId = game.participantIds[Math.floor(Math.random() * game.participantIds.length)];
    await gamesCollection.updateOne({ name }, { $set: { started: true, code, turn: game.turn } });
  }
  
  return { };
};
