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



function signpress(){
    
    username = document.getElementById('user');
    password = document.getElementById('pass');
    conf = document.getElementById('confpass');
    email = document.getElementById('mail');
    isAdmin = document.getElementById('check');
    if((!email.value.includes('')) || (password.value != conf.value)){
        window.alert('wrong entrey');
    }
    else{
        var csrfToken = getCookie('csrftoken'); // Retrieve CSRF token from cookies
        $.ajax({
            type: 'POST',
            url: "/profile/register-new-user/",
            data: {
                username: username.value,
                password: password.value,
                email: email.value,
                isAdmin: isAdmin.checked,
                csrfmiddlewaretoken: csrfToken
            },
            success: function(response) {
                console.log("success ", response.data);
                user= response.data
                sessionStorage.setItem("user",JSON.stringify(user))
                window.location.href="http://127.0.0.1:8000/"
            },
            error: function(error) {
                console.log("error ", error);
            }
        });
    }
    
}