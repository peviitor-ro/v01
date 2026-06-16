var serverurl;
if (window.location.hostname === 'localhost') {
  serverurl = 'https://api.peviitor.ro';
} else {
  serverurl = 'https://api.peviitor.ro';
}

var pages;
var item_html = "";

var qs = new URLSearchParams(window.location.search);
var q_s = qs.toString();
var url = serverurl + '/v1/search/?' + q_s;

function search() {
  fetch(url)
    .then(function(response) {
      response.text().then(function(text) {
        var ser_message = JSON.parse(text);
        var results_nr = ser_message.response.numFound;

        pages = Math.floor(results_nr / 10) + 1;
        if (typeof pages !== 'undefined') {
          showPages(pages);
        }

        var docs = ser_message.response.docs;
        var rezno = "";
        if (results_nr === 0) {
          rezno = "nici un rezultat";
        } else {
          rezno = results_nr + " rezultate, " + pages + " pagini";
        }
        document.getElementById("resultsno").innerHTML = rezno;

        item_html = "";
        docs.forEach(showResults);
        document.getElementById("results").innerHTML = item_html;
      });
    })
    .catch(err => console.log(err));
}

function showResults(item, index) {
  item_html = item_html + "<li><p>";
  item_html = item_html + "<label class='job_title'>" + "<a href='" + item.url + "' target=_blank>" + item.title + "</a>" + "</label>";
  item_html = item_html + "<label class='company'>" + item.company + "</label>";
  item_html = item_html + "<label class='location'>";

  if (item.remote) {
    item_html = item_html + item.remote + " ";
  }

  var loc = item.location || item.city || [];
  item_html = item_html + loc.join(', ');

  item_html = item_html + " </label>";
  item_html = item_html + "</p></li>";
}

function qisset() {
  var field = "q";
  var url = window.location.href;
  if (url.indexOf("?" + field + "=") != -1) return true;
  else if (url.indexOf("&" + field + "=") != -1) return true;
  return false;
}

function handleSearch(event) {
  var q = document.getElementById("search").value.trim();
  if (!q) {
    event.preventDefault();
    return false;
  }
  return true;
}

function addclassupsearch(id, classs) {
  document.getElementById(id).classList.add(classs);
}

function total(xurl) {
  fetch(xurl)
    .then(function(response) {
      response.text().then(function(text) {
        var ser_message = JSON.parse(text);
        var total = ser_message.response.numFound;
        if (total === 0) {
          rezno = "Nu avem nici o oportunitate momentan";
        } else {
          rezno = "Avem " + total + " oportunități";
        }
        document.getElementById("resultsno").innerHTML = rezno;
      });
    })
    .catch((err) => console.log(err));
}

function page(number) {
  var urltext = window.location.href;
  var url = new URL(urltext);
  url.searchParams.set("start", (number - 1) * 10);
  document.getElementById("page_" + number).href = url.href;
}

function current_page() {
  var qs = new URLSearchParams(window.location.search);
  var current = qs.get("start") / 10 + 1;
  document.getElementById("page_" + current).setAttribute("class", "highlighted");
}

function showPages(max) {
  var qs = new URLSearchParams(window.location.search);
  var start = qs.get("start");
  var pagemax;
  start = Math.round(start / 10) + 1;
  if (start == 1) {
    start = 2;
  }
  pagemax = start + 2;
  if (pagemax > max) {
    pagemax = max + 1;
  }
  var xpages = "";
  for (i = start - 1; i < pagemax; i++) {
    xpages += "<span ><a href='' id='page_" + i + "'>[ " + i + " ]</a></span>";
  }
  if (start < max - 1) {
    xpages += "<span>...</span>" + "<span ><a href='' id='page_" + max + "'>[ " + max + " ]</a></span>";
  }

  var pagesElement = document.getElementById("pages");
  if (pagesElement) {
    pagesElement.innerHTML = xpages;
  }

  for (i = start - 1; i < pagemax; i++) {
    page(i);
  }

  page(pages);
  current_page();
}

function getRandom() {
  var url_r = serverurl + '/v1/random/';
  fetch(url_r)
    .then(function(response) {
      response.text().then(function(text) {
        var ser_message = JSON.parse(text);
        document.getElementById("job_title_r").innerHTML = ser_message.title;
        document.getElementById("company_r").innerHTML = ser_message.company;
        document.getElementById("location_r").innerHTML = (ser_message.location || []).join(', ') || ser_message.county || '';
        document.getElementById("link_r").href = ser_message.url;
      });
    })
    .catch(err => console.log(err));
}

if (qisset()) {
  addclassupsearch("s129", "upsearch");
  document.body.classList.add("body_bck");
  document.getElementById("meeting").classList.add("hidden");

  var qs = new URLSearchParams(window.location.search);
  var textsearch = qs.get("q");
  document.title = "SERP PEVIITOR.RO - " + textsearch;

  search();
  getRandom();
  document.getElementById("search").value = textsearch;
} else {
  total(serverurl + "/v1/search/?q=*%3A*&rows=0");
  getRandom();
}

setInterval(getRandom, 5000);
