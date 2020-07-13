export const state = () => ({
  users: [],
  user: {}
})

export const mutations = {
  setUsers (state, users) {
    state.users = users
  },
  pushUser (state, user) {
    state.users.push(user)
  },
  setUser (state, user) {
    state.user = user
  }
}
