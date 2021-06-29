<template>
  <v-app-bar
    v-if="game"
    app
    flat
  >
    <v-spacer />
    {{ game.participantIds.length }} Participants
    <v-spacer />
  </v-app-bar>
</template>

<script>
export default {
  computed: {
    game() {
      return this.$store.state.game
    },
  },
}
</script>
