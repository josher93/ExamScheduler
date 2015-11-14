// JavaScript Document

function loginUser(event, form) {

    event.preventDefault();

    var username = document.getElementById("inputUser").value;
    var pass = document.getElementById("inputPassword").value;

    Parse.User.logIn(username, pass, {
        success: function (user) {
            //var idGroup = user.get("IdGroup");
            // Do stuff after successful login.
            localStorage.setItem("parseUser", true);
            localStorage.setItem("guestUser", false);
            localStorage.setItem("username", username);
            //localStorage.setItem("userGroupId", idGroup);

            user.fetch().then(function (fetchedUser) {


                var IdGroup2 = user.get("IdGroup");
            });


            window.location.href = 'index.html';
        },
        error: function (user, error) {
            // The login failed. Check error to see why.
            alert('Invalid username or password!');
        }
    });

}

function logout() {

    Parse.User.logOut();
    localStorage.removeItem("guestUser");
    localStorage.removeItem("parseUser");
    window.location.href = 'login.html';
}

function LoggedIn() {

    var validUser = true;
    var currentUser = Parse.User.current();
    var guest = localStorage.getItem("guestUser");
    var user = localStorage.getItem("parseUser");

    if (currentUser) {
        localStorage.setItem("parseUser", true);
        localStorage.setItem("guestUser", false);
    }

    if (user == null && guest == null) {
        validUser = false;
        window.location.href = 'login.html';
    }

    return validUser;
}

function loginAsGuest() {
    // Check browser support
    if (typeof (Storage) !== "undefined") {
        // Store
        localStorage.setItem("guestUser", true);
        localStorage.removeItem("parseUser");
        window.location.href = 'index.html';
        // Retrieve
        //document.getElementById("result").innerHTML = localStorage.getItem("lastname");
    } else {
        alert('Sorry, your browser does not support Web Storage...');
        window.location.href = 'login.html';
    }
}

function userAndGuestInterface() {

    var currentUser = Parse.User.current();
    var guest = localStorage.getItem("guestUser");
    var user = localStorage.getItem("parseUser");
    var username = localStorage.getItem("username");

    if (username != "admin") {

        var title = document.getElementById('insertTitle');
        var controls = document.getElementById('insertControls');
        var ddlGroup = document.getElementById('ddlGroup');
        var ddlLocation = document.getElementById('ddlLocation');
        var ddlSubject = document.getElementById('ddlSubject');
        var txtDate = document.getElementById('txtDate');
        var txtTime = document.getElementById('txtTime');
        var btnAdd = document.getElementById('btnAdd');

        title.style.display = 'none';
        controls.style.display = 'none';
        ddlGroup.disabled = true;
        ddlLocation.disabled = true;
        ddlSubject.disabled = true;
        txtDate.disabled = true;
        txtTime.disabled = true;
        btnAdd.disabled = true;
    }
}

function isGuest() {

    var isguest = false;
    var guest = localStorage.getItem("guestUser");
    var user = localStorage.getItem("parseUser");

    if (user == null && guest == "true") {
        isguest = true;
    }

    return isguest;
}

function isAdmin() {

    var isadmin = false;
    var username = localStorage.getItem("username");

    if (username == "admin") {
        isadmin = true;
    }

    return isadmin;
}

/*function gettingUserGroup() {
    
var user = Parse.User.current();

var query = new Parse.Query(user);
query.get(user.id, {
success: function (user) {
// The object was retrieved successfully.
var groupID = user.get("IdGroup");
},
error: function (object, error) {
// The object was not retrieved successfully.
// error is a Parse.Error with an error code and message.
}
});
}
*/

function getUserGroup() {

    var userName = localStorage.getItem("username");
    var query = new Parse.Query(Parse.User);
    query.equalTo("username", userName); // Whatever be the username passed by search string
    query.find({
        success: function (user) {
            console.log("Success:", user.attributes[1].IdGroup)

            //var userinfo = user.attributes;
        },
        error: function (error) {
            //Show if no user was found to match
        }
    });
}