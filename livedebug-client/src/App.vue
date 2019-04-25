<template>
  <div id="app">
    <navigation :counter="this.favorites.length"/>
    <router-view v-on:myFavorite="myFavorite" @favorites="favorites"/>
  </div>
</template>

<script>
import '@/assets/style.css'
import Navigation from '@/components/Navigation'

export default {
  data () {
    return {
      favorites: []
    }
  },

  components: {
    Navigation
  },

  method: {
    myFavorite (data) {
      console.log("masuk myFavorite method di app", data)
      this.favorites = this.favorites.concat(data)
    }
  }
}
</script>

<style>
</style>
