<template>
  <div class="container search">
    <h2>Search</h2>
    <SearchInput class="mb-md" v-model="searchTerm" />
    <div v-for="(usersPage, index) in users" :key="index" class="cards">
      <Card v-for="(user, index) in usersPage" :user="user" :highlight="searchTerm" :key="index" />
    </div>
    <div ref="divAsTarget"><h3>Loading ... </h3></div>
    <p>Page {{ pages }}</p>
  </div>
</template>

<script>
import SearchInput from "@/components/SearchInput.vue"
import Card from "@/components/Card.vue"

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
    this.users.push(this.$store.getters.getUserBatch(1))
    this.observer = new IntersectionObserver(this.callback, {root: null, threshold: 0});
    this.observer.observe(this.$refs.divAsTarget);
  },

  data() {
    return {
      pages: 1,
      searchTerm: '',
      users: [],
      observer: null
    }
  },

  methods: {
    callback(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.pages++
          this.users.push(this.$store.getters.getUserBatch(this.pages))
        }
      });
    }
  },

  computed: {
  }

}
</script>

<style lang="scss">
.search {
  max-width: 650px;
  &__input {
    margin: 2em 0;
  }
}
</style>