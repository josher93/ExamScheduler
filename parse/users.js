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