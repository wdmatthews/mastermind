<template>
  <div :style="(!game || !game.started) ? 'height: 100%;' : ''">
    <template v-if="!game || !game.started">
      <v-row
        no-gutters
        justify="center"
        align="center"
        class="pa-4"
        style="height: 100%"
      >
        <JoinGameCard v-if="!game" />
        <StartGameCard v-else-if="!game.started" />
      </v-row>
    </template>
    <template v-if="game && game.started && !game.winnerId">
      <p
        v-show="game && game.turn && game.turn.participantId === $store.state.userId"
        class="mx-4 pt-4 mb-0 text-center text-h5"
      >
        It's your turn!
      </p>
      <v-row
        justify="center"
        class="ma-2"
      >
        <v-col
          v-for="(guess, i) in guesses"
          :key="`guess-${i}`"
          cols="12"
          class="pa-2 d-flex"
        >
          <GuessSubmitted
            class="mx-auto d-flex"
            :guess="guess"
          />
        </v-col>
      </v-row>
    </template>
    <template v-if="game && game.started && game.winnerId">
      <p class="mt-4 mb-0 text-center">
        Game over. The correct guess was {{ game.code }}.
      </p>
      <v-row
        justify="center"
        class="ma-2"
      >
        <v-col
          cols="12"
          class="pa-2 d-flex"
        >
          <GuessSubmitted
            class="mx-auto"
            :guess="game.code"
          />
        </v-col>
      </v-row>
    </template>
  </div>
</template>

<script>
export default {
  data: vm => ({
    isWatchingGame: false,
  }),
  computed: {
    game() {
      return this.$store.state.game
    },
    guesses() {
      if (!this.game || !this.game.guesses) { return [] }
      return [...this.game.guesses].reverse()
    },
  },
  watch: {
    game() {
      if (this.game && !this.isWatchingGame) {
        this.isWatchingGame = true
        this.watchGameEvents()
        this.watchGameEnd()
      } else if (!this.game) {
        this.isWatchingGame = false
      }
    },
  },
  methods: {
    async watchGameEvents() {
      const mongodb = this.$realm.currentUser.mongoClient('mongodb-atlas')
      const gamesCollection = mongodb.db('mastermind').collection('games')
      const { name } = this.game
      
      for await (const change of gamesCollection.watch({
        filter: {
          operationType: 'update',
          'fullDocument.name': name,
        },
      })) {
        if (!this.game || this.game.name !== name) {
          this.isWatchingGame = false
          return
        }
        
        const { fullDocument } = change
        
        if (!this.game.started && fullDocument.started) {
          this.$store.commit('showSnackbar', { color: 'info', message: 'Game was started' })
        }
        
        this.$store.commit('updateGame', fullDocument)
      }
    },
    async watchGameEnd() {
      const mongodb = this.$realm.currentUser.mongoClient('mongodb-atlas')
      const gamesCollection = mongodb.db('mastermind').collection('games')
      const { name } = this.game
      
      // eslint-disable-next-line no-unused-vars
      for await (const change of gamesCollection.watch({
        filter: {
          operationType: 'delete',
          'fullDocument.name': name,
        },
      })) {
        if (!this.game || this.game.name !== name) { return }
        this.$store.commit('leaveGame')
        this.$store.commit('showSnackbar', { color: 'info', message: 'Game was ended' })
      }
    },
  },
}
</script>
