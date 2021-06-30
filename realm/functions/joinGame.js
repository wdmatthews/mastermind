/* eslint-disable no-undef */
/* eslint-disable semi */
exports = async function joinGame(name) {
  const { id: userId } = context.user;
  const mongodb = context.services.get('mongodb-atlas');
  const gamesCollection = mongodb.db('mastermind').collection('games');
  let game = await gamesCollection.findOne({ name });
  
  if (!game) {
    game = {
      name,
      participantIds: [userId],
      started: false,
      turn: {
        number: 1,
        participantId: '',
      },
      code: '1234',
      guesses: [],
      winnerId: '',
    };
    const { insertedId } = await gamesCollection.insertOne(game);
    game._id = insertedId.toString();
  } else if (game.started) {
    return { error: 'Game already started' };
  } else if (game.participantIds.length === 4) {
    return { error: 'Game is full' };
  } else if (game.participantIds.includes(userId)) {
    return { error: 'Already joined game' };
  } else {
    game.participantIds = [...game.participantIds, userId];
    await gamesCollection.updateOne({ name }, { $set: { participantIds: game.participantIds } });
  }
  
  game = await gamesCollection.findOne({ name });
  return { game };
};
