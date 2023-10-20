export const getUser = (users, id) => {
  return users.find(user => user.id === id)
};
