
  
    function goToSingleBook(singleBookDataindex){
         console.log(singleBookDataindex);
         singleBookData=JSON.stringify(bookList[singleBookDataindex]); 4
    
         sessionStorage.setItem("single_book",singleBookData);
         if(singleBookDataindex%5==0){
           window.location.href="/admin/single_book/single_book.html?query=borrowed_book";
         }else{
           window.location.href="/admin/single_book/single_book.html";
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
  function getTrendingBooksList  (){
        bookCardsList=[]
        console.log("the starting of ajax");
        $.ajax({
          type: 'GET',
          url: "/main/get-books/",
          success: function(response){
              console.log(response);
              const data =response.books;
              console.log("this is the data", data);
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
    window.location.href="/admin/searching/searching.html";
  }
  
  
  