
function goToSingleMember(row){
    if (row.memberid=="#"){
        window.location.href=`http://127.0.0.1:8000/filtering/authors/${row.membername}`
        }
    else{
        window.location.href=`http://127.0.0.1:8000/filtering/users/${row.memberid}`
        }
    }


    
