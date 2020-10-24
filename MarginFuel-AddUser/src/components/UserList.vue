<template>
    <div id="UserList">
        <div class="row1">
            <label class="label1">
                Display
                <select id = "numRecords" v-on:input= "valueReset();  setRows();">
                    <option value="10">10</option>
                    <option value="1">1</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                records
            </label>

            <label class="label2">
                Search:
                <input id = "search" type="text" v-on:keyup= "searchTable()" aria-controls="table">
            </label>
        </div>
        <div id = "scroll">
        <table class="table" id="table">
            <thead>
                <tr>
                    <th id="th0" v-on:click = "sortTable(0)">Email
                        <i id = "table0" class="arrows fas fa-sort"></i>
                    </th>
                    <!--<th id="th1" v-on:click = "sortTable(1)" style="width: 50%;">Password   
                        <i id = "table1" class="arrows fas fa-sort"></i>
                    </th>-->
                </tr>
            </thead>
            <tbody>
                <tr v-bind:key="user.id" v-for="user in UserList">
                        <td>{{user.email}}</td>
                        <!--<td style="width: 50%;">{{user.password}}</td>-->
                </tr>
            </tbody>
        </table>
        </div>
        <div class="row2">
                <p id = "p" style="margin-top: 10px; margin-left: 10px; float: left; font-size: 14px;" >{{"Showing " + this.$store.state.initialVal + " to " + this.$store.state.lastVal + " of " + this.$store.state.totalVal + " entries"}}</p>
                <ul class="pagination">
                    <li class="page-item">
                    <button class="page-link" href="#" aria-label="Previous" v-on:click = "previousPage()">
                        <span aria-hidden="true">&laquo;</span>
                        <span class="sr-only"></span>
                    </button>
                    </li>
                    <li class="current-page-item"><a id = "tablePage" class="page-link" href="#">{{tablePageNumber}}</a></li>
                    <li class="page-item">
                    <button class="page-link" href="#" aria-label="Next" v-on:click = "nextPage()">
                        <span aria-hidden="true">&raquo;</span>
                        <span class="sr-only"></span>
                    </button>
                    </li>
                </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "UserList", 
    props: {
        UserList: Array,
    },
    data() {
        return{
            tablePageNumber:  1
        }
    },
    methods: {
//////////////////////////////////////////////////////////////////////////////
//This method sorts whatever table column is selected in alphabetical order, 
//then if it is applied again it will sort in the oposite order
//////////////////////////////////////////////////////////////////////////////
        sortTable(n) { 
                var table = document.getElementById("table"); 
                var  i, x, y, count = 0; 
                var switching = true; 
                var direction = "ascending"; 
                document.getElementById("table"+n).className = "fas fa-sort-up arrows";
                document.getElementById("th"+n).style.backgroundImage= "linear-gradient(to bottom,#eff3f8 0,#e3e7ed 100%)";
                document.getElementById("th"+n).style.color= "rgb(53, 119, 190)"
                document.getElementById("table"+n).style.marginTop = "0px";

                // if(n == 0){
                //     document.getElementById("table"+1).className = "fas fa-sort arrows";
                //     document.getElementById("th"+1).style.backgroundImage = "linear-gradient(to bottom,#f8f8f8 0,#ececec 100%)";
                //     document.getElementById("th"+1).style.backgroundColor = "rgb(242, 242, 242)";
                //     document.getElementById("th"+1).style.color = "rgb(57, 57, 57)";
                //     document.getElementById("table"+n).style.marginTop = "0px";
                // }else{
                    // document.getElementById("table"+0).className = "fas fa-sort arrows";
                    // document.getElementById("th"+0).style.backgroundImage = "linear-gradient(to bottom,#f8f8f8 0,#ececec 100%)";
                    // document.getElementById("th"+0).style.backgroundColor = "rgb(242, 242, 242)";
                    // document.getElementById("th"+0).style.color = "rgb(57, 57, 57)";
                    // document.getElementById("table"+n).style.marginTop = "0px";
                //}

                //showing everything
                    var tr = table.getElementsByTagName("tr");
                    for(var a = 0; a < this.$store.state.totalVal+1; a++){
                            tr[a].style.display = "";
                    }
                
                while (switching) { 
                    switching = false; 
                    var rows = table.rows; 
                    var Switch = false;
  
                    for (i = 1; i < (rows.length-1); i++) {  
                        x = rows[i].getElementsByTagName("TD")[n]; 
                        y = rows[i + 1].getElementsByTagName("TD")[n]; 
  
                        if (direction == "ascending") { 
                            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) 
                            { 
                                Switch = true; 
                                break; 
                            } 
                        }else{   
                            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) 
                            { 
                                Switch = true; 
                                break; 
                            } 
                        } 
                    } 
                    if (Switch) { 
                        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]); 
                        switching = true;   
                        count++; 
                    }else { 
                        if (count == 0 && direction == "ascending") { 
                            direction = "descending"; 
                            document.getElementById("table"+n).className = "fas fa-sort-down arrows";
                            document.getElementById("table"+n).style.marginTop = "0px";
                            switching = true; 
                        } 
                    } 
                } 
                this.setRows();
            },
        
        
