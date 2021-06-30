<template>
  <v-card
    class="pa-1 mx-auto d-flex"
  >
    <v-chip
      v-for="(colorIndex, i) in selectedColorIndexes"
      :key="`color-${i}`"
      class="mx-1 my-2"
      :color="colors[colorIndex]"
    >
      {{ colorIndex + 1 }}
    </v-chip>
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
  },
}
</script>
