function Book(titre, auteur, isbn){
	this.titre = titre;
	this.auteur = auteur;
	this.isbn = isbn;
}


//permet d'utiliser la touche entrer
var input = document.getElementById("add");

input.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    addBook();
  }
}); 


//récupération des livres de l'api
function showBooks(){
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			var response = xhttp.responseText;
			console.log(response);
			//showjson(response);
		};
	}

	xhttp.open('GET', 'https://api.scorelooker.com/books', true);
	xhttp.send();
}

function addBook(){

	var titre = document.getElementById("titre").value;
	var auteur = document.getElementById("auteur").value;
	var isbn = document.getElementById("isbn").value;

	var book = new Book(titre, auteur, isbn);
	var testObject = { 'one': 1, 'two': 2, 'three': 3 };

	// Put the object into storage
	/*localStorage.setItem('testObject', JSON.stringify(testObject));

	// Retrieve the object from storage
	var retrievedObject = localStorage.getItem('testObject');

	console.log('retrievedObject: ', JSON.parse(retrievedObject));*/
}

showBooks();