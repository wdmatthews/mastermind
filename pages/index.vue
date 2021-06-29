<template>
  <div>
    <template v-if="!game">
      <v-row
        no-gutters
        justify="center"
        align="center"
        class="pa-4"
        style="height: 100vh"
      >
        <JoinGameCard />
      </v-row>
    </template>
  </div>
</template>

<script>
export default {
  computed: {
    game() {
      return this.$store.state.game
    },
  },
  watch: {
    game(newValue, oldValue) {
      if (newValue && !oldValue) {
        this.watchGameEvents()
        this.watchGameEnd()
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
        if (!this.game || this.game.name !== name) { return }
        const { fullDocument } = change
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
