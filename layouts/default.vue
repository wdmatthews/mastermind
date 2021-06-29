<template>
  <v-app>
    <TheAppBar />
    <v-main>
      <Nuxt />
      <v-snackbar
        v-model="snackbarVisible"
        :color="snackbar.color"
      >
        {{ snackbar.message }}
        <template #action="{ attrs }">
          <v-btn
            text
            v-bind="attrs"
            @click="snackbarVisible = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>
export default {
  computed: {
    snackbar() {
      return this.$store.state.snackbar
    },
    snackbarVisible: {
      get() {
        return this.snackbar.visible
      },
      set() {
        this.$store.commit('hideSnackbar')
      },
    },
  },
}
</script>
