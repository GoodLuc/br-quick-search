export const state = () => ({
  userPool: [],
  searchIndex: [],
  filteredResults: [],
  noResults: false,
  atResultsTail: false
})

export const mutations = {

  setUserPool(state, users) {
    state.userPool = users
  },
  setSearchIndex(state, searchIndex) {
    state.searchIndex = searchIndex
  },
  setFilteredResults(state, term) {
    // Set search results using search index array's keys
    state.filteredResults = state.searchIndex.reduce((acc, entry, index) => (entry.includes(term) ? [...acc, index] : acc), []);
    // Flag if it's an empty result set
    if (!state.filteredResults.length) { state.noResults = true } else { state.noResults = false }
  },
  cleanFilteredResults(state) {
    state.filteredResults = []
    state.noResults = false
  },
  setResultsTail(state, isAtTail) {
    // Last page flag to stop infinite loading observer
    state.atResultsTail = isAtTail
  }
}

export const getters = {

  getUserBatch(state) {
    // Get paged user results

    if (state.filteredResults.length) {
      // Handle search results
      return (page) => {
        let batch = state.filteredResults.slice((page-1)*20, page*20).map(index => state.userPool[index])
        let isLast = false
        batch.length < 20 ? isLast = true : isLast = false
        return [batch, isLast]
      }

    } else if (state.noResults) {
      // Handle empty search results
      return () => [0, false]

    } else {
      // Otherwise return all users
      return (page) => {
        let batch = state.userPool.slice((page-1)*20, page*20)
        let isLast = false
        batch.length < 20 ? isLast = true : isLast = false
        return [batch, isLast]
      }
    }

  },

}

export const actions = {
  
  async loadUsers({commit}) {
    // Load users from JSON
    let response = await fetch("https://raw.githubusercontent.com/allaud/bravado-quest/master/app/views/welcome/users.json.erb")
    if (response.ok) {
      let users = await response.json();
      // Create a separate array with only strings as a search index for efficiency
      let searchIndex = users.map(user => user.name+'~'+user.title+'~'+user.email+'~'+user.address+'~'+user.city)
      commit("setSearchIndex", searchIndex)
      commit("setUserPool", users)
    } else {
      alert("HTTP-Error: " + response.status);
    }
  }

}