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
  computed: {
    game() {
      return this.$store.state.game
    },
    selectedCode() {
      if (!this.$refs.choices) { return '' }
      let code = ''
      this.$refs.choices.forEach((choice) => {
        code += choice.value + 1
      })
      return code
    },
  },
  methods: {
    async submitGuess() {
      await this.$realm.currentUser.functions.submitGuess(this.game.name, this.selectedCode)
    },
  },
}
</script>
