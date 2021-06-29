<template>
  <div>
    <template v-if="!game && !joiningGame">
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
import * as Realm from 'realm-web'

export default {
  data: vm => ({
    joiningGame: false,
  }),
  computed: {
    game() {
      return this.$store.state.game
    },
  },
  async mounted() {
    const credentials = Realm.Credentials.anonymous()
    
    try {
      const user = await this.$realm.logIn(credentials)
      this.$store.commit('setUserId', user.id)
    } catch (error) {
      this.$store.commit('showSnackbar', { color: 'error', message: 'The website is not available right now' })
    }
  },
}
</script>
