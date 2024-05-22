function goToSingleAuthor(author_name){
        window.location.href=`/filtering/authors/${author_name}`
    }

function goToSingleUser(id){
    window.location.href=`/filtering/users/${id}`
}


    
function goToSingleBook(id){
        window.location.href= `/books/${id}`
  }
  
  function search(category){
    searchText= category;
    localStorage.setItem("search",searchText);
    
    if (searchText.length==0){

    }
    else{
      
      window.location.href=`/filtering/searching/${searchText}`;
    }
  }