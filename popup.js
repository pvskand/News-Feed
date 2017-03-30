function putdata(res)
{ 
  // removes the present posts

  $("#content > li").remove();
  $("#content > hr").remove();

  

    var node = document.createElement("li");
    for (var j = 0;j<res.articles.length;j++)
    {
    var nameText = document.createTextNode((j+1)+".  "+res.articles[j].title);
    var nameNode = document.createElement("h3");
    nameNode.data = res.articles[j].url;
    nameNode.appendChild(nameText);
    node.appendChild(nameNode);

      var domainText = document.createTextNode(res.articles[j].description);
      var domainNode = document.createElement("span");
      domainNode.className = "detail";
      domainNode.appendChild(domainText);
      node.appendChild(domainNode);
      node.appendChild(document.createElement("br"));
    
    node.appendChild(document.createElement("br"));
    
    document.getElementById("content").appendChild(node);
    document.getElementById("content").appendChild(document.createElement("hr"));
  }
  }



function fetchdata(){

  imgToggle();
  req =  new XMLHttpRequest();
  str = "the-hindu"
  req.open("GET","https://newsapi.org/v1/articles?source=the-hindu&apiKey=fc65cf635c2544a5a56bf0710635beec",true);
  req.send();
  console.log(req);
  req.onload = function(){

    res = JSON.parse(req.responseText);
    putdata(res);
console.log("s");
    now = (new Date()).getTime()/1000;
	  localStorage.cache  = req.responseText;
	  localStorage.time = now;
  };

  // req.onerror = function(){

    
  // }
  imgToggle();
}

// toggles between the loading gif,reload icon.
function imgToggle(){
  
  src = $('.loading').attr('src');
  if(src=="icons/refresh-white.png") $(".loading").attr("src","icons/reload.gif");
  else $(".loading").attr("src","icons/refresh-white.png");
}

$(document).ready(function(){


  now = (new Date()).getTime()/1000;
  if(!localStorage.cache || now - parseInt(localStorage.time) > 5*60){
    // cache is old or not set
    fetchdata();

  }
  else{
    // cache is fresh
    putdata(JSON.parse(localStorage.cache));
    if(localStorage.scrollTop){
      document.body.scrollTop = localStorage.scrollTop;
    }
  }

  addEventListener('scroll', function(){
    localStorage.scrollTop = document.body.scrollTop;
  });

  $("body").on('click',".loading", function(){
    console.log("before");
    
    fetchdata();
    setTimeout(function(){imgToggle();}, 1000);
    imgToggle();
    //console.log("here man!");
    return false;
  });

  $("body").on('click',"li > h3", function(){
    chrome.tabs.create({url: this.data});
    return false;
  });

  $("body").on('mousedown',"li > h3", function(e){
    if( e.which == 2 ) {
      chrome.tabs.create({url: this.data});
    }
    return false;
  });
  
  $("body").on('click',"h5", function(){
    chrome.tabs.create({url: this.data});
    return false;
  });

  $("body").on('mousedown',"h5", function(e){
    if( e.which == 2 ) {
      chrome.tabs.create({url: this.data});
    }
    return false;
  });

  $("body").on('click',"header > h2", function(){
    chrome.tabs.create({ url: 'https://newsapi.org' });
    return false;
  });

  $("body").on('mousedown',"header > h2", function(e){
    if( e.which == 2 ) {
      chrome.tabs.create({ url: 'https://newsapi.org' });
    }
    return false;
  });

  $("body").on('click',".gh-btn", function(){
    chrome.tabs.create({url: "https://github.com/pvskand/News-Feed"});
    return false;
  });

  $("body").on('mousedown',".gh-btn", function(e){
    if( e.which == 2 ) {
      chrome.tabs.create({url: "https://github.com/pvskand/News-Feed"});
    }
    return false;
  });




  // this makes sure that fetchdata() is called only when the icon
  // is reload icon and not when it is the loading gif.
  $("body").on('click',".loading", function(){
    
    src = $('.loading').attr('src');
    
    if(src=="icons/refresh-white.png") ;

  });

});