//////////////////////////////////////////////////////////////////////////////
//This method sets the number of rows that are displayed based on the input 
//from the User via the select input
//////////////////////////////////////////////////////////////////////////////
        setRows(){
                //variables 
                var table = document.getElementById("table");
                var tr = table.getElementsByTagName("tr");
                this.$store.commit("set", ["totalVal", tr.length]);
                var i = 0;

                //number of records requested
                var records = document.getElementById("numRecords");
                var recCount = records.options[records.selectedIndex].value;

                //displaying correct number of rows based off requests
                var show = recCount * (this.tablePageNumber-1) + 1;
                    for(i; i < this.$store.state.totalVal; i++){
                        if(recCount > this.$store.state.totalVal){
                            tr[i].style.display = "";
                        }else{
                            if(i == 0)
                            {
                                tr[i].style.display = "";
                            }else if(i >= show && i <= (recCount*this.tablePageNumber))
                            {
                                tr[i].style.display = "";
                            }else{
                                tr[i].style.display = "none";
                            }
                        }
                }
                this.$nextTick(function(){
                    this.showing();
                });
            },
//////////////////////////////////////////////////////////////////////////////
//This method will actively search the entire table and will only display the 
//table rows that fit the search. Also adjusts what is displayed bottom left
//////////////////////////////////////////////////////////////////////////////
        searchTable(){
                var txtvalue, td;
                var count = 0;
                var table = document.getElementById("table");
                var tr = table.getElementsByTagName("tr");
                var search = document.getElementById("search").value.toLowerCase();
                
                if(search == ""){
                    this.showing();
                    this.setRows();
                }else{
                    for(var i = 0; i < tr.length; i++){
                    td = tr[i].getElementsByTagName("td")[0];
                    if(td){
                        txtvalue = td.textContent || td.innerText;
                        if(txtvalue.toLowerCase().indexOf(search) > -1){
                            tr[i].style.display = "";
                            count++;
                        }else{
                            tr[i].style.display = "none";
                        }
                    }
                    }
                    if(count == 0)
                    {
                        this.$store.commit("set", ["initialVal", 0]);
                    }else{
                        this.$store.commit("set", ["initialVal", 1]);
                    }
                    this.$store.commit("set", ["lastVal", count]);
                    }
                },
        
//////////////////////////////////////////////////////////////////////////////
//This method will trigger whenever the user wishes to go to the next page of 
//users in the table. It will check if there are values on the next page and 
//will decide whether to go to the next page or not based on that information
//////////////////////////////////////////////////////////////////////////////
        nextPage(){
                var table = document.getElementById("table");
                var tr = table.getElementsByTagName("tr");
                var records = document.getElementById("numRecords");
                var recCount = records.options[records.selectedIndex].value;
                var pageNumber = document.getElementById("tablePage").textContent;

                if((tr.length - 1)> recCount)
                {
                    if(recCount == 1 && (tr.length - 1) <= pageNumber){
                        this.tablePageNumber = this.tablePageNumber;
                    }else if((tr.length-1) < (parseInt(pageNumber-1)*parseInt(recCount))+parseInt(recCount)){
                        this.tablePageNumber = this.tablePageNumber;
                    }else{
                        this.tablePageNumber += 1;
                        this.$nextTick(function(){
                            this.setRows();
                        });
                    } 
                }
                },
//////////////////////////////////////////////////////////////////////////////
//This method will trigger whenever the user wishes to go to the previous page of 
//users in the table. It will check if there are values on the previous page and
//will decide whether to go to the previous page or not based on that information
//////////////////////////////////////////////////////////////////////////////
        previousPage(){
                var table = document.getElementById("table");
                var tr = table.getElementsByTagName("tr");
                var records = document.getElementById("numRecords");
                var recCount = records.options[records.selectedIndex].value;

                if(tr.length > recCount)
                {
                    if(this.tablePageNumber > 1)
                    {
                        this.tablePageNumber -= 1;
                        this.$nextTick(function(){
                            this.setRows();
                        });
                    }
                }
                },   
