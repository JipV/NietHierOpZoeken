module.exports = function() {

    var loginFactory = {};

    loginFactory.isLoggedIn = function(){
        var email = window.localStorage.getItem("email");
        var token = window.localStorage.getItem("token");
        if(email && token){
            return true;
        } else {
            return false;
        }
    };

    loginFactory.getEmail = function(){
        return window.localStorage.getItem("email");
    };

    loginFactory.getToken = function(){
        return window.localStorage.getItem("token");
    };

    return loginFactory;
};