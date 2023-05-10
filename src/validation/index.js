import {
  getUsers
  } from '../api';

  const users = await getUsers()
  const listUserName = users.map(item => item.username)



const checkUserName = async  (username) => {
  console.log('Checking user',listUserName.includes(username))
}



export {checkUserName}