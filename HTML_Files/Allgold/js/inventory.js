
function allInventory()
{
alert("findInventory");
	var url = "inventoryREST.php";
	var method = "action=GET";
	url += "?"+method;

	var request = new XMLHttpRequest();
	request.open("GET", url);
	request.onload = function()
	{
		if(request.status == 200)
		{
			var inventorylist = request.responseText;


                //getTable header for data
				var url2 = "includes/inventorytable.json";
	            var request2 = new XMLHttpRequest();
	            request2.open("GET", url2);
	            request2.onload = function()
	            {
		           if(request2.status == 200)
		           {
			           var inventorytable = request2.responseText;
			           listStation(inventorylist,inventorytable);
		            }
	            };
	            request2.send(null);

			
		}
	};
	request.send(null);
}

function findInventory()
{
alert("findInventory");
	var url = "inventoryREST.php";
	var method = "action=GET";
	var descVal = document.getElementById("stationID").value;
	var descName = document.getElementById("stationID").name;
	url += "?"+method+"&"+descName+"="+descVal;

	var request = new XMLHttpRequest();
	request.open("GET", url);
	request.onload = function()
	{
		if(request.status == 200)
		{
			var Inventorylist = request.responseText;

                //getTable header for data
				var url2 = "includes/inventorytable.json";
	            var request2 = new XMLHttpRequest();
	            request2.open("GET", url2);
	            request2.onload = function()
	            {
		           if(request2.status == 200)
		           {
			           var inventorytable = request2.responseText;
			           listInventoryForSeller(Inventorylist,inventorytable);
		            }
	            };
	            request2.send(null);

			
		}
	};
	request.send(null);
}

function listInventory(inventorylist, getinventorytable)
{alert(inventorylist+getinventorytable);
	var list = document.getElementById("list");
	var inventory = JSON.parse(inventorylist);
	var inventorytable = JSON.parse(getinventorytable);


	var table = document.createElement("table");
	table.setAttribute("class", "test");

    //table head
    var tablehead = document.createElement("thead");
    var tableRow = document.createElement("tr");

    //wenn die tabllenid nicht angzeigt werden soll, muss h auf 1 gestetzt werden
    var tableattr = 1;
    for(var h = 0; h<tableattr; h++)
    {
    	var json = inventorytable[0]; //in this case only one object exitsts
    	var key = "td"+h;
    	var tableval = json[key]; 
    	if(tableval != undefined)
    	{
    		var tableCell = document.createElement("td");
    	    var cellContent = document.createTextNode(tableval);
    	    tableCell.appendChild(cellContent);
    	    tableRow.appendChild(tableCell);

    	    tableattr++; 
    	}
    }
    tablehead.appendChild(tableRow); alert("länge des tableheaders"+ tableattr);



    //table body
	var tablebody = document.createElement("tbody");


	for(var j = 0; j < inventory.length; j++)
	{
	    var mycurrentRow = document.createElement("tr");

	    for(var i = 0; i<tableattr; i++)
	    {
	    	var json = inventorytable[0];
	    	var jsonval = inventory[j];
	    	var key = "td" + i;
	    	var value = json[key];
	        var tableval = jsonval[value];
	        if(tableval != undefined)
	        {
	            var mycurrentCell = document.createElement("td");
		        var mycurrentText = document.createTextNode(tableval);
		        mycurrentCell.appendChild(mycurrentText);
		        mycurrentRow.appendChild(mycurrentCell);
	        }
	    }
        tablebody.appendChild(mycurrentRow);
    }
	


	table.appendChild(tablehead);
	table.appendChild(tablebody);
	list.appendChild(table);
}

