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

function showBooks(){
	var listbooks = JSON.parse(localStorage.getItem("listbooks"));

	for(var i in listbooks) { 
	    var foo = document.getElementById('tab').insertRow(-1);
		var cell1 = foo.insertCell(0);
		var cell2 = foo.insertCell(1);
		var cell3 = foo.insertCell(2);
		cell1.innerHTML = listbooks[i].titre;
		cell2.innerHTML = listbooks[i].auteur;
		cell3.innerHTML = listbooks[i].isbn;
	}
	BooksByApi();
}

//récupération des livres de l'api
function BooksByApi(){
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			var response = xhttp.responseText;
			console.log(response);
			showBooksByApi(response);
		};
	}

	xhttp.open('GET', 'https://api.scorelooker.com/books', true);
	xhttp.send();
}

function showBooksByApi(response){
	var listbooks = JSON.parse(response);
	console.log(listbooks);
	for(var i in listbooks){
		var foo = document.getElementById('tab').insertRow(-1);
		var cell1 = foo.insertCell(0);
		var cell2 = foo.insertCell(1);
		var cell3 = foo.insertCell(2);
		cell1.innerHTML = listbooks[i].titre;
		cell2.innerHTML = listbooks[i].auteur;
		cell3.innerHTML = listbooks[i].ISBN;
	}
}

function addBook(){

	var titre = document.getElementById("titre").value;
	var auteur = document.getElementById("auteur").value;
	var isbn = document.getElementById("isbn").value;

	var book = new Book(titre, auteur, isbn);
	var listbooks = JSON.parse(localStorage.getItem("listbooks"));

	if(listbooks == null){
		localStorage.setItem("listbooks", JSON.stringify([book]));
	} else {
		listbooks.push(book);
		localStorage.setItem("listbooks", JSON.stringify(listbooks));
	}
}
showBooks();
//localStorage.clear();