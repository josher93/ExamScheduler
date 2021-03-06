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
    var myNewArrayProg = myProgArray;
    var message = "";

    //checking if the variables are empty
    if (ddlGroup != "" && ddlLocation != "" && ddlExam != "" && ddlDate != "" && ddlTime != "") {
        var myDate = new Date(ddlDate + " " + ddlTime);
        var today = new Date();
        //checking if the selected date is greater than today
        if (myDate > today) {
            //checking the array
            if (myProgArray.length > 0) {

                for (a in myProgArray) {
                    var myResult = myProgArray[a]; //current file
                    var currentGroup = myResult.idGroup;
                    var currentLocation = myResult.idLocation;
                    var myProgrammedDate = new Date(myResult.programmedDate); //date
                    var myProgrammedDate2 = new Date(myProgrammedDate);
                    myProgrammedDate2 = myProgrammedDate2.setHours(myProgrammedDate2.getHours() + 2); //date + 2 hours in formta ajax
                    var myNewDate = new Date(myProgrammedDate2); //date + 2 hours in normal format to compare
                    if (myResult.idGroup == ddlGroup && (myDate < myNewDate && myDate >= myProgrammedDate)) {
                        //IF THE GROUP HAS ANOHTER EXAM LETS BREAK EVERYTHING AND SHOW A MESSAGE
                        maySchedule = false;
                        message = "The group has already scheduled exams at this time";
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
                                if (grupoid  == ddlGroup) {
                                    myNumberOfStudents = result.numberOfStudents;
                                    break;
                                }
                            }
                            //GETTING NUMBER OF SEATS FROM THE LOCATION
                            for (y in locationsArray) {
                                var resultloc = locationsArray[y];
                                var locid = resultloc.locId;
                                if (locid == ddlLocation) {
                                    myLocationSeats = resultloc.availableSeats;
                                    break;
                                }
                            }
                        if (myLocationSeats < myNumberOfStudents && myNumberOfStudents != 0 && myLocationSeats != 0) {
                            maySchedule = false;
                            message = "There are not enough seats available";
                            break;
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
                                        if (grupoid == ddlGroup) {
                                            myNumberOfStudents = result.numberOfStudents;
                                            break;
                                        }
                                    }
                                    //GETTING NUMBER OF SEATS FROM THE LOCATION
                                    for (y in locationsArray) {
                                        var resultloc = locationsArray[y];
                                        var locid = resultloc.locId;
                                        if (locid == currentLocation) {
                                            myLocationSeats = resultloc.availableSeats;
                                            break;
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
                                        message = "This location has another scheduled examination at this time and there are not enough seats available";
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
                //THERE IS NO LIST!!! BUT ARE THERE ENOUGH SEATS
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
                        break;
                    }
                }
                //GETTING NUMBER OF SEATS FROM THE LOCATION
                for (y in locationsArray) {
                    var resultloc = locationsArray[y];
                    var locid = resultloc.locId;
                    if (locid == currentLocation) {
                        myLocationSeats = resultloc.availableSeats;
                        break;
                    }
                }
                if (myLocationSeats < myNumberOfStudents) {
                    maySchedule = false;
                    message = "There are not enough seats available.";
                }

            }
        }
        else {
            maySchedule = false;
            message = "To schedule an exam, date must be greater than current date.";
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
    var gro = Parse.Object.extend("Groups");
    var loca = Parse.Object.extend("Locations");
    var exa = Parse.Object.extend("Exams");

    var Gro = new gro();
    var Loca = new loca();
    var Exa = new exa();

    Gro.id = group;
    Loca.id = location;
    Exa.id = exam;
    myDate = new Date(dateProgrammed);
    var Programmation = Parse.Object.extend("Programmation");
    var programmation = new Programmation();

    programmation.set("IdGroup", Gro);
    programmation.set("IdLocation", Loca);
    programmation.set("IdExam", Exa);

    /*programmation.set("IdGroup",group);
    programmation.set("IdLocation",location);
    programmation.set("IdExam",exam);*/
    programmation.set("Date",myDate);
    programmation.save(null, {
        success: function (programmation) {
            // Execute any logic that should take place after the object is saved.
            //location.reload();
            alert('New row created!!!');
            window.location.replace = 'index.html';
        },
        error: function (programmation, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            //alert('Failed to create new row ');
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
            window.location.href = 'index.html';
        },
        error: function (object, error) {
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and description.
            alert('Sorry, the exam could not be deleted!');
        }
    });
}