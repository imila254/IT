
// 1.3
function validateDate(yearStr, monthStr, dayStr){
    if (yearStr != parseInt(yearStr) || yearStr == "") {
        return false;
    }

    if (monthStr != parseInt(monthStr) || monthStr == "") {
        return false;
    }

    if (dayStr != parseInt(dayStr) || dayStr == "") {
        return false;
    }

    year = parseInt(yearStr);
    month = parseInt(monthStr)-1; // Sausis - 0
    day = parseInt(dayStr);

    if (month < 0 || month > 11) {
        return false;
    }

    if (year < 0) {
        return false;
    }

    if (day < 0) {
        return false;
    }

    var mSeconds = (new Date(year, month, day)).getTime(); 
    var objDate = new Date(); 
    objDate.setTime(mSeconds);

    if (objDate.getFullYear() !== year || 
    objDate.getMonth() !== month || 
    objDate.getDate() !== day) { 
    return false; 
    } 
    
    return true; 
}

function validateForm() {
    let name = document.forms["form"]["name"].value;
    let surname = document.forms["form"]["surname"].value;
    let age = document.forms["form"]["age"].value;

    var yearStr = document.getElementById('y').value; 
    var monthStr = document.getElementById('m').value; 
    var dayStr = document.getElementById('d').value; 

    // 1.1
    if (name == "") {
      alert("Įrašykite vardą");
      return false;
    }

    if (surname == "") {
        alert("Įrašykite pavardę");
        return false;
      }

    // 1.2
    if (!(parseInt(age) == age && age > 0) || age == "") {
        alert("Amžius turi būti teigiamas sveikas skaičius");
        return false;
    }

    if(!validateDate(yearStr, monthStr,dayStr)){
        alert("Data neteisinga");
        return false;
    }

    alert("Duomenys teisingi");
    return true;
   
}

// 4.
function sendToServer(){
    var forma = $('#myForm');
    $.ajax({
        url: 'https://jsonblob.com/api/jsonBlob/',
		data: JSON.stringify(serializeForm(forma)),
		dataType: 'json',
		contentType: 'application/json',
		error: function() {
			alert('Error sending');
		},
		success: function(data, status, xhr) {
			console.log(xhr.getResponseHeader('Location'));
			getFromServer(xhr.getResponseHeader('Location'));
            alert(status);
		},
		type: 'POST'
    })
}


function serializeForm(_$form) {
	var formArray = $("form").serializeArray();
    var returnObject = {};
    for (var i = 0; i < formArray.length; i++) {
        returnObject[formArray[i]['name']] = formArray[i]['value'];
    }
    return returnObject;
}


function getFromServer(formLocation) {
	$.ajax({
		url: formLocation.replace('http','https'),
		dataType: 'json',
		contentType: 'application/json',
		error: function() {
			alert('Error receiving');
		},
		success: function(data, status, xhr) {
			console.log(data);
			createTable(data);
		},
		type: 'GET'
	});
}

function createTable(formObject) {
	var table = document.createElement("TABLE");
	var fields = Object.keys(formObject);
	for (var i = 0; i < fields.length; i++) {
            row = table.insertRow(-1);
			var cell = row.insertCell(-1);
			cell.innerHTML = fields[i];
			cell = row.insertCell(-1);
			cell.innerHTML = formObject[fields[i]];
	}
	var tableDiv = document.getElementById("duomenuLentele");
    tableDiv.innerHTML = "";
	tableDiv.appendChild(table);
}

$(document).ready(function() {
     
    // 2.
    $("#display").click(function(){
        var radioValueV = $("input[name='lytis-v']:checked").val();
        var radioValueM = $("input[name='lytis-m']:checked").val();
        if(radioValueV == "V"){
            $("nav").addClass("pavadinimas");
            $("h1").show();
            $("#checked-v").prop('checked', false);
        }
        
        else if (radioValueM == "M"){
            $("h1").hide();
            $("nav").show();
            $("#checked-m").prop('checked', false);
        }
      
    });

    // 3.1
    $("#paragrafas").click(function(){
        $("*p").text("PASIKEITES TEKSTAS");
    });

    // 3.2
    $("#atributas").click(function(){
        $("h2").attr('style','background-color:black;color:white');
    });

    // 3.3
    $("#delete").click(function(){
        var nr = $("input[name='skaicius']").val();
        $("*p").eq(nr-1).remove();
    });

    // 3.4
    $("#add").click(function(){
        var vardas = $("input[name='name']").val();
        var pavarde = $("input[name='surname']").val();
        $("p").last().append(vardas, pavarde);
    });

    
 });


/*
"C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security  --user-data-dir=~/chromeTemp
*/ 