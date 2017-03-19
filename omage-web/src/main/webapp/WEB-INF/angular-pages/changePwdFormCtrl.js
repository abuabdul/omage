app.controller('changePwdFormCtrl', function() {
	this.changePwd = pwdForm;
    this.cancel = function() {
        //Redirect to home.
    	alert("Redirecting to home..");
    };
    
    this.confirm = function(newForm) {
    	if(newForm.username == 'habeeb'
    		&& newForm.oldPassword == 'habeeb')
    		alert("Password updated successfully!");
    	else
    		alert("Invalid credentials.");
    };
});

var pwdForm = {username :"", oldPassword:"", newPassword:"", confirmPassword:""};