function listInventoryForSeller(inventorylist, getinventorytable)
{alert(inventorylist+getinventorytable);
	var list = document.getElementById("list");
	var inventory = JSON.parse(inventorylist);
	var inventorytable = JSON.parse(getinventorytable);


	var table = document.createElement("table");
	table.setAttribute("class", "test");
	table.setAttribute("id", "SalesTable");

    //table head
    var tablehead = document.createElement("thead");
    var tableRow = document.createElement("tr");

    //wenn die tabllenid nicht angzeigt werden soll, muss h auf 1 gestetzt werden
    var tableattr = 1;
    for(var h = 0; h<tableattr; h++)
    {
    	var json = inventorytable[0]; //in this case only one object exitsts
    	var key = "td"+h;
    	var tableval = json[key]; 
    	if(tableval != undefined)
    	{
    		if(key =="td1"||key=="td3")
    		{
	    		var tableCell = document.createElement("td");
	    	    var cellContent = document.createTextNode(tableval);
	    	    if (cellContent.nodeValue=="productID"){
	    	    	cellContent.nodeValue="Produkt";
	    	    }
	    	    if (cellContent.nodeValue=="currentAmount"){
	    	    	cellContent.nodeValue="Verfügbar";
	    	    }
	    	    tableCell.appendChild(cellContent);
	    	    tableRow.appendChild(tableCell);
	    	}

    	    tableattr++; 
    	}
    }
    //Heading for input column
    var tableCell= document.createElement("td");
    var cellContent = document.createTextNode("Anzahl verkauft");
    tableCell.appendChild(cellContent);
    tableRow.appendChild(tableCell);
    tablehead.appendChild(tableRow); alert("länge des tableheaders"+ tableattr);



    //table body
    //In den einzelnen Zellen werden ids entsprechend des Inhalts gesetzt, um damit REST Anfragen bauen zu können
    //Je Reihe: product[0-*]
	var tablebody = document.createElement("tbody");

	var productCounter=0;
	for(var j = 0; j < inventory.length; j++)
	{
	    var mycurrentRow = document.createElement("tr");


	    
	    for(var i = 0; i<tableattr; i++)
	    {
	    	var json = inventorytable[0];
	    	var jsonval = inventory[j];
	    	var key = "td" + i;
	    	var value = json[key];
	        var tableval = jsonval[value];
	        if (key=="td3"){
	        	var rowMaxValue = tableval
	        }
	        if(tableval != undefined&&(key =="td1"||key=="td3"))
	        {
	        	var mycurrentCell = document.createElement("td");
	            var mycurrentText = document.createTextNode(tableval);
	        	if (key=="td1"){
	        		var productFieldID = "product"+productCounter;
	        		mycurrentCell.setAttribute("id", productFieldID);
	        	}
	        	if (key=="td3"){
	        		var amountFieldID = "current"+productCounter;
	        		mycurrentCell.setAttribute("id", amountFieldID);
	        		productCounter++;
	        	}
	            
	            
		        if(key=="td1"){

		        	//Die Funktion liefert mir immer einen leeren String zurück, nach 3 stunden gebe ich auf
		        	// und mache das jetzt hardcoded über einen Switch-Case
		        	// Geth NICHT: mycurrentText.nodeValue=getNameByID(tableval);
		        	switch (tableval){
		        		case "1" : mycurrentText.nodeValue="Milch"; break;
		        		case "2" : mycurrentText.nodeValue="Emmentaler"; break;
		        		case "3" : mycurrentText.nodeValue="Gauda"; break;
		        		case "4" : mycurrentText.nodeValue="Joghurt 100g"; break;
		        		case "5" : mycurrentText.nodeValue="Quark"; break;
		        		case "6" : mycurrentText.nodeValue="Joghurt 500g"; break;
		        		case "7" : mycurrentText.nodeValue="Streichkaese"; break;
		        		case "8" : mycurrentText.nodeValue="Bergkaese"; break;
		        	}
		        }
		        mycurrentCell.appendChild(mycurrentText);
		        mycurrentRow.appendChild(mycurrentCell);

	        }
	    }
	    //Create input element to add to the table row
	    var amountID = "amount"+j;
		var myInputField = document.createElement("Input");
		myInputField.setAttribute("id", amountID);
		mycurrentRow.appendChild(myInputField);
        tablebody.appendChild(mycurrentRow);
    }
	


	table.appendChild(tablehead);
	table.appendChild(tablebody);
	list.appendChild(table);
}

function getInventoryTable()
{

	var url = "includes/inventorytable.json";
	var request = new XMLHttpRequest();
	alert(url);
	request.open("GET", url);
	request.onload = function()
	{
		if(request.status == 200)
		{
			var erg = request.responseText;
			return erg;
		}
	};
	request.send(null);
}

