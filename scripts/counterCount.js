/*http://www.w3schools.com/Html/html5_webstorage.asp
 * http://stackoverflow.com/questions/2010892/storing-objects-in-html5-localstorage
 */

$(document).ready(function(){

    if (typeof(Storage) != "undefined") {
        var counter = JSON.parse(localStorage.getItem("counter"));

        if (counter == null){
            var counter = 1;
        }

        else{
            counter++;
        }
        localStorage.setItem("counter", counter);
    }
});
