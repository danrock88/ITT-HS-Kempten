
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

/* Not necessary yet, to get a specific value from inventory
function getCoords()
{
    
	var url = "stationREST.php";
	var method = "action=GET";
	var descVal = document.getElementById("stationID").value;
	var descName = document.getElementById("stationID").name;
	url += "?"+method+"&"+descName+"="+descVal;

	alert(url);

	var request = new XMLHttpRequest();
	request.open("GET", url);
	request.onload = function()
	{
		if(request.status == 200)
		{
			var stationlist = request.responseText;
			

                //getTable header for data
				var url2 = "includes/stationtable.json";
	            var request2 = new XMLHttpRequest();
	            request2.open("GET", url2);
	            request2.onload = function()
	            {
		           if(request2.status == 200)
		           {
			           var stationtable = request2.responseText;
			           listStation(stationlist,stationtable);
		            }
	            };
	            request2.send(null);

		}
	};
	request.send(null);
}
*/

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
	        if (key=="td3"){
	        	var rowMaxValue = tableval
	        }
	        if(tableval != undefined&&(key =="td1"||key=="td3"))
	        {
	            var mycurrentCell = document.createElement("td");
		        var mycurrentText = document.createTextNode(tableval);
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
		var myInputField = document.createElement("Input", id="number", max=rowMaxValue);
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
