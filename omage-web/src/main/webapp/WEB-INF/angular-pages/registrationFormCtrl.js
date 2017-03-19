app.controller('registrationFormCtrl', function() {
	this.sex = ["Male", "Female"];
	this.regForm =  userForm;
    this.reset = function(newUser) {
    	newUser = userForm;
    };
    
    this.register = function(newUser) {
    	alert("Hi "+ newUser.name +", your account created successfully!");
    	
    };
});

var userForm = {username:"", password:"", name:"", gender:"", dob:"", address:"", mobile:"", email:""};
