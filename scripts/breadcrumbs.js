
$(document).ready(function () {

    if (typeof(Storage) != "undefined") {

            var seriesOfLink = JSON.parse(localStorage.getItem("odkazy"));

            var links = {nazov: $(document).find("title").text(), link: window.location.href};

            if (seriesOfLink == null) {
                var seriesOfLink = new Array();
                seriesOfLink.push(links);
            }

            else if (seriesOfLink[seriesOfLink.length - 1].link != links.link) {
                if (seriesOfLink.length == 5) {
                    seriesOfLink.shift();
                }
                seriesOfLink.push(links);
            }

            localStorage.setItem("odkazy", JSON.stringify(seriesOfLink));
            
        }
        createBreadcrumbs(seriesOfLink);
    });
    
    function createBreadcrumbs(links){
        var tags = "";
        for(var i= 0; i<links.length; i++){
            tags = tags + "<li><a href= " + links[i].link + ">" + links[i].nazov + "</a></li>";
        }
        $(".breadcrumb").html(tags);
        var lastLi = $(".breadcrumb").find("li").last();
        lastLi.addClass("active");
        var lastLiText = $(".breadcrumb").find("a").last().text();
        lastLi.html(lastLiText);
    }
