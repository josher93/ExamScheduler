// JavaScript Document
function save() {
    var Programmation = Parse.Object.extend("Programmation");
    var programmation = new Programmation();
    /*
    programmation.set("IdGroup", document.getElementById("ddlGroup").value);
    programmation.set("IdLocation", document.getElementById("ddlLocation").value);
    programmation.set("IdExam", document.getElementById("ddlSubject").value);
    programmation.set("Date", document.getElementById("txtDate").value + " " + document.getElementById("txtTime").value);
    */
    programmation.save({
        IdGroup: parseInt(document.getElementById("ddlGroup").value),
        IdLocation:parseInt(document.getElementById("ddlLocation").value),
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
function alertar()
{
    alert(document.getElementById("ddlGroup").value);
    alert(document.getElementById("ddlLocation").value);
    alert(document.getElementById("ddlSubject").value);
    alert(document.getElementById("txtDate").value + " " + document.getElementById("txtTime").value)
}