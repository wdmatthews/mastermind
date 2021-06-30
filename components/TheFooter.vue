<template>
  <v-footer
    v-if="game && game.started"
    app
    flat
    class="pa-4"
  >
    <v-row
      class="ma-n2"
      justify="center"
    >
      <GuessChoice
        v-for="i in 4"
        :key="`choice-${i}`"
        ref="choices"
        class="pa-2"
        @change="getGuess"
      />
      <v-col
        cols="12"
        class="text-center"
      >
        <v-btn
          color="primary"
          :disabled="!game || !game.turn || game.turn.participantId !== $store.state.userId"
          @click="submitGuess"
        >
          Submit Guess
        </v-btn>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  data: vm => ({
    selectedGuess: '',
  }),
  computed: {
    game() {
      return this.$store.state.game
    },
  },
  methods: {
    getGuess() {
      let guess = ''
      this.$refs.choices.forEach((choice) => {
        guess += choice.value + 1
      })
      this.selectedGuess = guess
    },
    async submitGuess() {
      await this.$realm.currentUser.functions.submitGuess(this.game.name, this.selectedGuess)
    },
  },
}
</script>
