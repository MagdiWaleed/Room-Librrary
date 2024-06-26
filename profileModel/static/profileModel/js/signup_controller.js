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
    if((username.value ==="" || !email.value.includes('@')) || (password.value != conf.value)|| (password.value.length <8)){
        if (username.value === "")
            window.alert('invalid userman');
        else if((password.value != conf.value))
            window.alert('Password dont equal Confim Password');
        else if (password.value.length <8)
            window.alert('Password most be more than 8');
        else    
            window.alert('invalid Email');

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
                
                if (response.data== "Username already exists."){
                    alert("Username already exists.")
                }
                else{
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