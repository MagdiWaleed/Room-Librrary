

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





// function editThisBook() {
//   var currentUrl = window.location.href;
//   var pattern = /http:\/\/127\.0\.0\.1:8000\/books\/(\d+)\/$/;
//   var match = currentUrl.match(pattern);
//   if (match) {
//     var bookId = match[1];
//     var editUrl = `http://127.0.0.1:8000/books/edit-book/${bookId}/`;
//     window.location.href = editUrl;
//   } else {
//     console.error("Current URL does not match the expected pattern.");
//   }
// }
function savechanges(){
  singleBookData.book_name = inputField.value;
  singleBookData.author_name = inputField2.value;
  singleBookData.book_description = inputField3.value;
  singleBookData.about_author = inputField4.value;
  singleBookData.category = inputField5.value;
  sessionStorage.setItem("single_book", JSON.stringify(singleBookData));
}

function deleteThisBook() {
  var csrfToken = getCookie('csrftoken'); 
  var currentUrl = window.location.href;
  var pattern = /http:\/\/127\.0\.0\.1:8000\/books\/edit-book\/(\d+)\/$/;
  var match = currentUrl.match(pattern);
  if (match) {
    var bookId = match[1];
  }
 // "/books/delete-book/" + bookId // "/books/delete-book/" + singleBookData.book_id
}