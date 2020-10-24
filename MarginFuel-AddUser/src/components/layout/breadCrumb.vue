<template>
    <div id="breadC">
        <ul class="breadcrumb">
            <li class="breadcrumb-item breadcrumb-item-home"  v-on:click = "forceRerender()" style = "color: #E33059 !important;"><i class="fas fa-home breadHouse"></i><a href="http://localhost:8080/#/">Home</a></li>
            <li class = "breadcrumb-item" v-for = "(element, index) in path" :key = "index">
                <span v-html = element></span> 
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name:
        "breadCrumb",
    data(){
        return{
            componentKey: 0,
            path: [],
            link: ""
        }
    },
    methods: {
//////////////////////////////////////////////////////////////////////////////
//This method takes the URL of the page and breaks it up at every "/" then it
//turns everything inbetween each into a page navigation in the path
//////////////////////////////////////////////////////////////////////////////
        breadcrumb(){
            var href = document.location.href;
            var s = href.split("/");

            for(var i = 4; i<(s.length); i++){
                
                this.link += "<a href=\"" + href.substring(0, href.indexOf("/" + s[i]) 
                + s[i].length + 1) + "\">"+s[i] + "</a> ";

                if(this.link.length < 25){
                    this.link = "";
                }else{
                    this.path.push(this.link);
                    this.link = "";
                }
            }
            },
//////////////////////////////////////////////////////////////////////////////
//This method takes makes the path data element equal to nothing. It is used 
//every time the home button in the breadcrumb is pressed. It makes it so that 
//the home element is the only displayed if you are on the home page
//////////////////////////////////////////////////////////////////////////////
        forceRerender(){
          this.componentKey += 1;
          this.path = "";
            document.getElementsByTagName("a")[2].style.color="rgb(88, 88, 88)";
            document.getElementsByTagName("a")[3].style.color="rgb(88, 88, 88)";
            document.getElementsByTagName("a")[4].style.color="rgb(88, 88, 88)";
          },


    },
    mounted(){
        this.breadcrumb();
        }
}
</script>

<style>
/*-----------------------------------------------------------------
Breadcrumb (The page navigation or trail that has been taken to get 
to where the user currently is in the website)
-----------------------------------------------------------------*/
#breadC{
  background-color: rgb(204, 206, 208);
  height: 41px;
  margin-left: 189px;
  width: 100%;
  text-decoration: none;
  line-height: 40px;
  font-size: 14px;
  font-weight: 400;
  border: none;
  z-index: 1;
  overflow-y: hidden!important;
    }

.breadcrumb {
  margin-bottom: 0px;
  list-style: none;
  border: 0px solid transparent;
    }

.breadcrumb-item:not(:first-of-type)::before {
    content: "〉";
    color: rgb(163, 167, 177);
    margin-right: 8px;
    }   
.breadcrumb-item{
  text-decoration: none;
  display: inline-block;
  padding-left: 12px;
    }

.breadcrumb-item-home a{
    color: #e33059!important;
    }

.breadcrumb-item a{
  text-decoration: none;
  color: rgb(35, 45, 55);
    }

.breadHouse{
    margin-right: 5px;
    padding-top: 10px;
    color: black;
    font-size: medium;
    }   

</style>