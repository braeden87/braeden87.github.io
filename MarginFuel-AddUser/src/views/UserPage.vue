<!--------------------------------------------------------------------------------
This page is where all of the other pages come together
--------------------------------------------------------------------------------->
<template>
  <div>
    <div id="app"></div>
    <div id="main">
      <AddUser v-on:add-user= "addUser"/>
      <h1 id="h1">User Information</h1>
      <UserList v-bind:UserList= "UserList"/>
    </div>
  </div>
</template>

<script>
import UserList from "../components/UserList";
import AddUser from "../components/AddUser";
//import axios from "axios";
export default {
  name: 'UserPage',
  components: {
    AddUser,
    UserList
  },
  methods: {
//////////////////////////////////////////////////////////////////////////////
//this method accepts the information from the AddUser method in the child AddUser
//class and then makes the change or actually creates the new User and adds it 
//the list
//////////////////////////////////////////////////////////////////////////////
    addUser(newUser){
        this.UserList.push(newUser);
      // const {email, password} = newUser;
      // axios.post("https://5fc9fea7-74fa-430b-9d26-d14fd7be6bc9.mock.pstmn.io", 
      // {email, password})
      // .then(res=>this.UserList = [...this.UserList, res.data])
      // .catch();
      }
  },
  data(){
    return{
      UserList: [
        {
          id: 1,
          email: "braeden.huot@ksc.keene.edu",
          password: "********"        
        },
        {
          id: 2,
          email: "cooperhuot@gmail.com",
          password: "*******1"        
        },
        {
          id: 3,
          email: "cpacocha@yahoo.com",
          password: "********"
        },
        {
          id: 4,
          email: "sam.clough@ksc.keene.edu",
          password: "4"        
        },
        {
          id: 5,
          email: "steven.edgar@ksc.keene.edu",
          password: "5"        
        },
        {
          id: 6,
          email: "scott.gamble@ksc.keene.edu",
          password: "6"
        },
        {
          id: 7,
          email: "chris.pratt@ksc.keene.edu",
          password: "7"        
        },
        {
          id: 8,
          email: "patrick.doyle@ksc.keene.edu",
          password: "8"        
        },
        {
          id: 9,
          email: "braeden@marginfuel.com",
          password: "9"
        },
        {
          id: 10,
          email: "jphuotindy@gmail.com",
          password: "10"        
        },
        {
          id: 11,
          email: "brandieportercnm@yahoo.com",
          password: "11"        
        },
        {
          id: 12,
          email: "brandieportercnm@gmail.com",
          password: "12"
        }
      ]
    }
  }
}
</script>
<style>
</style>
