function getRandom() {

	var serverurl;
if (window.location.hostname==='localhost') {
	 serverurl = 'https://api.peviitor.ro';
}
 else {
	 serverurl ='https://api.peviitor.ro';
 }	
	
var url_r = serverurl + '/v1/random/';
fetch(url_r)
   .then(function(response) {
             response.text().then(function(text) {
                 
				var ser_message = JSON.parse(text);
				 
				document.getElementById("job_title_r").innerHTML = ser_message.title ;
				document.getElementById("company_r").innerHTML  = ser_message.company ;
				document.getElementById("location_r").innerHTML  = (ser_message.location || []).join(', ') || ser_message.county || '' ;
				document.getElementById("link_r").href  = ser_message.url ;
				
				
				
				
  });
})
.catch(err => console.log(err));
}
getRandom()
setInterval(getRandom, 5000) // la fiecare 5 secunda
