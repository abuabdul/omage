app.controller('loginFormCtrl', function() {
	this.sex = ["Male", "Female"];
	this.user =  loginForm;
    this.reset = function(loginUser) {
    	loginUser.username = "";
    	loginUser.password = "";
    };
    
    this.login = function(loginUser) {
    	if(loginUser.username == 'habeeb' 
    		&& loginUser.password == 'habeeb')
    		alert("Logged in successfully!");
    	else
    		alert("Invalid credentials.");
    };
});

var regForm = {username:"", password:"", name:"", gender:"", dob:"", address:"", mobile:"", email:""};
var loginForm = {username:"", password:""};