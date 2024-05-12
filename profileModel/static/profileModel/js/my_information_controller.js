
function fetchData(){
    username = document.getElementById("name");
    mailhold = document.getElementById('email');
    passhold = document.getElementById('password');
    confpasshold = document.getElementById('confpassword');
    try{
        user= localStorage.getItem("user")
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
    user = JSON.parse(localStorage.getItem("user"))
    $.ajax({
        type: 'POST',
        url: "/profile/books-number",
        data: {
            username: user.username,
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
    localStorage.removeItem('user')
    window.location.href="http://127.0.0.1:8000/"
}

function delete_acc(){
    user = JSON.parse(localStorage.getItem("user"))
    $.ajax({
        type: 'POST',
        url: "/profile/delete-account",
        data: {
            user_id: user.id,
            csrfmiddlewaretoken: getCookie('csrftoken'),
        },
        success: function(response) {
            alert(response.data)
            localStorage.removeItem("user")
            window.location.href="http://127.0.0.1:8000/"
        },
        error: function(error) {
            console.log("error ", error);
        }
    });
}



function userMode(){
    user = JSON.parse(localStorage.getItem("user"))
    admin= {
    "username" : "admin",
    "password" : "admin",
    "email" : "admin@gmail.com",
    "isAdmin":"False",
    "id":"_",
        }
    localStorage.setItem("admin",JSON.stringify(user))
    localStorage.setItem("user",JSON.stringify(admin))
    localStorage.setItem("user_mode","enable")
    window.location.href="http://127.0.0.1:8000/"
}

function endUserMode(){
    adminData= localStorage.getItem("admin")
    localStorage.setItem("user",adminData)
    localStorage.removeItem("user_mode")
    window.location.href="http://127.0.0.1:8000/"
}

function saveChanges(){
    user = JSON.parse(localStorage.getItem("user"))
    id =user.id
    username =  document.getElementById("name")
    password =  document.getElementById('password')
    conf =  document.getElementById('confpassword')
    email =  document.getElementById('email')
    if((!email.value.includes('')) || (password.value != conf.value)){
        window.alert('wrong entrey');
    }
    else{
        var csrfToken = getCookie('csrftoken'); // Retrieve CSRF token from cookies
        $.ajax({
            type: 'POST',
            url: "/profile/update-user/",
            data: {
                id: id,
                username: username.value,
                password: password.value,
                email: email.value,
                csrfmiddlewaretoken: csrfToken
            },
            success: function(response) {
                
                if (response.data== "Username already exists."){
                    alert("Username already exists.")
                }
                else{
                    alert("success ", "changes have been saved");
                      user= response.data
                localStorage.setItem("user",JSON.stringify(user))
                window.location.href="http://127.0.0.1:8000/" 
                }
             
            },
            error: function(error) {
                console.log("error ", error);
            }
        });
    }
    
}



numMyBooks()
fetchData()