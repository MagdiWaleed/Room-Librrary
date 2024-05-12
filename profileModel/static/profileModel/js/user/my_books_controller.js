
function fetchData(){
    numMyBooks()
    getMyBooks()
}

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



function numMyBooks(){
    user = JSON.parse(sessionStorage.getItem("user"))
    $.ajax({
        type: 'POST',
        url: "/profile/books-number",
        data: {
            username: user.username,
            csrfmiddlewaretoken: getCookie('csrftoken'),
        },
        success: function(response) {
            document.getElementById("numMyBooks").innerHTML=response.data
            
        },
        error: function(error) {
            console.log("error ", error);
        }
    });
}

function getMyBooks(){
    user = JSON.parse(sessionStorage.getItem("user"))
    $.ajax({
        type: 'POST',
        url: "/profile/my-books-data",
        data: {
            username: user.username,
            csrfmiddlewaretoken: getCookie('csrftoken'),
        },
        success: function(response) {
            document.getElementsByClassName("loading_container")[0].style.display="none"

            data = response.data
            console.log(response.data)
            data.forEach(e => {
                console.log(e.img)
                  document.getElementById("bookshelves").innerHTML+=`
                    <div class="book_details" onclick="goToSingleBook(${e.id})">
                        <img src="/media/${e.img}" alt="IMAGE-NOT-FOUND" class="book_image" >
                        <h4>${e.title}</h4>
                        <p>By: ${e.author_name}</p>
                    </div>`
                });
        },
        error: function(error) {
            console.log("error ", error);
        }
    });
}


fetchData()