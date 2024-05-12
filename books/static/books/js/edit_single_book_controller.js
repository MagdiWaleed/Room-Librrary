
function fetchData(){
    
    try{
     parameters=new URLSearchParams(window.location.search);
     query= parameters.get('query');
    }
    catch(error){
      console.log(error);
    }
    try{
      stringSingleBookData=localStorage.getItem("single_book");
      singleBookData=JSON.parse(stringSingleBookData);
    }catch(error){
      console.log(error);
      singleBookData= new SingleBookModel();
    }
   
    
    if (query=="singleBook"){
      document.getElementById('book_name').innerHTML=singleBookData.book_name;
      document.getElementById('author_name').innerHTML=singleBookData.author_name;
      document.getElementById('description').innerHTML=singleBookData.book_description;
      document.getElementById('about_author').innerHTML=singleBookData.about_author;
      document.getElementById('book_category').innerHTML=singleBookData.category;
      if(singleBookData.image=="#"){
          
          document.getElementById("book_image").src='/references/images/default-book-cover.jpg';
          }
          else{
              document.getElementById("book_image").src=singleBookData.image;
          }
      
      document.getElementById('input_book_name').value=singleBookData.book_name;
      document.getElementById('input_author_name').value=singleBookData.author_name;
      document.getElementById('input_description').value=singleBookData.book_description;
      document.getElementById('input_about_author').value=singleBookData.about_author;
      document.getElementById('input_book_category').value=singleBookData.category;
      document.getElementById('delete_button').style.display="inline-block";
      document.getElementById('done_button').innerText="Save Changes";
      
      
      }
      else{
          document.getElementById('book_name').innerHTML="";
          document.getElementById('author_name').innerHTML="";
          document.getElementById('description').innerHTML="";
          document.getElementById('about_author').innerHTML="";
          document.getElementById('book_category').innerHTML="";
          //////////////////////////
          document.getElementById('input_book_name').value="";
          document.getElementById('input_author_name').value="";
          document.getElementById('input_description').value="";
          document.getElementById('input_about_author').value="";
          document.getElementById('input_book_category').value="";
      }
  }


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

function addNewBook() {
  book_name = document.getElementById('book_name').innerHTML
  author_name = document.getElementById('author_name').innerHTML
  description = document.getElementById('description').innerHTML
  about_author = document.getElementById('about_author').innerHTML
  book_category = document.getElementById('book_category').innerHTML
  var book_type = document.querySelector('input[name="book_type"]:checked').value;
  var csrfToken = getCookie('csrftoken'); // Retrieve CSRF token from cookies
  $.ajax({
      type: 'POST',
      url: "add-new-book",
      data: {
        book_name : book_name,
        author_name : author_name,
        description : description,
        about_author : about_author,
        book_category : book_category,
        book_type : book_type,
          csrfmiddlewaretoken: csrfToken,
      },
      success: function(response) {
         if(response.data=="hase been created"){
          alert(book_name+" has been created")
         }
      },
      error: function(error) {
          console.log("error ", error);
      }
  });
}

function editThisBook(id) {
    window.location.href= 'http://127.0.0.1:8000/books/edit-book/${id}'
}