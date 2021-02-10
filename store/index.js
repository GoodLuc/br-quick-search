export const state = () => ({
  userPool: []
})

export const mutations = {
  setUserPool(state, users) {
    state.userPool = users
  }
}

export const getters = {
  getUserBatch(state) {
    return page => state.userPool.slice((page-1)*20, page*20)
  }
}

export const actions = {
  
  async loadUsers({commit}) {
    let response = await fetch("https://raw.githubusercontent.com/allaud/bravado-quest/master/app/views/welcome/users.json.erb")
    if (response.ok) {
      let json = await response.json();
      let users = {}
      console.log(json)
      commit("setUserPool", json)
    } else {
      alert("HTTP-Error: " + response.status);
    }
  }

}