<template>
  <v-card>
    <v-card-title class="pa-4">
      <span class="mx-auto">Join Game</span>
    </v-card-title>
    <v-card-text class="px-4 py-0">
      <v-form
        v-model="nameIsValid"
        @submit.prevent="join"
      >
        <v-text-field
          v-model="name"
          label="Name"
          placeholder="abcd 1234"
          outlined
          :counter="nameMaxLength"
          :rules="nameRules"
        />
      </v-form>
    </v-card-text>
    <v-card-actions class="pa-4">
      <v-spacer />
      <v-btn
        color="primary"
        :disabled="!nameIsValid || joiningGame"
        @click="join"
      >
        {{ joiningGame ? 'Joining' : 'Join' }}
      </v-btn>
      <v-spacer />
    </v-card-actions>
  </v-card>
</template>

<script>
import * as Realm from 'realm-web'

const nameMaxLength = 20

export default {
  data: vm => ({
    nameIsValid: false,
    name: '',
    nameMaxLength,
    nameRules: [
      v => !!v || 'Required',
      v => !v || v.length <= nameMaxLength || `${nameMaxLength} characters max`,
    ],
  }),
  computed: {
    joiningGame() {
      return this.$store.state.joiningGame
    },
  },
  methods: {
    async join() {
      const credentials = Realm.Credentials.anonymous()
      
      try {
        const user = await this.$realm.logIn(credentials)
        this.$store.commit('setUserId', user.id)
      } catch (error) {
        this.$store.commit('showSnackbar', { color: 'error', message: 'The website is not available right now' })
        return
      }
      
      try {
        this.$store.commit('startJoiningGame')
        const { game, error } = await this.$realm.currentUser.functions.joinGame(this.name)
        this.$store.commit('stopJoiningGame')
        
        if (game) {
          this.$store.commit('joinGame', game)
          this.$store.commit('showSnackbar', { color: 'info', message: 'Joined game' })
        } else {
          this.$store.commit('showSnackbar', { color: 'error', message: error })
        }
      } catch (error) {
        this.$store.commit('showSnackbar', { color: 'error', message: 'Error joining game' })
      }
    },
  },
}
</script>
