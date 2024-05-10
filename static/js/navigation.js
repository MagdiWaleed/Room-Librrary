function navigateToPage(url){
    window.location.href=url;
}
  
function goToSingleBook(id){
    user= sessionStorage.getItem("user")
    if(user){
        sessionStorage.setItem("book",id)
        window.location.href= `http://127.0.0.1:8000/books/${id}`
    }  else{
        showpopup()
    }
   }
  
function showpopup(){
   user = JSON.parse(sessionStorage.getItem('user'))
   if(user){
    window.location.href="http://127.0.0.1:8000/profile/my_information/"
   }else{
    let pop_up = document.getElementById("popup");
    pop_up.classList.add("open-popup");
   }
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

function login() {
    var username = document.getElementById('user').value;
    var password = document.getElementById('pass').value;
    var isAdmin = document.getElementById('check').checked;
    var csrfToken = getCookie('csrftoken'); // Retrieve CSRF token from cookies
    $.ajax({
        type: 'POST',
        url: "/profile/login/",
        data: {
            username: username,
            password: password,
            isAdmin: isAdmin,
            csrfmiddlewaretoken: csrfToken
        },
        success: function(response) {
            console.log("success ", response.data);
            if(response.data== "no member"){
                alert("username or password is wrong")
            }else{
                console.log(response.data)
                sessionStorage.setItem("user",JSON.stringify(response.data))
                window.location.href="http://127.0.0.1:8000/";
            }
        },
        error: function(error) {
            console.log("error ", error);
        }
    });
}

function closepop(){
    console.log('wrong');
    let pop_up = document.getElementById("popup");
    pop_up.classList.remove("open-popup");
}

function goToSignup(){
    window.location.href="http://127.0.0.1:8000/profile/signup"
}