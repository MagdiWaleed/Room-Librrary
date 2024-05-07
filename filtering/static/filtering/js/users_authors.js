
function goToSingleMember(row){
    if (row.id=="#"){
        document.location.href=`http://127.0.0.1:8000/filtering/authors/${row.membername}`
        }
    else{
        document.location.href=`http://127.0.0.1:8000/filtering/users/${row.memberid}`
        }
    }