const getToken = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedUser')

  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    return user.token
  } 
}

const exportedObject = { getToken }
export default exportedObject