// JavaScript Document
function save() {
    //fecha.setMinutes(fecha.getMinutes() + 10 )
    var ddlGroup = document.getElementById("ddlGroup").value;
    var ddlLocation = document.getElementById("ddlLocation").value;
    var ddlExam = document.getElementById("ddlSubject").value;
    var ddlDate = document.getElementById("txtDate").value;
    var ddlTime = document.getElementById("txtTime").value;
    var isTimeAccepted = true;

    if (ddlGroup != "" && ddlLocation != "" && ddlExam != "" && ddlDate != "" && ddlTime != "") {
        var myDate = new Date(ddlDate + " " + ddlTime);
        var today = new Date();

        if (myDate > today) {

            for(a in programmationArray)
            {
                var myResult = programmationArray[a];
                if(myResult.idGroup == ddlGroup)
                {
                    var myProgrammedDate = new Date(myResult.programmedDate);
                    var myProgrammedDate2 = new Date(myProgrammedDate);
                    myProgrammedDate2 = myProgrammedDate2.setHours(myProgrammedDate2.getHours()+2);
                    var myNewDate = new Date(myProgrammedDate2);

                }
            }
        }
        else {
            alert("to schedule an exam, date must be greater than the current");
        }
    }
}


            /*                    
            
            
            if(myDate< myNewDate && myDate >=myProgrammedDate)
                    {
                        alert("The group has already a exam at this time");
                    }


            var Programmation = Parse.Object.extend("Programmation");
            var programmation = new Programmation();
            programmation.save({
                IdGroup: parseInt(ddlGroup),
                IdLocation: parseInt(ddlLocation),
                IdExam: parseInt(ddlExam),
                Date: myDate
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
            });*/

