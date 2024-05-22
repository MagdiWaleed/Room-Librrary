

  var inputField = document.getElementById('input_book_name');
var outputElement = document.getElementById('book_name');

var inputField2 = document.getElementById('input_author_name');
var outputElement2 = document.getElementById('author_name');

var inputField3 = document.getElementById('input_description');
var outputElement3 = document.getElementById('description');

var inputField4 = document.getElementById('input_about_author');
var outputElement4 = document.getElementById('about_author');

var inputField5 = document.getElementById('input_book_category');
var outputElement5 = document.getElementById('book_category');



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

var fileInput = document.getElementById('image');
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

document.addEventListener("DOMContentLoaded", function () {
  var form = document.querySelector("form");

  form.addEventListener("submit", function (event) {
      event.preventDefault();
      var formData = new FormData();
      formData.append('book_name', document.getElementById('input_book_name').value);
      formData.append('book_description', document.getElementById('input_description').value);
      formData.append('author_name', document.getElementById('input_author_name').value);
      formData.append('about_author', document.getElementById('input_about_author').value);
      formData.append('category', document.getElementById('input_book_category').value);
      formData.append('image', document.getElementById('image').files[0]);
      checkValue=document.getElementById('trending_check').checked? "True":"False";
      alert(checkValue);
      formData.append('trending_check',checkValue );

     
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
          if (xhr.readyState === XMLHttpRequest.DONE) {
              if (xhr.status === 200) {
                  alert(xhr.responseText);
                  window.location.href="/"
              } else {
                  alert('Error: ' + xhr.statusText);
                //   location.reload();
              }
          }
      };
      xhr.open("POST", form.action);
      xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
      xhr.send(formData);
  });
});
