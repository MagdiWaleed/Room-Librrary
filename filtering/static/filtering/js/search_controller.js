

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
// function getTheBooks (){
//     searchText = document.getElementById("search").value;
//     window.location.href=`http://127.0.0.1:8000/filtering/searching/${searchText}`;
//     bookCardsList=[]
//     $.ajax({
//       type: 'GET',
//       url: `searching-about/${searchText}/`,
//       success:async function(response){
//           temp=''
//           const data =await response.data;
//           data.forEach(e => {
//           console.log(e.img)
//             temp+=`
//               <div class="book_details" onclick="goToSingleBook(${e.id})">
//                   <img src="/media/${e.img}" alt="IMAGE-NOT-FOUND" class="book_image" >
//                   <h4>${e.title}</h4>
//                   <p>By: ${e.author_name}</p>
//               </div>`
//           });
//           bookShelves.innerHTML = temp 
//       },
//       error:function(error){
//           console.log("error", error);
//       }
//   })
// 
//   
//     
// }



function getTheTextForSearching(){
    try{
       storedDataString =localStorage.getItem("search");
       console.log(storedDataString);
    }catch(error){
        console.log(error);
    }
    document.getElementById("search").value=storedDataString;
  }


function search(){
textString=document.getElementById("search").value;
localStorage.setItem("search",textString);

if (textString.length==0){
}
else{
  window.location.href=`http://127.0.0.1:8000/filtering/searching/${textString}`;
}
}

getTheTextForSearching()
