class SingleBrrowedBookModel{

    constructor(book_id="#",book_name="#",book_description="#",author_id="#",author_name="#",about_author="#",category="#",brrowedDate="#",user_name="#",user_id="#"){
    this.book_id=book_id;
    this.book_name=book_name;
    this.author_name=author_name;
    this.author_id=author_id
    this.about_author=about_author;
    this.category=category;    
    this.brrowedDate-brrowedDate;
    this.user_name=user_name;
    this.user_id=user_id;
    }
  }
  
  
//   "<tr class='odd'>  <td><div onclick="goingToSingleBook()">how to win friends</div></td><td><div>self-develop</div></td><td><div onclick="goingToSingleAuthor()">Dial C</div></td><td><div onclick="goingToSingleUser()">Magdi </div></td><td><div>10/2/2022</div></td></tr>";

  function buildSingleRow(isEven,singleBrrowedBookData){
    backgroundStyle="odd";
    if(isEven){
        backgroundStyle="even";
    }
    singleRow="<tr class="+backgroundStyle+">"+"<td><div onclick=\"goingToSingleBook()\">"+singleBrrowedBookData.book_name+"</div></td>"+" <td> <div>"+singleBrrowedBookData.category+"</div></td><td><div onclick=\"goingToSingleAuthor()\">"+singleBrrowedBookData.author_name+" </div></td>"+"<td><div onclick=\"goingToSingleUser()\">"+singleBrrowedBookData.user_name+"</div></td>"+"<td><div>"+singleBrrowedBookData.brrowedDate+"</div></td></tr>";
    return singleRow;    
}

    function getTableRows(numberOfelements){
        
          
            tableRows="";
        for(i=0;i<numberOfelements;i++){
           m= new SingleBrrowedBookModel();
            m.book_id="0";
            m.book_name= "how to treat poeple well and make friends";
            m.book_demcription="itm a nice book";
            m.author_id=11;
            m.author_name="magdi waleed mohamed khalaf allah";
            m.category="action";
            m.about_author="he im good autoher";
            m.umer_id=0;
            m.user_name="ahmed alla"; 
            m.brrowedDate="2004/9/8";

            tableRows+=" "+buildSingleRow(i%2==0,m);
             
        }
        document.write(tableRows);
    }
   
function goingToSingleBook(){
    window.location.href='/admin/single_book/single_book.html';
}
function goingToSingleUser(){
    sessionStorage.setItem("single_user_author","users_table");  //user_table this is the value we are storing it into single_user_author storage to retrive it latly
    window.location.href="/admin/single_user_author/single_user_author.html";
}
function goingToSingleAuthor(){
    sessionStorage.setItem("single_user_author","authors_table");  //user_table this is the value we are storing it into single_user_author storage to retrive it latly
    window.location.href="/admin/single_user_author/single_user_author.html";
}

  
