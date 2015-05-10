/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function(){

    if (typeof(Storage) != "undefined") {
        var counter = JSON.parse(localStorage.getItem("counterTim6"));
        var tag = "<p class='footer-text'> Toto je tvoja " + counter + ". návšteva.</p>"; 
        $("#footerText").append(tag);
    }
});