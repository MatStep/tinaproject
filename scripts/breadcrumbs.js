if (typeof(Storage) != "undefined") {
    // Store
    localStorage.setItem("url", window.location.href);
    // Retrieve
   //alert(localStorage.getItem("url"));
}


//$(document).ready(function () {
//    if (typeof(Storage) != "undefined") {
//
//        var seriesOfLink = JSON.parse(localStorage.getItem("odkazy"));
//        var tags="";
//        if (seriesOfLink != null) {
//            tags = '<ul class="crumbs">';
//            for (var i = 0; i < seriesOfLink.length; i++) {
//                if (i == seriesOfLink.length - 1) {
//                    tags += '<li><a href=' + seriesOfLink[i].link + '>' + seriesOfLink[i].name + '</a></li>';
//                }
//                else {
//                    tags += '<li><a href=' + seriesOfLink[i].link + '>' + seriesOfLink[i].name + '</a></li>';
//                }
//            }
//            tags += '</ul>';
//        }
//        if (document.getElementById("cesta") != null) {
//            document.getElementById("cesta").innerHTML = tags;
//        }
//    }
//
//    $("#menu, #cesta").find("a").on("click", function(){
//        klik(this);
//    });
//
//
//    function klik(a) {
//
//
//        if (typeof(Storage) != "undefined") {
//
//            var seriesOfLink = JSON.parse(localStorage.getItem("odkazy"));
//
//            var links = {
//                name: a.innerHTML,
//                link: a.href
//            }
//
//            if (seriesOfLink == null) {
//                var seriesOfLink = new Array();
//                seriesOfLink.push(links);
//            }
//
//            else if (seriesOfLink[seriesOfLink.length - 1].link != links.link) {
//                if (seriesOfLink.length == 5) {
//                    seriesOfLink.shift();
//                }
//                seriesOfLink.push(links);
//            }
//
//
//            localStorage.setItem("odkazy", JSON.stringify(seriesOfLink));
//
//        }
//
//
//    }
//
//});