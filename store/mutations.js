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
}
