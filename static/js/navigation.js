function navigateToPage(url){
    window.location.href=url;
}
  
function goToSingleBook(id){
        window.location.href= `http://127.0.0.1:8000/books/${id}`
  }
  
function showpopup(){
   user = JSON.parse(sessionStorage.getItem('user'))
   if(user){
    
   }else{
    let pop_up = document.getElementById("popup");
    pop_up.classList.add("open-popup");
   }
}
function login(){
       
    username = document.getElementById('user');
    password = document.getElementById('pass');
    isAdmin = document.getElementById('check');
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


function closepop(){
    console.log('wrong');
    let pop_up = document.getElementById("popup");
    pop_up.classList.remove("open-popup");
}
