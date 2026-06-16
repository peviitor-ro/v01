
var qs = new URLSearchParams(window.location.search);
var q_s = qs.toString();

var pages;
var serverurl;
if (window.location.hostname==='localhost') {
	 serverurl = 'https://api.peviitor.ro';
}
 else {
	 serverurl ='https://api.peviitor.ro';
 }
var url = serverurl + '/v1/search/?'+q_s;
var item_html = "";

function search () {

fetch(url)
   .then(function(response) {
             response.text().then(function(text) {
                
				var ser_message = JSON.parse(text);
				var results_nr = ser_message.response.numFound;
				    
					pages = Math.floor(results_nr / 10)+1;
				if (typeof pages !== 'undefined') {
						showPages(pages);}

					
				var docs = ser_message.response.docs;
				var rezno ="";
				if (  results_nr === 0 ) {rezno = "nici un rezultat";} else {  rezno = results_nr + " rezultate, " +pages+" pagini" ; }
				document.getElementById("resultsno").innerHTML = rezno ;
					
				// FIXED: Reset item_html before building results
				item_html = "";
				
				docs.forEach(showResults);
				
				// FIXED: Set innerHTML once after all items are processed
				document.getElementById("results").innerHTML = item_html;
				
  });
})
.catch(err => console.log(err));
}



function showResults(item, index) {

 item_html = item_html + "<li><p>";
 item_html = item_html + "<label class='job_title'>"+"<a href='"+ item.url +"' target=_blank>"+ item.title +"</a>" +"</label>";
 item_html = item_html + "<label class='company'>"  + item.company +  "</label>";
 item_html = item_html + "<label class='location'>" ;

 if (item.remote)  {
	item_html = item_html +  item.remote +" ";}

	var loc = item.location || item.city || [];
	item_html = item_html + loc.join(', ');

 item_html = item_html + " </label>"
 item_html = item_html + "</p></li>";
 
 // FIXED: Removed the innerHTML assignment from here
 // It was overwriting on every forEach iteration
 // Now we set it once in the search() function after the loop completes
}
