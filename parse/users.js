// JavaScript Document

function loginUser(form) {

    event.preventDefault();

    var username = document.getElementById("inputUser").value;
    var pass = document.getElementById("inputPassword").value;

    Parse.User.logIn(username, pass, {
        success: function (user) {
            // Do stuff after successful login.
            window.location.href = 'index.html';
        },
        error: function (user, error) {
            // The login failed. Check error to see why.
            alert('User login error ' + error.message);
        }
    });

}

function logout() {

    Parse.User.logOut();
}