
  url= window.location.href
    function goToSingleBook(id){
      console.log(id)
         window.location.href= `http://127.0.0.1:8000/books/${id}`
  }
  
  
  
  
  
  
  
     
  
  
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
 
   function getBooksList(){
        bookCardsList=[]
        $.ajax({
          type: 'GET',
          url: "books/get-books",
          success:async function(response){
              
              data =await response.trending;
              console.log(data)
              data.forEach(e => {
              console.log(e.img)
                document.getElementById("trending").innerHTML+=`
                  <div class="book_details" onclick="goToSingleBook(${e.id})">
                      <img src="/media/${e.img}" alt="IMAGE-NOT-FOUND" class="book_image" >
                      <h4>${e.title}</h4>
                      <p>By: ${e.author_name}</p>
                  </div>`
              });
              data =await response.latest;
              console.log(data)

              data.forEach(e => {
              console.log(e.img)
                document.getElementById("latest").innerHTML+=`
                  <div class="book_details" onclick="goToSingleBook(${e.id})">
                      <img src="/media/${e.img}" alt="IMAGE-NOT-FOUND" class="book_image" >
                      <h4>${e.title}</h4>
                      <p>By: ${e.author_name}</p>
                  </div>`
              });
              
          },
          error:function(error){
              console.log("error", error);
          }
      })

      
        
  }
  


 
  
  
  
  function search(){
    searchText= document.getElementById("search").value;
    sessionStorage.setItem("search",searchText);
    window.location.href=`http://127.0.0.1:8000/filtering/searching/${searchText}`;
  }
  

  getBooksList()