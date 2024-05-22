
function goToSingleMember(row){
    if (row.memberid=="#"){
        window.location.href=`/filtering/authors/${row.membername}`
        }
    else{
        window.location.href=`/filtering/users/${row.memberid}`
        }
    }

    function search(userType){
        textString=document.getElementById("search").value;
        localStorage.setItem("search",textString);
        console.log(userType)
        if (textString.length==0){
        }
        else{
          window.location.href=`/filtering/${userType}/searching/${textString}/`;
        }
        }

    function fetch(){
        textString= localStorage.getItem('search');
        document.getElementById("search").placeholder=textString;
    }
    
fetch();