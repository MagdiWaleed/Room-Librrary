

  function showBorrowedBookDetails(id){
    user =JSON.parse(sessionStorage.getItem("user"))
    if(user.isAdmin=="True"){
      window.location.href= `http://127.0.0.1:8000/books/${id}`
    }else{
      alert("this book is borrowed by someone")
    }
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
          success: function(response){
              document.getElementsByClassName("loading_container")[0].style.display="none"
              document.getElementsByClassName("loading_container")[1].style.display="none"
              data = response.trending;
              console.log(data)
              data.forEach(e => {
              console.log(e.img)
              console.log(e.isborrowed)
              if (e.isborrowed=="no"){  
              document.getElementById("trending").innerHTML+=`
                  <div class="book_details" onclick="goToSingleBook(${e.id})">
                      <img src="/media/${e.img}" alt="IMAGE-NOT-FOUND" class="book_image" >
                      <h4>${e.title}</h4>
                      <p>By: ${e.author_name}</p>
                  </div>`
                }
              else{
                document.getElementById("trending").innerHTML+=`
                <div class="borrowed_books" onclick="showBorrowedBookDetails(${e.id})">
                <div style="position: relative;">
                <img src="/media/${e.img}" alt="IMAGE-NOT-FOUND" class="book_image">
               <h4>${e.title}</h4>
               <p>By: ${e.author_name}</p>
              </div >
                <h2 class="BORROWED">BORROWED</h2>
              </div>
              `
              }
              });
              data = response.latest;
              console.log(data)

              data.forEach(e => {
              console.log(e.img)
              if (e.isborrowed=="no"){  
                document.getElementById("latest").innerHTML+=`
                    <div class="book_details" onclick="goToSingleBook(${e.id})">
                        <img src="/media/${e.img}" alt="IMAGE-NOT-FOUND" class="book_image" >
                        <h4>${e.title}</h4>
                        <p>By: ${e.author_name}</p>
                    </div>`
                  }
                else{
                  document.getElementById("latest").innerHTML+=`
                  <div class="borrowed_books" onclick="showBorrowedBookDetails(${e.id})">
                  <div style="position: relative;">
                  <img src="/media/${e.img}" alt="IMAGE-NOT-FOUND" class="book_image">
                 <h4>${e.title}</h4>
                 <p>By: ${e.author_name}</p>
                </div >
                  <h2 class="BORROWED">BORROWED</h2>
                </div>`
                }
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
    
    if (searchText.length==0){

    }
    else{
      
      window.location.href=`http://127.0.0.1:8000/filtering/searching/${searchText}`;
    }
  }
  

  getBooksList()