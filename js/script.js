var bookmarkName = document.getElementById('bookmarkName') ;
var bookmarkURL = document.getElementById('bookmarkURL') ; 
var submitBtn = document.getElementById('submitBtn') ; 
var tableContent = document.getElementById("tableContent") ; 
var boxInfo = document.querySelector('.box-info');
var closeBtn = document.getElementById('closeBtn');
var bookmarks = JSON.parse(localStorage.getItem('bookmarksList'))|| [] ; 
displayBookmarks()  ;

submitBtn.addEventListener('click', function() {
  var name = bookmarkName.value.trim() ; 
  var url  = bookmarkURL.value.trim() ; 

  if(validateURL(url)) {
    var newBookmark = {
    name : name ,   
    url : url 
  }
  bookmarks.push(newBookmark) ; 
  localStorage.setItem('bookmarksList' , JSON.stringify(bookmarks)) ;
  displayBookmarks() ; 
    bookmarkName.value = '';
    bookmarkURL.value = '';
    bookmarkName.classList.remove('is-valid', 'is-invalid');
    bookmarkURL.classList.remove('is-valid', 'is-invalid');
    boxInfo.classList.add('d-none');
  }
  else {
    boxInfo.classList.remove('d-none');
  }
})

bookmarkName.addEventListener('input' , function() {
  if(bookmarkName.value.trim().length>=3 ) {
    bookmarkName.classList.add('is-valid') ;
    bookmarkName.classList.remove('is-invalid') ; 
  }
  else {
    bookmarkName.classList.add('is-invalid');
    bookmarkName.classList.remove('is-valid');
  }
})
closeBtn.addEventListener('click', function () {
  boxInfo.classList.add('d-none');
});
bookmarkURL.addEventListener('input', function () {
  if (validateURL(bookmarkURL.value.trim())) {
    bookmarkURL.classList.add('is-valid');
    bookmarkURL.classList.remove('is-invalid');
    boxInfo.classList.add('d-none');
  } else {
    bookmarkURL.classList.add('is-invalid');
    bookmarkURL.classList.remove('is-valid');
  }
});

function displayBookmarks() {
  tableContent.innerHTML = "" ; 
  for (let i = 0 ; i<bookmarks.length ; i++) {
    let  bookmark = bookmarks[i] ;
    var row = document.createElement('tr') ; 
    row.innerHTML =` 
    <td>${i+1}</td> 
    <td>${bookmark.name}</td>
    <td><button class="btn btn-success py-2 px-3 btn-sm visit-btn" data-url="${bookmarks[i].url}">
        <i class="fa-solid fa-eye pe-1"></i> Visit</button></td>
    <td><button class="btn btn-danger py-2 px-3 btn-sm delete-btn" data-index="${i}">
        <i class="fa-solid fa-trash pe-1"></i> Delete</button></td>
    `; 
    tableContent.appendChild(row) ; 
  }
  var visitBtns = document.querySelectorAll('.visit-btn') ; 
  var deleteBtns = document.querySelectorAll('.delete-btn');  

  for (let  j = 0 ; j <visitBtns.length ; j++) {
    visitBtns[j].addEventListener('click',visitSite) ; 
    deleteBtns[j].addEventListener('click', deleteBookmark) ;
  }
}

function visitSite(event) {
  var url = event.target.getAttribute('data-url') 
  window.open(url, '_blank'); 
}
function deleteBookmark(event) {
  var index = event.target.getAttribute('data-index') ;
  bookmarks.splice(index , 1) ; 
  localStorage.setItem('bookmarksList', JSON.stringify(bookmarks));
  displayBookmarks();
} 

function validateURL(url) {
  var urlPattern = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i  ; 
  return urlPattern.test(url) ; 
}