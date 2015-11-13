// JavaScript Document

function loginUser(form) {

    event.preventDefault();

    var username = document.getElementById("inputUser").value;
    var pass = document.getElementById("inputPassword").value;

    Parse.User.logIn(username, pass, {
        success: function (user) {
            // Do stuff after successful login.
            localStorage.setItem("parseUser", true);
            localStorage.setItem("guestUser", false);
            localStorage.setItem("username", username);
            localStorage.setItem("userGroupId", Parse.User.IdGroup)
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
    localStorage.setItem("guestUser", false);
    localStorage.setItem("parseUser", false);
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

    if (user == "false" && guest == "false") {

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
        localStorage.setItem("parseUser", false);
        window.location.href = 'index.html';
        // Retrieve
        //document.getElementById("result").innerHTML = localStorage.getItem("lastname");
    } else {
        alert('Sorry, your browser does not support Web Storage...');
        window.location.href = 'login.html';
    }
}

function guestInterface() {

    var currentUser = Parse.User.current();
    var guest = localStorage.getItem("guestUser");
    var user = localStorage.getItem("parseUser");
    
    if (user == "false" && guest == "true") {

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

    if (user == "false" && guest == "true") {
        isguest = true;
    }

    return isguest;
}