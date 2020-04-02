function getObjects() {
	//General HTTP Request structure for API Endpoint connection
	const uri = "http://wp8m3he1wt.s3-website-ap-southeast-2.amazonaws.com/api/products/1";
	const xhr = new XMLHttpRequest();
	xhr.open("GET", uri, true);
	xhr.setRequestHeader('accept', 'application/json');
	xhr.onload = () => {
		var resp = JSON.parse(xhr.responseText);
		//Initialising variables for number of air conditioning units and total cubic weight
		var total_units = 0;
		var total_cubic_weight = 0;
		//Iterate through object array, pausing on each separate object
		resp.objects.forEach(object =>{
			if (object.category == "Air Conditioners") {
				//Number of air conditioners incremented
				total_units += 1;
				//Centimetre to metre conversion and cubic calculation
				var cubic_metres = (object.size.width / 100) * (object.size.length / 100) * (object.size.height / 100);
				//Multiplying by industry standard
				total_cubic_weight += (cubic_metres * 250);
			}
	   })
	   //Error to handle potential other API endpoints where no Air Conditioners may be present
	   if (total_units == 0) {
		   alert("There were no detected Air Conditioning units for this endpoint. Please use a different endpoint and try again.");
	   }
	   //Final output and results displayed, with the average calculated to one decimal place
	   const output = ((total_cubic_weight / total_units).toFixed(1));
	   document.getElementById('brief').innerHTML = "   " + total_units;
	   document.getElementById('output').innerHTML = "   " + output;

	}
	xhr.send(null);
}
