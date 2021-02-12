<template>
  <div class="container search">
    <SearchInput ref="searchbar" class="search__bar" v-model="searchTerm" />
    <div class="search__results">
      <div v-for="(usersPage, index) in users" :key="index">
        <Card v-for="(user, index) in usersPage" :user="user" :highlight="searchTerm" :key="index" />
      </div>
      <div v-if="!users.length"><p>No Results</p></div>
      <div v-else>
        <div v-if="isLast">
          <p>No more results.</p>
        </div>
        <div v-else>
          <h3>Loading... </h3>
        </div>
      </div>
    </div>
    <div ref="infiniteScrollObserver"></div>
  </div>
</template>

<script>
import SearchInput from "@/components/SearchInput.vue"
import Card from "@/components/Card.vue"
import _ from 'lodash'

export default {

  head() {
    if (this.searchTerm === '') {
      return { title: "Bravado Quick Search" }
    } else {
      return { title: "Bravado Quick Search: "+this.searchTerm }
    }
  },

  components: {
    Card, SearchInput
  },

  mounted() {
    this.$refs.searchbar.$el.focus();

    // Set the infinite scroll observer
    this.observer = new IntersectionObserver(this.observerCallback, {root: null, threshold: 0});
    this.observer.observe(this.$refs.infiniteScrollObserver);
    
    if (this.$route.params.term) {
      // Get users by search term in route
      this.searchTerm = this.$route.params.term
    } else {
      // Get the first batch of unfiltered users 
      this.users.push(this.$store.getters.getUserBatch(1)[0])
    }
  },

  data() {
    return {
      pages: 1,
      searchTerm: '',
      users: [],
      isLast: false,
      observer: null
    }
  },

  methods: {

    observerCallback(entries) {
      // Load more entries
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.pages++
          let batch = this.$store.getters.getUserBatch(this.pages)
          this.users.push(batch[0])
          this.isLast = batch[1]
        }
      });
    },
  },

  watch: {

    searchTerm: _.debounce(function () {
      this.users = []
      this.pages = 1
      if (this.searchTerm.length > 1) {
        this.$store.commit("setFilteredResults", this.searchTerm)
        this.$router.push(`/search/${this.searchTerm}`)
      } else {
        this.$store.commit("cleanFilteredResults")
        this.$router.push("/search/")
      }
      let batch = this.$store.getters.getUserBatch(1)
      // Load batch of users and check if it's the last page.
      // The getUserBatch() function returns an array which contains:
      // [0]: The actual users array, and [1]: a boolean that informs if it's the last page of users.
      batch[0].length ? this.users.push(batch[0]) : this.users = []
      this.isLast = batch[1]
    }, 1000),

    users: function() {
      // Handle scroll observer state
      if (!this.users.length || this.isLast) {
        this.observer.disconnect()
      } else {
        this.observer.observe(this.$refs.infiniteScrollObserver);
      }
    }

  },

}
</script>

<style lang="scss">
.search {
  max-width: 650px;
  position: relative;
  &__bar {
    position: fixed;
    max-width: 650px;
    z-index: 10;
  }
  &__results {
    margin-top: 70px;
  }
}
</style>