/* eslint-disable no-undef */
/* eslint-disable semi */
exports = async function endGame(name) {
  const mongodb = context.services.get('mongodb-atlas');
  const gamesCollection = mongodb.db('mastermind').collection('games');
  await gamesCollection.deleteOne({ name });
};
