<template>
  <div class="container mx-auto py-5">
    <!-- Search Interface -->
    <form action>
      <div class="flex w-full mb-6">
        <div class="w-4/5 relative">
          <input
            type="text"
            v-model="search"
            placeholder="Search Any Review"
            class="appearance-none bg-grey-lighter text-grey-darker border border-grey-lighter rounded-l py-3 pl-10 leading-tight focus:outline-none focus:bg-white focus:border-grey w-full"
          >

          <div class="pointer-events-none absolute pin-y pin-l pb-2 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="w-5 mt-2 mr-2 ml-2 icon-search"
            >
              <circle cx="10" cy="10" r="7" class="fill-transparent"></circle>
              <path
                class="fill-indigo"
                d="M16.32 14.9l1.1 1.1c.4-.02.83.13 1.14.44l3 3a1.5 1.5 0 0 1-2.12 2.12l-3-3a1.5 1.5 0 0 1-.44-1.14l-1.1-1.1a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
              ></path>
            </svg>
          </div>
        </div>

        <button
          class="bg-indigo text-white font-semibold rounded-r h-11 w-1/5 ml-auto"
          type="submit"
          @submit.prevent="findCollections"
        >
          <span v-show="!loading">Find Collections</span>
          <i class="fas fa-spinner fa-2x fa-spin" v-show="loading"></i>
        </button>
      </div>
    </form>

    <!-- List Interface -->
    <div class="flex flex-wrap justify-between item-center content-center">
      <gallery
        v-for="(favorite, index) in collections"
        :key="index"
        :name="favorite.name"
        :covers="favorite.covers"
        :description="favorite.description"
      >
        <div>
          <div class="border-b border-grey-light mb-2 py-2"></div>
          <div class="flex justify-between">
            <div>
              <p class="text-sm text-grey-dark mb-1">Views</p>
              <p class="text-lg text-dark font-semibold">{{ favorite.stats.views}}</p>
            </div>

            <div>
              <p class="text-sm text-grey-dark mb-1">Appreciations</p>
              <p class="text-lg text-dark font-semibold">{{ favorite.stats.appreciations}}</p>
            </div>

            <div>
              <p class="text-sm text-grey-dark mb-1">Comments</p>
              <p class="text-lg text-dark font-semibold">{{ favorite.stats.comments}}</p>
            </div>
          </div>
        </div>
      </gallery>
    </div>
  </div>
</template>

<script>
import Gallery from '@/components/Gallery.vue'

export default {
  data () {
    return {
      search: '',
      loading: false
    }
  },

  components: {
    Gallery
  },

  computed: {
    collections () {
      return this.$store.state.collections
    }
  },

  beforeDestroy () {
    this.$store.dispatch('cleanCollection')
  },

  methods: {
    findCollections () {
      this.loading = true
      this.$store
        .dispatch('findCollections', this.search)
        .then(() => (this.loading = false))
    }
  }
}
</script>

<style>
</style>
