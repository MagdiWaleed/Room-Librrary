function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }
  

  function fetch_data(){
    $.ajax({
      type: 'GET',
      url: "single-book-user-id",
      success:function(response){
        data= response.data
        localStorage.setItem("book_id",data.book_id),
        user=JSON.parse(localStorage.getItem("user"))
        if(user.isAdmin=="True"){
            document.getElementById("borrowed_unborrowed").innerHTML=`
            <div style="display: flex; justify-content: right; ">
            <button class="normal_button edit_button" style="width: 200px; margin-top: 20px;" onclick="editThisBook(${data.book_id})">Edit This Book</button>
            </div>` 
        }else{
            if(data.username==user.username){
                
                document.getElementById("borrowed_unborrowed").innerHTML=`
                <div style="display: flex; justify-content: right; ">
                <button class="normal_button edit_button" style="width: 200px; margin-top: 20px;" onclick="unborrowed_book()">Unborrowed This Book</button>
                </div>` 
            }else{
                document.getElementById("borrowed_unborrowed").innerHTML=`
                <div style="display: flex; justify-content: right; ">
                <button class="normal_button edit_button" style="width: 200px; margin-top: 20px;" onclick="borrowed_book()">Borrowed This Book</button>
                </div>`;
                }
        }
    },
      error:function(error){
          console.log("error", error);

      }
  })
}


function borrowed_book(){
    user= JSON.parse(localStorage.getItem("user"))
    book_id= localStorage.getItem("book_id")

    var csrfToken = getCookie('csrftoken'); // Retrieve CSRF token from cookies
    $.ajax({
        type: 'POST',
        url: "/profile/borrowed-book",
        data: {
          username : user.username,
          book_id : book_id,
          csrfmiddlewaretoken: csrfToken,
        },
        success: function(response) {
          alert("you have borrowed this book","have fun")
          document.getElementById("borrowed_unborrowed").innerHTML=`
          <div style="display: flex; justify-content: right; ">
          <button class="normal_button edit_button" style="width: 200px; margin-top: 20px;" onclick="unborrowed_book()">Unborrowed This Book</button>
          </div>` ;
        },
        error: function(error) {
            console.log("error ", error);
        }
    });
}
function unborrowed_book(){
    book_id= localStorage.getItem("book_id")
    var csrfToken = getCookie('csrftoken'); // Retrieve CSRF token from cookies
    $.ajax({
        type: 'POST',
        url: "/profile/unborrowed-book",
        data: {
          book_id : book_id,
          csrfmiddlewaretoken: csrfToken,
        },
        success: function(response) {
          console.log(response.data)
          document.getElementById("borrowed_unborrowed").innerHTML=`
          <div style="display: flex; justify-content: right; ">
          <button class="normal_button edit_button" style="width: 200px; margin-top: 20px;" onclick="borrowed_book()">Borrowed This Book</button>
          </div>`;
        },
        error: function(error) {
            console.log("error ", error);
        }
    });
}

// function action(book){
//     if(book.user.id==user.id){
//         borrowed_book(book.id)
//     }else{

//     }
// }


fetch_data()

function editThisBook(id) {
    window.location.href = `http://127.0.0.1:8000/books/edit-book/${id}`;
  }