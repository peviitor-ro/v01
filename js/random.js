function getRandom() {

	var serverurl;
if (window.location.hostname==='localhost') {
	 serverurl = 'https://api.peviitor.ro';
}
 else {
	 serverurl ='https://api.peviitor.ro';
 }	
	
var url_r = serverurl + '/v3/random/';
fetch(url_r)
   .then(function(response) {
             response.text().then(function(text) {
                
				var ser_message = JSON.parse(text);
				var docs = ser_message.response.docs;
				 
				document.getElementById("job_title_r").innerHTML = ser_message.response.docs[0].job_title ;
				document.getElementById("company_r").innerHTML  = ser_message.response.docs[0].company ;
				document.getElementById("location_r").innerHTML  = ser_message.response.docs[0].country ;
				document.getElementById("link_r").href  = ser_message.response.docs[0].job_link ;
				
				
				
				
  });
})
.catch(err => console.log(err));
}
getRandom()
setInterval(getRandom, 5000) // la fiecare 5 secunda
