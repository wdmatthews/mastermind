<template>
  <v-card>
    <v-card-title class="pa-4">
      <span class="mx-auto">Start Game</span>
    </v-card-title>
    <v-card-text class="px-4 py-0">
      <p class="text-center">
        Waiting for participants
      </p>
      <p class="mb-0 text-center">
        {{ game.participantIds.length }} participant{{ game.participantIds.length !== 1 ? 's' : '' }}
        ha{{ game.participantIds.length !== 1 ? 've' : 's' }} joined
      </p>
    </v-card-text>
    <v-card-actions class="pa-4">
      <v-spacer />
      <v-btn
        color="primary"
        :disabled="startingGame"
        @click="start"
      >
        {{ startingGame ? 'Starting' : 'Start' }}
      </v-btn>
      <v-spacer />
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  computed: {
    startingGame() {
      return this.$store.state.startingGame
    },
    game() {
      return this.$store.state.game
    },
  },
  methods: {
    async start() {
      try {
        this.$store.commit('startStartingGame')
        const { error } = await this.$realm.currentUser.functions.startGame(this.game.name)
        this.$store.commit('stopStartingGame')
        
        if (error) {
          this.$store.commit('showSnackbar', { color: 'error', message: error })
        } else {
          this.$store.commit('showSnackbar', { color: 'info', message: 'Game started' })
        }
      } catch (error) {
        this.$store.commit('showSnackbar', { color: 'error', message: 'Error starting game' })
      }
    },
  },
}
</script>