//////////////////////////////////////////////////////////////////////////////
//This method controls the message that is output to the bottom left of the 
//table, it calculates how many records are being showed, and how many that there
//are in total
//////////////////////////////////////////////////////////////////////////////
        showing(){
                //----------
                //Total
                //----------
                var table = document.getElementById("table");
                if (table == null|| table.rows == null)
                {
                    return ""
                }else{
                this.$store.commit("set", ["totalVal", (table.rows.length)-1]);

                //----------
                //Ratio
                //----------
                //number of records being displayed
                var records = document.getElementById("numRecords");
                var recCount = records.options[records.selectedIndex].value;

                //what page of records are you on
                var pageNum = this.tablePageNumber;

                //Calculations
                this.$store.commit("set", ["initialVal", ((pageNum - 1) * recCount) + 1]);
                if(this.$store.state.totalVal>recCount*pageNum){
                    this.$store.commit("set", ["lastVal", pageNum * recCount]);
                }else{
                    this.$store.commit("set", ["lastVal", this.$store.state.totalVal]);
                }
                }
            },
        valueReset(){
            this.tablePageNumber=  1;
            }
        },
//////////////////////////////////////////////////////////////////////////////
//This mounted section contains all of the actions that will occur once all of 
//the data has been rendered to the screen. (Pretty much this waits until 
//everything has been loaded to execute)
//////////////////////////////////////////////////////////////////////////////
    mounted(){
        this.showing();
        this.setRows();
        },
}
</script>

<style scoped>
/*-----------------------------------------------------------------
User List
-----------------------------------------------------------------*/
#UserList{
    display: block;
    font-size: 13px;
    line-height: 19.5px;
    text-size-adjust: 100%;
    color: rgb(57, 57, 57);
    background-color: rgb(236, 240, 247);
    border-bottom: 2px solid rgb(213, 213, 213);
    position: absolute;
    top: 189px;
    left: 210px;
    right: 20px;
  }


/*------------------------------------------------------------------
For the table
------------------------------------------------------------------*/
.table {
    margin: 0 auto;
    font-size: 10px;
    color: rgb(57, 57, 57);
    border-bottom: 2px solid rgb(213, 213, 213);
    border-spacing: 0;
    border-collapse: collapse;
    }
tbody, thead{
    display: block;
    }
.table tbody{
    overflow-y: auto;
    max-height: 312px;
    }
.table th{
    height: 35px;
    border: 1px solid #ddd;
    color: rgb(57, 57, 57);
    background-image: linear-gradient(to bottom,#f8f8f8 0,#ececec 100%);
    background-color: rgb(242, 242, 242);
    width: 1000px;
    }
.table th:hover{
  color: rgb(53, 119, 190);
    }

.table td {
    vertical-align: top!important;
    border: 1px solid rgb(221, 221, 221);
    background-color: rgb(255, 255, 255);
    text-align: left;
    height: 31px;
    line-height: 1.42857143;
    padding: 8px;
    width: 1000px;
    }

.table tr:nth-child(even) td{
    background-color: rgb(247, 247, 247);
    }

.row1{
    height: 57px;
    background-color: #eff3f8;
    }

.row2{
    height: 63px;
    background-color: #eff3f8;
    }

.arrows{
  background-color: transparent;
  float: right;
  margin-right: 15px;
  font-size: small;
    }

select{
    border-radius: 0;
    box-shadow: none!important;
    color: #858585;
    background-color: #fff;
    border: 1px solid #d5d5d5;
    text-transform: none;
    margin: 0 4px;
    width: 70px;
    height: 25px;
    padding: 2px 3px;
    }

input{
    border-radius: 0;
    box-shadow: none!important;
    color: #858585;
    background-color: #fff;
    border: 1px solid #d5d5d5;
    text-transform: none;
    margin: 0 4px;
    width: 140px;
    height: 25px;
    padding: 2px 3px;
    }

.label1{
    margin: 15px;
    float: left;
    }
.label2{
    margin: 15px;
    float: right
    }
/*------------------------------------------------------------------
For the Pagination (Core UI)
------------------------------------------------------------------*/
.pagination {
  display: flex;
  list-style: none;
  border-radius: 0.25rem;
  float: right;
  text-decoration: none;
  margin: 13px 30px;
    }

.page-link {
  height: 33.44px;
  width: 32px;
  position: relative;
  display: block;
  padding: 0.5rem 0.75rem;
  line-height: 1.25;
  border: 1px solid;
  color: rgb(129, 129, 129);
  background-color: rgb(247, 247, 247);
  border-color: #d8dbe0;
  text-decoration: none;
    }

.current-page-item a{
    background-color: rgb(95, 157, 208);
    color: rgb(247, 247, 247);
    border: none;
    }


</style>