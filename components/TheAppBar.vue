<template>
  <v-app-bar
    v-if="game"
    app
    flat
  >
    {{ game.participantIds.length }} Participant{{ game.participantIds.length !== 1 ? 's' : '' }}
    <v-spacer />
    <v-btn
      color="error"
      outlined
      @click="leaveGame"
    >
      Leave
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  computed: {
    game() {
      return this.$store.state.game
    },
  },
  methods: {
    async leaveGame() {
      if (this.game.participantIds.length > 1) {
        await this.$realm.currentUser.functions.leaveGame(this.game.name)
      } else {
        await this.$realm.currentUser.functions.endGame(this.game.name)
      }
      
      this.$store.commit('leaveGame')
    },
  },
}
</script>
