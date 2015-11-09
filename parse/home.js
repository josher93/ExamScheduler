// JavaScript Document

var existsTime = false;

function save() {
    var Programmation = Parse.Object.extend("Programmation");
    var programmation = new Programmation();
    /*
    programmation.set("IdGroup", document.getElementById("ddlGroup").value);
    programmation.set("IdLocation", document.getElementById("ddlLocation").value);
    programmation.set("IdExam", document.getElementById("ddlSubject").value);
    programmation.set("Date", document.getElementById("txtDate").value + " " + document.getElementById("txtTime").value);
    */

    validateTime();

    if (existsTime == true) {
        alert("Error: You cannto set same time for an exam");
    }
    else {
        programmation.save({
            IdGroup: parseInt(document.getElementById("ddlGroup").value),
            IdLocation: parseInt(document.getElementById("ddlLocation").value),
            IdExam: parseInt(document.getElementById("ddlSubject").value),
            Date: new Date(document.getElementById("txtDate").value + " " + document.getElementById("txtTime").value)
        }, {
            success: function (programmation) {
                // Execute any logic that should take place after the object is saved.
                //alert('New object created with objectId: ' + programmation.id);
            },
            error: function (programmation, error) {
                // Execute any logic that should take place if the save fails.
                // error is a Parse.Error with an error code and message.
                //alert('Failed to create new object, with error code: ' + error.message);
            }
        });
    }
}
function alertar() {
    alert(document.getElementById("ddlGroup").value);
    alert(document.getElementById("ddlLocation").value);
    alert(document.getElementById("ddlSubject").value);
    alert(document.getElementById("txtDate").value + " " + document.getElementById("txtTime").value)
}

function validateTime() {
    var existingTime = Parse.Object.extend("Programmation");
    var queryTime = new Parse.Query(existingTime);
    var examDate = new Date(document.getElementById("txtDate").value + " " + document.getElementById("txtTime").value)
    query.equalTo("Date", examDate);
    query.first({
        success: function (object) {
            // Successfully retrieved the object.
            existsTime = true;
        },
        error: function (error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });
}

