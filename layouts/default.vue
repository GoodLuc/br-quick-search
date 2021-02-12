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
  background: #eeeeee;
  margin: 0;
  overflow-y: hidden;
}

::-webkit-scrollbar-track { border: 2px solid white; background-color: #b2bec3; }
::-webkit-scrollbar { width: 6px; background-color: rgba(77, 77, 77, 1); }
::-webkit-scrollbar-thumb { background-color: rgba(77, 77, 77, 1); border-radius: 3px; }

img { max-width: 100%; }
h2, h3 { font-weight: 200; }

.container {
  margin: 0 auto;
  height: calc(100vh - 4em);
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
.w100 { width: 100%; }
.mb-md { margin-bottom: 1.5em; }
.mt-md { margin-top: 1.5em; }

.text-center { text-align: center; }

.shade {
  border-radius: 3px;
  background: #fafafa;
  box-shadow: 0px 2px 3px -1px rgba(0, 0, 0, 0.1);
}

</style>
