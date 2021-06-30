<template>
  <v-card
    class="pb-1 d-flex text-center"
    :class="{
      'px-1': isCorrect,
      'px-4': !isCorrect,
      'pt-1': isCorrect,
      'pt-4': !isCorrect,
    }"
    style="flex-direction: column;"
  >
    <p v-show="!isCorrect">
      {{ numCorrectTotal }} correct number{{ numCorrectTotal !== 1 ? 's' : '' }} in total
    </p>
    <p
      v-show="!isCorrect"
      class="mb-3"
    >
      {{ numCorrectPlaces }} correct number{{ numCorrectPlaces !== 1 ? 's' : '' }} in the correct place{{ numCorrectPlaces !== 1 ? 's' : '' }}
    </p>
    <div>
      <v-chip
        v-for="(colorIndex, i) in selectedColorIndexes"
        :key="`color-${i}`"
        class="mx-1 my-2"
        :color="colors[colorIndex]"
      >
        {{ colorIndex + 1 }}
      </v-chip>
    </div>
  </v-card>
</template>

<script>
import colors from '~/assets/data/colors.js'
import guessToIntArray from '~/assets/functions/guessToIntArray.js'

export default {
  props: {
    guess: {
      type: String,
      default: '',
    },
  },
  data: vm => ({
    colors,
  }),
  computed: {
    selectedColorIndexes() {
      return guessToIntArray(this.guess)
    },
    correctColorIndexes() {
      if (!this.$store.state.game || !this.$store.state.game.code) { return [] }
      return guessToIntArray(this.$store.state.game.code)
    },
    numCorrectTotal() {
      const selectedFrequency = this.getColorFrequency(this.selectedColorIndexes)
      const correctFrequency = this.getColorFrequency(this.correctColorIndexes)
      let numCorrect = 0
      
      Object.keys(correctFrequency).forEach((index) => {
        if (!selectedFrequency[index]) { return }
        if (selectedFrequency[index] <= correctFrequency[index]) {
          numCorrect += selectedFrequency[index]
        } else {
          numCorrect += correctFrequency[index]
        }
      })
      
      return numCorrect
    },
    numCorrectPlaces() {
      let numCorrect = 0
      this.selectedColorIndexes.forEach((colorIndex, i) => {
        if (colorIndex === this.correctColorIndexes[i]) { numCorrect++ }
      })
      return numCorrect
    },
    isCorrect() {
      return this.numCorrectPlaces === this.correctColorIndexes.length
    },
  },
  methods: {
    getColorFrequency(indexes) {
      const frequency = {}
      indexes.forEach((index) => {
        frequency[index] = frequency[index] ? frequency[index] + 1 : 1
      })
      return frequency
    },
  },
}
</script>
