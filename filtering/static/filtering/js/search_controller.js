
function goToSingleBook(id){
  console.log(id)
     window.location.href= `http://127.0.0.1:8000/books/${id}`
}

bookShelves= document.getElementById("bookshelves")







 


/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/* <div class="borrowed_books">
<div style="position: relative;">
<img src="/references/images/book.jpg" alt="IMAGE-NOT-FOUND" class="book_image">
<h4>Book Title</h4>
<p>By: Author Name</p>
</div >
<h2 class="BORROWED">BORROWED</h2>
</div>
*/
function getTrendingBooksList  (){
    bookCardsList=[]
    $.ajax({
      type: 'GET',
      url: "get-books",
      success:async function(response){
          temp=''
          const data =await response.data;
          data.forEach(e => {
          console.log(e.img)
            temp+=`
              <div class="book_details" onclick="goToSingleBook(${e.id})">
                  <img src="/media/${e.img}" alt="IMAGE-NOT-FOUND" class="book_image" >
                  <h4>${e.title}</h4>
                  <p>By: ${e.author_name}</p>
              </div>`
          });
          bookShelves.innerHTML = temp 
      },
      error:function(error){
          console.log("error", error);
      }
  })

  
    
}

function getLatestBooksList  (){ 

}






function search(){
let textfieldText=document.getElementById("search").value;
sessionStorage.setItem("search",textfieldText);
// window.location.href=`http://127.0.0.1:8000/filtering/search/${textfieldText}`;
}