function updateInventory()
{
alert("updateInventory");
	var rowCount= (document.getElementById("SalesTable").rows.length)-1;
	for (var i= 0; i < rowCount; i++){
		var url= "inventoryREST.php";
		var method="action=PUT";
		var descName0= "productID";
		var descName1= "stationID";
		var descName2= "currentAmount";

		//Get the productID
		var product="product"+i;
		var descVal0= ProductnametoID(document.getElementById(product).innerText);

		//Get the stationID
		var descVal1=document.getElementById("stationID").value;

		//calculate the new amount
		var soldID ="amount"+i;
		var currentID="current" +i;
		var sold = document.getElementById(soldID).value;
		var current = document.getElementById(currentID).innerText;
		var descVal2= getDiff(sold,current);

		//Build URL
		url += "?"+method+"&"+descName0+"="+descVal0+"&"+descName1+"="+descVal1+"&"+descName2+"="+descVal2;

		alert(url);

		var request = new XMLHttpRequest();
		request.open("PUT", url);
		request.onload = function()
		{
			if(request.status == 200)
			{
				alert("Update done");
			}
		};
		request.send(null);	

	}
}

function getDiff($sold,$amount){
	var a= parseInt($amount);
	var b= parseInt($sold);
	var c = a-b;
	return c.toString(10);
}
//Das ist sehr hässlich und in der Praxis natürlich nicht möglich
//Habe keine Zeit mehr das anders zu machen
function ProductnametoID($name){
	switch ($name){
		case "Milch" : 			return "1"; break;
		case "Emmentaler" : 	return "2"; break;
		case "Gauda" : 			return "3"; break;
		case "Joghurt 100g" : 	return "4"; break;
		case "Quark" : 			return "5"; break;
		case "Joghurt 500g" :  	return "6"; break;
		case "Streichkaese" : 	return "7"; break;
		case "Bergkaese" : 		return "8"; break;
	}
}


//Logik für die Auffüllung

function findInventoryRefill()
{
alert("findInventoryRefill");
	var url = "inventoryREST.php";
	var method = "action=GET";
	var descVal = document.getElementById("stationID").value;
	var descName = document.getElementById("stationID").name;
	url += "?"+method+"&"+descName+"="+descVal;

	var request = new XMLHttpRequest();
	request.open("GET", url);
	request.onload = function()
	{
		if(request.status == 200)
		{
			var Inventorylist = request.responseText;

                //getTable header for data
				var url2 = "includes/inventorytable.json";
	            var request2 = new XMLHttpRequest();
	            request2.open("GET", url2);
	            request2.onload = function()
	            {
		           if(request2.status == 200)
		           {
			           var inventorytable = request2.responseText;
			           listInventoryForRefill(Inventorylist,inventorytable);
		            }
	            };
	            request2.send(null);

			
		}
	};
	request.send(null);
}

