
function goToSingleMember(row){
    if (row.memberid=="#"){
        window.location.href=`http://127.0.0.1:8000/filtering/authors/${row.membername}`
        }
    else{
        window.location.href=`http://127.0.0.1:8000/filtering/users/${row.memberid}`
        }
    }

    function search(userType){
        textString=document.getElementById("search").value;
        localStorage.setItem("search",textString);
        console.log(userType)
        if (textString.length==0){
        }
        else{
          window.location.href=`http://127.0.0.1:8000/filtering/${userType}/searching/${textString}/`;
        }
        }
    
