function Book(titre, auteur, isbn){
	this.titre = titre;
	this.auteur = auteur;
	this.ISBN = isbn;
}

//permet d'utiliser la touche entrer
var input = document.getElementById("add");

input.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    addBook();
  }
}); 


//récupération 
function getBooks(){
	var listbooks = JSON.parse(localStorage.getItem("listbooks"));
	for(var i in listbooks) { 
	    showBooks(listbooks[i]);
	}
}

//récupération des livres de l'api
function getListBooksByApi(){
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			var response = xhttp.responseText;
			var listbooks = JSON.parse(response);
			for(var i in listbooks){
				showBooks(listbooks[i]);
			}
			getBooks();
		};
	}

	xhttp.open('GET', 'https://api.scorelooker.com/books', true);
	xhttp.send();
}

function showBooks(book){

	var button = document.createElement("button");
	var text = document.createTextNode("\u00D7");
	button.className="close";
	button.appendChild(text);

	var foo = document.getElementById('tab').insertRow(-1);
	var cell1 = foo.insertCell(0);
	var cell2 = foo.insertCell(1);
	var cell3 = foo.insertCell(2);
	var cell4 = foo.insertCell(3);
	cell1.innerHTML = book.titre;
	cell2.innerHTML = book.auteur;
	cell3.innerHTML = book.ISBN;
	cell4.appendChild(button);

	button.addEventListener("click", removetr);
}


function addBook(){

	var titre = document.getElementById("titre").value;
	var auteur = document.getElementById("auteur").value;
	var isbn = document.getElementById("ISBN").value;
	
	if(titre=='' ||auteur=='' || isbn=='') {
		alert("Veuillez remplir tous les champs");	
	} 
	
	else {
		
		var listbooks = JSON.parse(localStorage.getItem("listbooks"));
		var next=true;
		
		for(var i = 0;i < listbooks.length;i++) {
			if(isbn == listbooks[i].ISBN){
				next=false;
				alert("ISBN déjà existant");
			}
		}
		if(next==true) {
			var book = new Book(titre, auteur, isbn);
			var listbooks = JSON.parse(localStorage.getItem("listbooks"));

			if(listbooks == null){
				localStorage.setItem("listbooks", JSON.stringify([book]));
			} else {
				listbooks.push(book);
				localStorage.setItem("listbooks", JSON.stringify(listbooks));
				
				document.getElementById('box').style.display='block';
				setTimeout(function() {
				document.getElementById('box').style.display='none';
				},4000);
			}

			showBooks(book);
		}
	}
}
		

//suppression d'une task
function removetr(){
	var isbn = this.parentElement.parentElement.children[2].innerHTML;

	var listbooks = JSON.parse(localStorage.getItem("listbooks"));
	console.log(listbooks);
	
	for(var i = 0;i < listbooks.length;i++){
		if(isbn == listbooks[i].ISBN){
			listbooks.splice(i, 1);
		}
	}
	localStorage.setItem("listbooks", JSON.stringify(listbooks));

	document.getElementById('boxDelete').style.display='block';
		setTimeout(function() {
		document.getElementById('boxDelete').style.display='none';
		 },4000);	

	
	var tr = this.parentElement.parentElement;
	tr.remove();
	
	
}

getListBooksByApi();




	

