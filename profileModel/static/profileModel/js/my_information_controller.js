
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
            document.getElementById("numMyBooks").innerHTML=response.data
            
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



numMyBooks()
fetchData()