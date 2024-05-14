
var inputField = document.getElementById('input_book_name');
var outputElement = document.getElementById('book_name');
inputField.value = outputElement.innerHTML;

var inputField2 = document.getElementById('input_author_name');
var outputElement2 = document.getElementById('author_name');
inputField2.value = outputElement2.innerHTML;

var inputField3 = document.getElementById('input_description');
var outputElement3 = document.getElementById('description');
inputField3.value = outputElement3.innerHTML;

var inputField4 = document.getElementById('input_about_author');
var outputElement4 = document.getElementById('about_author');
inputField4.value = outputElement4.innerHTML;

var inputField5 = document.getElementById('input_book_category');
var outputElement5 = document.getElementById('book_category');
inputField5.value = outputElement5.innerHTML;



inputField.addEventListener('input', function() {
    outputElement.innerText = inputField.value;
});

inputField2.addEventListener('input',function(){
    outputElement2.innerText=inputField2.value;
});

inputField3.addEventListener('input',function(){
    outputElement3.innerText=inputField3.value;
});

inputField4.addEventListener('input',function(){
    outputElement4.innerText=inputField4.value;
});

inputField5.addEventListener('input',function(){
    outputElement5.innerText=inputField5.value;
});

var fileInput = document.getElementById('image_input');
var image = document.getElementById('book_image');

fileInput.addEventListener('change', function(event) {
  var selectedFile = event.target.files[0];

  if (selectedFile) {

    var reader = new FileReader();
    reader.readAsDataURL(selectedFile);

    reader.onload = function() {
      image.src = reader.result;
    };
  }
});

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


function savechanges(){
  var csrftoken = getCookie('csrftoken');
  var book_id = JSON.parse(localStorage.getItem("book"))
  var url = "http://127.0.0.1:8000/books/edited-book/" 
  var fileInput = document.getElementById('image_input').files[0];
 var formData = new FormData()
  formData.append("book_name",inputField.value)
  formData.append("author_name",inputField2.value)
  formData.append("book_description",inputField3.value)
  formData.append("about_author",inputField4.value)
  formData.append("book_category",inputField5.value)
  formData.append("about_author",inputField4.value)
  formData.append("book_id",book_id)
  formData.append("image",fileInput)


  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
              alert(xhr.responseText);
              window.location.href="http://127.0.0.1:8000/"
              
              
          } else {
              alert('Error: ' + xhr.statusText);
              // location.reload();
          }
      }
  };
  xhr.open("POST", url);
  xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
  xhr.send(formData);
}
function deleteThisBook() {
  var csrftoken = getCookie('csrftoken');
  var book_id = localStorage.getItem("book_id");
  
  var url = "http://127.0.0.1:8000/books/delete-book/"
  $.ajax({
    type: "POST",
    url: url,
    data: {
      book_id : book_id,
      csrfmiddlewaretoken: csrftoken,
    },
    success: function(response) {
      alert(response.status)
      window.location.href = "http://127.0.0.1:8000"
    },
    error: function(error) {
        console.log("error ", error);
    }
  });
}