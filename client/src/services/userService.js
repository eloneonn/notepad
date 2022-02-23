/**
 *      USED FOR INTERACTING WITH LOCALSTORAGE ONLY
 */

let token = null

const STORAGE_KEY = 'loggedBlogAppUser'

const setUser = (user) => {
  console.log('userService got the user:', user);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  token = user.token
}

const getUser = () => {
  const loggedUserJSON = window.localStorage.getItem(STORAGE_KEY)
  console.log('Logged user:', loggedUserJSON);
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    token = user.token
    return user
  }

  return null
}

const clearUser = () => {
  localStorage.clear()
  token = null
}

const getToken = () => token

const exportedObject = { setUser, getUser, clearUser, getToken, }
export default exportedObject