function listInventoryForRefill(inventorylist, getinventorytable)
{alert(inventorylist+getinventorytable);
	var list = document.getElementById("list");
	var inventory = JSON.parse(inventorylist);
	var inventorytable = JSON.parse(getinventorytable);


	var table = document.createElement("table");
	table.setAttribute("class", "test");
	table.setAttribute("id", "RefillTable");

    //table head
    var tablehead = document.createElement("thead");
    var tableRow = document.createElement("tr");

    //wenn die tabllenid nicht angzeigt werden soll, muss h auf 1 gestetzt werden
    var tableattr = 1;
    for(var h = 0; h<tableattr; h++)
    {
    	var json = inventorytable[0]; //in this case only one object exitsts
    	var key = "td"+h;
    	var tableval = json[key]; 
    	if(tableval != undefined)
    	{
    		if(key =="td1"||key=="td3")
    		{
	    		var tableCell = document.createElement("td");
	    	    var cellContent = document.createTextNode(tableval);
	    	    if (cellContent.nodeValue=="productID"){
	    	    	cellContent.nodeValue="Produkt";
	    	    }
	    	    if (cellContent.nodeValue=="currentAmount"){
	    	    	cellContent.nodeValue="Auf Lager";
	    	    }
	    	    tableCell.appendChild(cellContent);
	    	    tableRow.appendChild(tableCell);
	    	}

    	    tableattr++; 
    	}
    }
    //Heading for input column
    var tableCell= document.createElement("td");
    var cellContent = document.createTextNode("Anzahl nachgefüllt");
    tableCell.appendChild(cellContent);
    tableRow.appendChild(tableCell);
    tablehead.appendChild(tableRow); alert("länge des tableheaders"+ tableattr);



    //table body
    //In den einzelnen Zellen werden ids entsprechend des Inhalts gesetzt, um damit REST Anfragen bauen zu können
    //Je Reihe: product[0-*]
	var tablebody = document.createElement("tbody");

	var productCounter=0;
	for(var j = 0; j < inventory.length; j++)
	{
	    var mycurrentRow = document.createElement("tr");


	    
	    for(var i = 0; i<tableattr; i++)
	    {
	    	var json = inventorytable[0];
	    	var jsonval = inventory[j];
	    	var key = "td" + i;
	    	var value = json[key];
	        var tableval = jsonval[value];
	        if (key=="td3"){
	        	var rowMaxValue = tableval
	        }
	        if(tableval != undefined&&(key =="td1"||key=="td3"))
	        {
	        	var mycurrentCell = document.createElement("td");
	            var mycurrentText = document.createTextNode(tableval);
	        	if (key=="td1"){
	        		var productFieldID = "product"+productCounter;
	        		mycurrentCell.setAttribute("id", productFieldID);
	        	}
	        	if (key=="td3"){
	        		var amountFieldID = "current"+productCounter;
	        		mycurrentCell.setAttribute("id", amountFieldID);
	        		productCounter++;
	        	}
	            
	            
		        if(key=="td1"){

		        	//Die Funktion liefert mir immer einen leeren String zurück, nach 3 stunden gebe ich auf
		        	// und mache das jetzt hardcoded über einen Switch-Case
		        	// Geth NICHT: mycurrentText.nodeValue=getNameByID(tableval);
		        	switch (tableval){
		        		case "1" : mycurrentText.nodeValue="Milch"; break;
		        		case "2" : mycurrentText.nodeValue="Emmentaler"; break;
		        		case "3" : mycurrentText.nodeValue="Gauda"; break;
		        		case "4" : mycurrentText.nodeValue="Joghurt 100g"; break;
		        		case "5" : mycurrentText.nodeValue="Quark"; break;
		        		case "6" : mycurrentText.nodeValue="Joghurt 500g"; break;
		        		case "7" : mycurrentText.nodeValue="Streichkaese"; break;
		        		case "8" : mycurrentText.nodeValue="Bergkaese"; break;
		        	}
		        }
		        mycurrentCell.appendChild(mycurrentText);
		        mycurrentRow.appendChild(mycurrentCell);

	        }
	    }
	    //Create input element to add to the table row
	    var amountID = "amount"+j;
		var myInputField = document.createElement("Input");
		myInputField.setAttribute("id", amountID);
		mycurrentRow.appendChild(myInputField);
        tablebody.appendChild(mycurrentRow);
    }
	


	table.appendChild(tablehead);
	table.appendChild(tablebody);
	list.appendChild(table);
}

function updateInventoryRefill()
{
alert("updateInventory");
	var rowCount= (document.getElementById("RefillTable").rows.length)-1;
	for (var i= 0; i < rowCount; i++){
		var url= "inventoryREST.php";
		var method="action=PUT";
		var descName0= "productID";
		var descName1= "stationID";
		var descName2= "currentAmount";

		//Get the productID
		var product="product"+i;
		var descVal0= ProductnametoID(document.getElementById(product).innerText);

		//Get the stationID
		var descVal1=document.getElementById("stationID").value;

		//calculate the new amount
		var soldID ="amount"+i;
		var currentID="current" +i;
		var sold = document.getElementById(soldID).value;
		var current = document.getElementById(currentID).innerText;
		var descVal2= getAdd(sold,current);

		//Build URL
		url += "?"+method+"&"+descName0+"="+descVal0+"&"+descName1+"="+descVal1+"&"+descName2+"="+descVal2;

		alert(url);

		var request = new XMLHttpRequest();
		request.open("PUT", url);
		request.onload = function()
		{
			if(request.status == 200)
			{
				alert("Update done");
			}
		};
		request.send(null);	

	}
}

function getAdd($sold,$amount){
	var a= parseInt($amount);
	var b= parseInt($sold);
	var c = a+b;
	return c.toString(10);
}

