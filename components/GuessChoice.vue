<template>
  <v-btn-toggle
    v-model="value"
    mandatory
    background-color="transparent"
    :color="colors[value]"
  >
    <v-btn
      v-for="(color, i) in colors"
      :key="`color-choice-${i}`"
    >
      {{ i + 1 }}
    </v-btn>
  </v-btn-toggle>
</template>

<script>
import colors from '~/assets/data/colors.js'

export default {
  data: vm => ({
    value: 0,
    colors,
  }),
}
</script>
