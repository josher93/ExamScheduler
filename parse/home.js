// JavaScript Document
function save() {
    //fecha.setMinutes(fecha.getMinutes() + 10 )
    //declaring variables with the values of each select and dates
    var ddlGroup = document.getElementById("ddlGroup").value;
    var ddlLocation = document.getElementById("ddlLocation").value;
    var ddlExam = document.getElementById("ddlSubject").value;
    var ddlDate = document.getElementById("txtDate").value;
    var ddlTime = document.getElementById("txtTime").value;
    var maySchedule = true;
    var myNewArrayProg = programmationArray;
    var message = "";

    //checking if the variables are empty
    if (ddlGroup != "" && ddlLocation != "" && ddlExam != "" && ddlDate != "" && ddlTime != "") {
        var myDate = new Date(ddlDate + " " + ddlTime);
        var today = new Date();
        //checking if the selected date is greater than today
        if (myDate > today) {
            //checking the array
            if (programmationArray.length > 0) {

                for (a in programmationArray) {
                    var myResult = programmationArray[a]; //current file
                    var currentGroup = myResult.idGroup;
                    var currentLocation = myResult.idLocation;
                    var myProgrammedDate = new Date(myResult.programmedDate); //date
                    var myProgrammedDate2 = new Date(myProgrammedDate);
                    myProgrammedDate2 = myProgrammedDate2.setHours(myProgrammedDate2.getHours() + 2); //date + 2 hours in formta ajax
                    var myNewDate = new Date(myProgrammedDate2); //date + 2 hours in normal format to compare
                    if (myResult.idGroup == ddlGroup && (myDate < myNewDate && myDate >= myProgrammedDate)) {
                        //IF THE GROUP HAS ANOHTER EXAM LETS BREAK EVERYTHING AND SHOW A MESSAGE
                        maySchedule = false;
                        message = "the group has already scheduled examination at this time";
                        break;
                    }
                    else {
                        //maySchedule = true;
                        //IS THE LOCATION THE SAME WITH ANOTHER EXAM SCHEDULED???
                        //YES, BUT IS THERE ENOUGH SPACE FOR BOTH GRUOPS
                        var myLocationSeats = 0;
                        var myNumberOfStudents = 0; ;

                        //GETTING NUMBER OF STUDENS OF THE GROUP
                        for (x in groupsArray) {
                            var result = groupsArray[x];
                            var grupoid = result.groupId;
                            if (grupoid == currentGroup) {
                                myNumberOfStudents = result.numberOfStudents;
                            }
                        }
                        //GETTING NUMBER OF SEATS FROM THE LOCATION
                        for (y in locationsArray) {
                            var resultloc = locationsArray[y];
                            var locid = resultloc.locId;
                            if (locid == currentLocation) {
                                myLocationSeats = resultloc.availableSeats;
                            }
                        }
                        if (myLocationSeats < myNumberOfStudents) {
                            maySchedule = false;
                            message = "There are not enough seats for the students";
                        }
                        else {
                            if (myResult.idLocation == ddlLocation) {
                                //YES BUT IS FOR THE SAME DAY AND TIME???
                                if (myDate <= myNewDate && myDate >= myProgrammedDate) {
                                    //YES, BUT IS THERE ENOUGH SPACE FOR BOTH GRUOPS
                                    var myLocationSeats = 0;
                                    var myNumberOfStudents = 0;
                                    var newNumberOfStudents = 0;
                                    var groupsMatching = 0;

                                    //GETTING NUMBER OF STUDENS OF THE GROUP
                                    for (x in groupsArray) {
                                        var result = groupsArray[x];
                                        var grupoid = result.groupId;
                                        if (grupoid == currentGroup) {
                                            myNumberOfStudents = result.numberOfStudents;
                                        }
                                    }
                                    //GETTING NUMBER OF SEATS FROM THE LOCATION
                                    for (y in locationsArray) {
                                        var resultloc = locationsArray[y];
                                        var locid = resultloc.locId;
                                        if (locid == currentLocation) {
                                            myLocationSeats = resultloc.availableSeats;
                                        }
                                    }
                                    //CHECIKNG HOW MANY GROUPS ARE IN THE SAME LOCATION AT THE SAME TIME
                                    for (z in myNewArrayProg) {
                                        var resultprog = myNewArrayProg[z];
                                        if (resultprog.idLocation == currentLocation && (myDate < myNewDate && myDate >= myProgrammedDate)) {
                                            //GETTING THE NUMBER OF STUDENTS FROM THOSE GROUPS THAT MATCH
                                            for (b in groupsArray) {
                                                var resultB = groupsArray[b];
                                                if (resultB.groupId == ddlGroup) {
                                                    //ADDING NUMBER OF STUDENTS
                                                    newNumberOfStudents += resultB.numberOfStudents;
                                                }
                                            }
                                        }
                                    }
                                    //ADDING THE NUMBERS OF STUDENTS FROM MY CURRENT GROUP
                                    newNumberOfStudents += myNumberOfStudents;
                                    if (myLocationSeats > newNumberOfStudents) {
                                        //YES SURE IT IS!!! LETS SCHEDULE THE EXAM
                                        maySchedule = true;
                                        break;
                                        //schedule(ddlGroup, ddlLocation, ddlExam, myDate);
                                    }
                                    else {
                                        //SORRY THERE ARE NOT ENOUGH SEATS
                                        maySchedule = false;
                                        message = "This location has another scheduled examination at this time and there are not enough seats";
                                    }

                                }
                                else {
                                    //LETS SCHEDULE THE EXAM BUT IS THE ROOM BIG ENOUGHT

                                    //schedule(ddlGroup, ddlLocation, ddlExam, myDate);
                                }
                            }

                            else {
                                //NO THEY DONT, SO LETS SCHEDULE THE EXAM
                                //DO THEY HAVE ANOTHER EXAM SCHEDULED???
                                //maySchedule = true;                           
                            }
                        }
                    }
                }
            }
            else {
                //THERE IS NO LIST!!! LETS SCHEDULE THE EXAM
                //maySchedule = true;  
                var myLocationSeats = 0;
                var myNumberOfStudents = 0; ;
                var currentGroup =ddlGroup;
                var currentLocation = ddlLocation;
                //GETTING NUMBER OF STUDENS OF THE GROUP
                for (x in groupsArray) {
                    var result = groupsArray[x];
                    var grupoid = result.groupId;
                    if (grupoid == currentGroup) {
                        myNumberOfStudents = result.numberOfStudents;
                    }
                }
                //GETTING NUMBER OF SEATS FROM THE LOCATION
                for (y in locationsArray) {
                    var resultloc = locationsArray[y];
                    var locid = resultloc.locId;
                    if (locid == currentLocation) {
                        myLocationSeats = resultloc.availableSeats;
                    }
                }
                if (myLocationSeats < myNumberOfStudents) {
                    maySchedule = false;
                    message = "There are not enough seats for the students";
                }

            }
        }
        else {
            maySchedule = false;
            message = "to schedule an exam, date must be greater than the current";
        }
        if(maySchedule)
        {
            schedule(ddlGroup,ddlLocation,ddlExam,myDate)
        }
        else
        {
            alert(message);
        }

    }
}

