const getToken = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedUser');

  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    return user.token;
  }
};

export const config = () => {
  return {
    headers: {
      Authorization: `bearer ${getToken()}`
    }
  };
};

const exportedObject = { getToken };
export default exportedObject;
