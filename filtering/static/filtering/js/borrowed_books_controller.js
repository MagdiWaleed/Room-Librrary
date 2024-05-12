function goToSingleAuthor(author_name){
        window.location.href=`http://127.0.0.1:8000/filtering/authors/${author_name}`
    }

function goToSingleUser(id){
    window.location.href=`http://127.0.0.1:8000/filtering/users/${id}`
}


    
function goToSingleBook(id){
        window.location.href= `http://127.0.0.1:8000/books/${id}`
  }
  
  function search(category){
    searchText= category;
    sessionStorage.setItem("search",searchText);
    
    if (searchText.length==0){

    }
    else{
      
      window.location.href=`http://127.0.0.1:8000/filtering/searching/${searchText}`;
    }
  }