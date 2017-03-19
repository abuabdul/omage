var app = angular.module('myApp', []);
app.controller('uploadImageFormCtrl', function() {
    this.upload = uploadForm;
	this.cancel = function() {
        //Redirect to home.
    	alert("Redirecting to home..");
    };
    
    this.upload = function(newForm) {
        alert("Image uploaded successfully to folder "+ newForm.folderName);
    };
});

var uploadForm = {folderName :"", imageFile:""};