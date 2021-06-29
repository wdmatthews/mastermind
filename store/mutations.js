export default {
  setUserId(state, userId) {
    state.userId = userId
  },
  showSnackbar(state, { color, message }) {
    state.snackbar.visible = true
    state.snackbar.color = color
    state.snackbar.message = message
  },
  hideSnackbar(state) {
    state.snackbar.visible = false
  },
  startJoiningGame(state) {
    state.joiningGame = true
  },
  stopJoiningGame(state) {
    state.joiningGame = false
  },
  joinGame(state, game) {
    state.game = game
  },
  startStartingGame(state) {
    state.startingGame = true
  },
  stopStartingGame(state) {
    state.startingGame = false
  },
  updateGame(state, game) {
    state.game = game
  },
  leaveGame(state) {
    state.game = null
  },
}