function findInventoryMissingProducts()
{
alert("findInventory");
	var url = "inventoryREST.php";
	var method = "action=GET";
	url += "?"+method;

	var request = new XMLHttpRequest();
	request.open("GET", url);
	request.onload = function()
	{
		if(request.status == 200)
		{
			var inventorylist = request.responseText;


                //getTable header for data
				var url2 = "includes/inventorytable.json";
	            var request2 = new XMLHttpRequest();
	            request2.open("GET", url2);
	            request2.onload = function()
	            {
		           if(request2.status == 200)
		           {
			           var inventorytable = request2.responseText;
			           listInventoryMissingProducts(inventorylist,inventorytable);
		            }
	            };
	            request2.send(null);

			
		}
	};
	request.send(null);
}
function listInventoryMissingProducts(inventorylist, getinventorytable)
{alert(inventorylist+getinventorytable);
	var list = document.getElementById("listMissingProducts");
	var inventory = JSON.parse(inventorylist);
	var inventorytable = JSON.parse(getinventorytable);


	var table = document.createElement("table");
	table.setAttribute("class", "test");
	

    //table head
    var tablehead = document.createElement("thead");
    var tableRow = document.createElement("tr");

    //wenn die tabllenid nicht angzeigt werden soll, muss h auf 1 gestetzt werden
    var tableattr = 1;
    for(var h = 0; h<tableattr; h++)
    {
    	var json = inventorytable[0]; //in this case only one object exitsts
    	var key = "td"+h;
    	var tableval = json[key]; 
    	if(tableval != undefined)
    	{
    		if(key =="td1"||key=="td2" || key=="td3")
    		{
	    		var tableCell = document.createElement("td");
	    	    var cellContent = document.createTextNode(tableval);
	    	    if (cellContent.nodeValue=="productID"){
	    	    	cellContent.nodeValue="Produkt";
	    	    }
	    	    if (cellContent.nodeValue=="currentAmount"){
	    	    	cellContent.nodeValue="Auf Lager";
	    	    }
	    	    tableCell.appendChild(cellContent);
	    	    tableRow.appendChild(tableCell);
	    	    //DEBUG: Kann Fehler verursachen
	    	    
	    	}
	    	tableattr++;

    	     
    	}
    }
    //tableRow.appendChild(tableCell);
    //Spalte für die fehlenden Produkte
    var tableCell = document.createElement("td");
	var cellContent = document.createTextNode("Aufzufüllende Menge");
	tableattr++;
	tableCell.appendChild(cellContent);
	tableRow.appendChild(tableCell);


    tablehead.appendChild(tableRow); 
    alert("länge des tableheaders"+ tableattr);



    //table body
    //Wegen fehlender Angaben gehe ich davon aus, dass man von jedem Produkt immer 20 Stück auf Lager haben will
    //Im echten Leben müsste man sich da mit dem Kunden eine Logik dafür überlegen
	var tablebody = document.createElement("tbody");

	var productCounter=0;
	for(var j = 0; j < inventory.length; j++)
	{
	    var mycurrentRow = document.createElement("tr");


	    var amountInRow;
	    for(var i = 0; i<tableattr; i++)
	    {
	    	var json = inventorytable[0];
	    	var jsonval = inventory[j];
	    	var key = "td" + i;
	    	var value = json[key];
	        var tableval = jsonval[value];
	        if(tableval != undefined&&(key =="td1"||key=="td2"||key=="td3"))
	        {
	        	var mycurrentCell = document.createElement("td");
	            var mycurrentText = document.createTextNode(tableval);
	        	
	        	if (key=="td3"){
	        		amountInRow=tableval;
	        	}
	            
	            
		        if(key=="td1"){

		        	//Die Funktion liefert mir immer einen leeren String zurück, nach 3 stunden gebe ich auf
		        	// und mache das jetzt hardcoded über einen Switch-Case
		        	// Geth NICHT: mycurrentText.nodeValue=getNameByID(tableval);
		        	switch (tableval){
		        		case "1" : mycurrentText.nodeValue="Milch"; break;
		        		case "2" : mycurrentText.nodeValue="Emmentaler"; break;
		        		case "3" : mycurrentText.nodeValue="Gauda"; break;
		        		case "4" : mycurrentText.nodeValue="Joghurt 100g"; break;
		        		case "5" : mycurrentText.nodeValue="Quark"; break;
		        		case "6" : mycurrentText.nodeValue="Joghurt 500g"; break;
		        		case "7" : mycurrentText.nodeValue="Streichkaese"; break;
		        		case "8" : mycurrentText.nodeValue="Bergkaese"; break;
		        	}
		        }
		        mycurrentCell.appendChild(mycurrentText);
		        mycurrentRow.appendChild(mycurrentCell);

	        }
	    }
	    //Add cell for missing amount

	   var mycurrentCell = document.createElement("td");
	   
	   var missingAmount=getDiff(amountInRow,"20");

	   var mycurrentText = document.createTextNode(missingAmount);
	    
		
		mycurrentCell.appendChild(mycurrentText);
		mycurrentRow.appendChild(mycurrentCell);

		tablebody.appendChild(mycurrentRow);
    }
	


	table.appendChild(tablehead);
	table.appendChild(tablebody);
	list.appendChild(table);
}

function reload(){
	location.reload(); 
}