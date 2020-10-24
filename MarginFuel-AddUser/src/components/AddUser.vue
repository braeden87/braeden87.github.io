<template>
    <div>
        <div id="addUser">
            <button class=" btn btn-danger" v-on:click= "showForm()"><i class="fas fa-plus-square plus"></i>Add User </button>
        </div>
            <div id="background-popup">
                    <form v-if:validateForm: @submit = "addUser" id="addForm" name="addForm">
                        <h2>User Information</h2><br><br>
                        <hr>
                        Email:
                        <input type="email" v-model= "email" name="email" id = "email" required><br>
                        Confirm Email:
                        <input type="email" v-model= "email2" name="email2" id = "email2" required><br>
                        <p id="emailMatch">**Emails must match**</p>
                        <!--Password:
                        <input type="password" v-model= "password" name="password" id = "password" required><br><br>-->
                        <input type="Submit" v-on:click = "validateForm(); forceRerender();" class= "btn btn-danger">
                    </form>
            </div>
    </div>
</template>

<script>
export default {
    name: "AddUser", 
    data(){
        return {
            email: "",
            email2: "",
            //password: "",
            //role: ""
        }
    },
    methods: {
//////////////////////////////////////////////////////////////////////////////
//This method is called every time the submit button in the Add User Form is
//pushed, it first calls the validateForm() method to make sure all of the 
//information is correct, it then sends the data to the main page
//////////////////////////////////////////////////////////////////////////////
        addUser(e){
            e.preventDefault();
            if(this.validateForm() == true)
            {
            const newUser = {
                email: this.email,
                //password: this.password,
            }
            //Send up to parent
            this.$emit('add-user', newUser);
            this.email = "";
            this.email2 = "";
            //this.password = "";

            //if(this.$store.state.lastVal == this.$store.state.totalVal){
                this.$store.commit("incriment", ["totalVal"]);
                this.$store.commit("incriment", ["lastVal"]);
            //}else{
            //    this.$store.commit("incriment", ["totalVal"]);
            //}

            }
            },
//////////////////////////////////////////////////////////////////////////////
//This method is called every time the addUser button is pushed, it then makes 
//the form to insert information into visible.
//////////////////////////////////////////////////////////////////////////////
        showForm(){
            document.getElementById("background-popup").style.display = "flex";
            },
//////////////////////////////////////////////////////////////////////////////
//This method is used to make sure all of the information input into the form
//is valid. it first checks to make sure something has been input into all 
//fields and then compares the emails to eachother to make sure they match
//////////////////////////////////////////////////////////////////////////////
        validateForm(){
            //var password = document.getElementById("addForm").elements.namedItem("password").value;
            var email = document.getElementById("addForm").elements.namedItem("email").value;
            var email2 = document.getElementById("addForm").elements.namedItem("email2").value;
            var value = false;

            if(email == email2){
                if(email != ""){
                   document.getElementById("background-popup").style.display = "none";
                   value = true;
                   document.getElementById("emailMatch").style.display = "none";
                }
            }else{
                document.getElementById("emailMatch").style.display = "block";
            }
                return value;
            }
            },
}
</script>

<style scoped>
/*------------------------------------------------------------------
From AddUser File
------------------------------------------------------------------*/
#addForm{
    border:  rgb(194, 195, 198) solid 2px;
    font-size: larger;
    font-weight: bold;
    text-align: left;
    width: 500px;
    height: 350px;
    background-color: rgb(255, 255, 255);
    color: rgb(57, 57, 57);
    align-items: center;
    padding: 5px;
    border-radius: 15px;
    }

input ,select{
  background-color: rgb(255, 255, 255);
  color: rgb(32, 44, 50);
  border: 1px solid rgb(57, 57, 57);
  width: 90%;
  margin-left: 5%;
    }

#addUser{
  position: absolute;
  top: 110px;
  left: 225px;
    }

/*------------------------------------------------------------------
Pop Up Form
------------------------------------------------------------------*/
#background-popup{
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .6);
  position: absolute;
  left: 0;
  top: 0;
  justify-content: center;
  align-items: center;
  z-index: 5;
  display: none;

  -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 2s; /* Firefox < 16 */
  -ms-animation: fadein 2s; /* Internet Explorer */
       animation: fadein 2s;
    }

@keyframes fadein {
from { opacity: 0; }
to   { opacity: 1; }
}
/* Firefox < 16 */
@-moz-keyframes fadein {
from { opacity: 0; }
to   { opacity: 1; }
}
/* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes fadein {
from { opacity: 0; }
to   { opacity: 1; }
}
/* Internet Explorer */
@-ms-keyframes fadein {
from { opacity: 0; }
to   { opacity: 1; }
}
/* Opera < 12.1 */
@-o-keyframes fadein {
from { opacity: 0; }
to   { opacity: 1; }
}
/*------------------------------------------------------------------
Button (Core UI)
------------------------------------------------------------------*/
.btn-danger {
        width: 88.33px;
        height: 26px;
        border-radius: 3px;
        color: #f5f5f5;
        background-color: rgb(66, 139, 202);
        border: 4px solid rgb(66, 139, 202);
        font-size: 13px;
        float: right;
        line-height: 1.39;
    }


.plus{
    height: 12px; 
    margin-right: 5px;
    margin-top: 3px;
    }


</style>