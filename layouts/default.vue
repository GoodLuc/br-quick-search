<template>
  <div>
    <div class="container" v-if="!loaded"><p>Loading...</p></div>
    <div v-else>
      <Nuxt />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from "vuex"

export default {
  data() {
    return {
      loaded: false
    }
  },
  head() {
    return { title: "Bravado Quick Search" }
  },
  mounted() {
    this.$store.dispatch("loadUsers")
  },
  computed: {
    ...mapState(["userPool"])
  },
  watch: {
    userPool: function() {
      if (this.userPool.length) { 
        this.loaded = true
      } 
    }  
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&display=swap');
body {
  font-family: 'Roboto', sans-serif;
  background: #fafafa;
}
img { max-width: 100%; }
h2, h3 {
  font-weight: 200;
}

.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  padding: 1em;
}

.flex {
  display: flex;
  &.vertical { flex-direction: column; }
  &.justify_between { justify-content: space-between; }
  &.wrap { flex-wrap: wrap ;}
}
.w100 {
  width: 100%;
}
.mb-md {
  margin-bottom: 1.5em;
}
.mt-md {
  margin-top: 1.5em;
}

.shade {
  border-radius: 3px;
  background: #fafafa;
  box-shadow: 0px 2px 3px -1px rgba(0, 0, 0, 0.1);
}

</style>