function schedule(group,location,exam, dateProgrammed)  {
    var Programmation = Parse.Object.extend("Programmation");
    var programmation = new Programmation();
    programmation.save({
        IdGroup: parseInt(group),
        IdLocation: parseInt(location),
        IdExam: parseInt(exam),
        Date: dateProgrammed
        }, {
        success: function (programmation) {
            // Execute any logic that should take place after the object is saved.
            alert('New row created!!!');
        },
        error: function (programmation, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            alert('Failed to create new row ');
        }
    });
}

function formatedDate(programmedDate) {

    var monthInitial = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    day = "" + programmedDate.getDate(); if (day.length == 1) { day = "0" + day; }
    month = "" + monthInitial[(programmedDate.getMonth())]; //if (month.length == 1) { month = "0" + month; }
    year = "" + programmedDate.getFullYear();

    hour = "" + programmedDate.getHours(); if (hour.length == 1) { hour = "0" + hour; }
    minute = "" + programmedDate.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
    second = "" + programmedDate.getSeconds(); if (second.length == 1) { second = "0" + second; }

    var formated = day + "-" + month + "-" + year + " || " + hour + ":" + minute + ":" + second;

    return formated;
}

function deleteProgrammation(objectId) {

    var programmation = Parse.Object.extend("Programmation");
    var query = new Parse.Query(programmation);
    query.get(objectId, {
        success: function (scheduled) {
            // The object was retrieved successfully.
            scheduled.destroy({});
            alert('Exam deleted succesfully');
            location.reload();
        },
        error: function (object, error) {
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and description.
            alert('Sorry, the exam could not be deleted!');
        }
    });
}