
$(document).ready(function(){
     getToDoList();

    $(".add").click(function(event) {
        var item = $("#novaUloha").val();

         //pridá do localStorage
        var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        var uniqid = randLetter + Date.now();
        var data = {id: uniqid,
                        content: item
            };
        SaveDataToLocalStorage(data);

        $("#pripomienky").add( "<li><a href='#' id='"+ uniqid +"'><div class='fa fa-check'></div></a> " + item + "</li>" ).fadeIn().prependTo("#pripomienky");
        

        $( "#pripomienky > li > a" ).click(function() {
            odober($(this))
        });
    });

    $( "#pripomienky> li > a" ).click(function() {
        odober($(this))
    });
    
    $(document).keypress(function(e) {
        if(e.which == 13) {
            $(".add").trigger('click');
            return false;
        }
    });
    
});

function odober(toto){
    toto.parent("li").slideUp(200);
    var $this = toto;

    var elements = new Array();
    var retrievedObject = JSON.parse(localStorage.getItem('todoData'));
    for(var i=0 ; i < retrievedObject.length; i++){
        if(retrievedObject[i] && $this.attr('id') != retrievedObject[i].id){
            elements.push(retrievedObject[i]);
        }
    }
    $this.fadeOut();
    localStorage.setItem('todoData', JSON.stringify(elements));
}

function SaveDataToLocalStorage(data)
{
    var before = new Array();
    if(JSON.parse(localStorage.getItem('todoData')) != null){
        before.push(JSON.parse(localStorage.getItem('todoData')));
        var ar = new Array();
        ar.push(data);
        localStorage.setItem('todoData', JSON.stringify(ar.concat(before[0])));
    } else {
        localStorage.setItem('todoData', JSON.stringify(data));
    }
}

function getToDoList(){

    var retrievedObject = JSON.parse(localStorage.getItem('todoData'));
    if(retrievedObject == null) return false;
    for(var i=0 ; i < retrievedObject.length; i++){

        if(retrievedObject[i] && retrievedObject[i].id && retrievedObject[i].content ){
            var content = "<li><a href='#' id='"+ retrievedObject[i].id +"'><div class='fa fa-check'></div></a>" + retrievedObject[i].content + "</li>";
            $("#pripomienky").append(content).fadeIn();
        }
    }
}




