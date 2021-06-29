/* eslint-disable no-undef */
/* eslint-disable semi */
exports = async function leaveGame(name) {
  const { id: userId } = context.user;
  const mongodb = context.services.get('mongodb-atlas');
  const gamesCollection = mongodb.db('mastermind').collection('games');
  const game = await gamesCollection.findOne({ name });
  
  if (!game) {
    return { error: 'Game does not exist' };
  }
  
  const participantIndex = game.participantIds.indexOf(userId);
  
  if (participantIndex < 0) {
    return { error: 'Already left' };
  }
  
  participantIds = [...game.participantIds];
  participantIds.splice(participantIndex, 1);
  await gamesCollection.updateOne({ name }, { $set: { participantIds } });
};
