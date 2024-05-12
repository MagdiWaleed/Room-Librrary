
function fetchData(){
    username = document.getElementById("name");
    mailhold = document.getElementById('email');
    passhold = document.getElementById('password');
    confpasshold = document.getElementById('confpassword');
    try{
        user= sessionStorage.getItem("user")
        user=JSON.parse(user)
        username.placeholder = user.username
        mailhold.placeholder = user.email
        passhold.placeholder = user.password
        confpasshold.placeholder = user.password
    }catch(e){
        console.log(e)
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



function numMyBooks(){
    user = JSON.parse(sessionStorage.getItem("user"))
    $.ajax({
        type: 'POST',
        url: "/profile/books-number",
        data: {
            id: user.id,
            csrfmiddlewaretoken: getCookie('csrftoken'),
        },
        success: function(response) {
           try{
             document.getElementById("numMyBooks").innerHTML=response.data
            }catch(e){
                console.log(e)
            }
        },
        error: function(error) {
            console.log("error ", error);
        }
    });
}

function logout(){
    console.log("")
    sessionStorage.removeItem('user')
    window.location.href="http://127.0.0.1:8000/"
}

function delete_acc(){
    user = JSON.parse(sessionStorage.getItem("user"))
    $.ajax({
        type: 'POST',
        url: "/profile/delete-account",
        data: {
            user_id: user.id,
            csrfmiddlewaretoken: getCookie('csrftoken'),
        },
        success: function(response) {
            alert(response.data)
            sessionStorage.removeItem("user")
            window.location.href="http://127.0.0.1:8000/"
        },
        error: function(error) {
            console.log("error ", error);
        }
    });
}

function userMode(){
    user = JSON.parse(sessionStorage.getItem("user"))
    admin= {
    "username" : "admin",
    "password" : "admin",
    "email" : "admin@gmail.com",
    "isAdmin":"False",
    "id":"#",
        }
    sessionStorage.setItem("admin",JSON.stringify(user))
    sessionStorage.setItem("user",JSON.stringify(admin))
    sessionStorage.setItem("user_mode","enable")
    window.location.href="http://127.0.0.1:8000/"
}

function endUserMode(){
    adminData= sessionStorage.getItem("admin")
    sessionStorage.setItem("user",adminData)
    alert(adminData)
    sessionStorage.removeItem("user_mode")
    window.location.href="http://127.0.0.1:8000/"
}

numMyBooks()
fetchData()