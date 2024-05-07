
function addNewBook(){
    sessionStorage.setItem("single_book",JSON.stringify(new SingleBookModel()));
    window.location.href="/admin/add_new_book/add_new_book.html";
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
// var brrowedBook=" <div class='borrowed_books'><div style='position: relative;'> <img src='/references/images/book.jpg'alt='IMAGE-NOT-FOUND' class='book_image'/><h4>The Art Of</h4><p>By: Author Name</p></div ><h2 class='BORROWED'>BORROWED</h2></div>"



