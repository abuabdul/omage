/*!
 *
 * This file contains the code for the global validation rules.
 *
 * @project   Melapalayam Portal
 * @date      04-03-2015
 * @author    Mohamed Hanifa, Bangalore, India <hanifawelcomes@gmail.com>, Abubacker Siddik, Chennai, India
 * @licensor  MPMPROF
 * @site      www.melapalayam.co.in
 *
 */
/*global validation rules and messages */

/*jslint forin: true, sloppy: true, unparam: true, vars: true, white: true */
/*global window, document, $, jQuery*/

var MPMPROF = window.MPMPROF || {};

(function(window, document, $, MPMPROF) {
    "use strict";
    MPMPROF.validationUtil = (function() {

        var validationRules = function() {

            $.fn.ignoreOptionalField = function(){
            	var bvField = this.selector.substring(1);
            	if(this.val() === '' && this.parents('.form-group').hasClass('has-success')){
                    this.parents('.form-group').removeClass('has-success').find('.form-control-feedback[data-bv-icon-for="'+bvField+'"]').hide();
                }
            	return this;
            }
            
            $.fn.resetPwdIndicator = function(){
            	$(this).children('.password-verdict').text('');
            	$(this).children().find('.progress-bar').removeClass('progress-bar-danger').css("width", "0");
            }
            
            $.fn.profEducationQualFn = function(){
         		var form = "#"+ $(this).closest("form").attr("id");
         		$(form).data('bootstrapValidator').updateStatus('profModalEducationCourse', 'NOT_VALIDATED').updateStatus('profModalEducationBranch', 'NOT_VALIDATED');
         		$('.profModalEducationCourse').empty().append($('<option></option>').val("").html("Select"));
         		$(".profModalEducationBranch").removeAttr("disabled");

         		if($(this).val()){
         			var that = this;
         			$.post(
         					MPMPROF.baseURL+'/mpmprof/checkCourses.go',
         				    {'qualification': $(that).val()}
         			       ).done(function(data){
         			    	  $('.profModalEducationCourse').empty().append($('<option></option>').val("").html("Select"));
         			   		  $.each(data, function(index, value){
         			   	         $('.profModalEducationCourse').append($('<option></option>').val(value).html(value));
         			   	      });
         				   }).fail();
         			
         	   		if($(this).val() === "SSLC" || $(this).val() === "HSC"){
         	   			$(".profModalEducationBranch").attr("disabled", "disabled").val('');
         	   		}
         		}
         	}
            
        	$('#loginForm').bootstrapValidator({
                live: 'enabled',
                message: 'This value is not valid',
                feedbackIcons: {
                	valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    username: {
                        validators: {
                            notEmpty: {
                                message: 'The user name is required and cannot be empty'
                            }
                        }
                    },
                    password: {
                    	trigger: 'blur',
                        validators: {
                            notEmpty: {
                                message: 'The password is required and cannot be empty'
                            }
                        }
                    },
                }
             });
        	
            $('#forgotPwdForm, #resetPwdForm, #userRegistrationForm, #changePasswordForm, #changeSecretQuestionsForm').bootstrapValidator({
                live: 'enabled',
                message: 'This value is not valid',
                feedbackIcons: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    /* for registration form */
                    username: {
                    	trigger: 'blur',
                        validators: {
                            notEmpty: {
                                message: 'The user name is required and cannot be empty'
                            },
                            stringLength: {
                            	min: 6,
                                max: 30,
                                message: 'The user name is minimum 6 and maximum 30 characters'
                            },
                            remote: {
                            	message: 'Username already exists', 
                            	url: 	MPMPROF.baseURL+'/mpmprof/checkMemberAvailable.go',
                                type: 'POST'
                            }
                        }
                    },
                    password: {
                    	trigger: 'blur',
                        validators: {
                            notEmpty: {
                                message: 'The password is required and cannot be empty'
                            },
                            stringLength: {
                            	min: 8,
                            	max: 30,
                                message: 'The password should be minimum 8 and maximum 30 characters'
                            },
                            regexp:{
                            	regexp:  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`~!@#$%^&*\(\)\-\_\=\+\\\|\{\}\[\]\'\"\;\:\/\?\.\>\,\<])[A-Za-z\d`~!@#$%^&*\(\)\-\_\=\+\\\|\{\}\[\]\'\"\;\:\/\?\.\>\,\<]{8,30}/,
                            	message: 'The password must have at least 1 Upper and Lowercase, 1 Numeric and 1 Special Character'
                            }                           
                        }
                    },
                    confirmPassword: {
                    	trigger: 'blur',
                        validators: {
                            notEmpty: {
                                message: 'The confirm password is required and cannot be empty'
                            },
		                    identical: {
		                        field:   'password',
		                        message: 'The password and its confirm password do not match'
		                    }
                        }
                    },
                    /* Change Password field */
                    currentPassword: {
                    	trigger: 'blur',
                    	validators: {
                            notEmpty: {
                                message: 'The current password is required and cannot be empty'
                            }
                        }
                    },
                    /* Change Password field */
                    secQueOne: {
                    	trigger: 'blur',
                        validators: {
                            notEmpty: {
                                message: 'Please select a secret question'
                            }
                        }
                    },
                    secAnsOne: {
                    	trigger: 'blur',
                        validators: {
                            notEmpty: {
                                message: 'The secret answer is required and cannot be empty'
                            },
                            stringLength: {
                            	max: 200,
                                message: 'The secret answer should be maximum 200 characters'
                            }
                        }
                    },
                    secQueTwo: {
                    	trigger: 'blur',
                        validators: {
                            notEmpty: {
                                message: 'Please select a secret question'
                            }
                        }
                    },
                    secAnsTwo: {
                    	trigger: 'blur',
                        validators: {
                            notEmpty: {
                                message: 'The secret answer is required and cannot be empty'
                            },
                            stringLength: {
                            	max: 200,
                                message: 'The secret answer should be maximum 200 characters'
                            }
                        }
                    },
                    name: {
                    	trigger: 'blur',
                        validators: {
                            notEmpty: {
                                message: 'The name is required and cannot be empty'
                            },
                            validWord: {
                            	message: 'The name contains invalid words'
                            },
                            stringLength: {
                            	max: 100,
                                message: 'The name should be maximum 100 characters'
                            },
                            regexp:{
                            	regexp:  /^([^0-9]*)$/,
                            	message: 'The name should not contain digits'
                            }
                        }
                    }, 
                    parentName: {
                    	trigger: 'blur',
                        validators: {
                            notEmpty: {
                                message: 'The parent name is required and cannot be empty'
                            },
                            validWord: {
                            	message: 'The parent name contains invalid words'
                            },
                            stringLength: {
                            	max: 100,
                                message: 'The parent name should be maximum 100 characters'
                            },
                            regexp:{
                            	regexp:  /^([^0-9]*)$/,
                            	message: 'The parent name should not contain digits'
                            }
                        }
                    }, 
                    gender: {
                    	trigger: 'blur',
                        validators: {
                            notEmpty: {
                                message: 'Please select a gender'
                            }
                        }
                    },
                    dob: {
                    	trigger: 'blur',
                        validators: {
                            notEmpty: {
                                message: 'The date of birth is required and cannot be empty'
                            }, 
                            date: {
                                format: 'DD/MM/YYYY',
                                message: 'The date is not a valid format'
                            },
                            callback: {
                            	message: 'The date of birth does not look correct',
                                callback: function(value, validator) {
                                	if(value === ''){
                                		return true;
                                	}
	                            	var m = new moment(value, 'DD/MM/YYYY', true);
			                        if (!m.isValid()) {
			                           return true;
			                        }
			                        var sm = new moment('01/01/1900','DD/MM/YYYY', true);
	                                return m.isAfter(sm) && m.isBefore(moment().subtract(15, 'years'));
	                            }
	                        }
                        }
                    },
                    permAddrDoorNo: {
                    	trigger: 'blur',
                    	selector: '.permAddrDoorNo',
                        validators: {
                            notEmpty: {
                                message: 'The door no is required and cannot be empty'
                            },
                            stringLength: {
                            	max: 20,
                                message: 'The door no should be maximum 20 characters'
                            }
                        }
                    },
                    permAddrStreet: {
                    	trigger: 'blur',
                    	selector: '.permAddrStreet',
                        validators: {
                            notEmpty: {
                                message: 'The street is required and cannot be empty'
                            },
                            validWord: {
                            	message: 'The street contains invalid words'
                            },
                            stringLength: {
                            	max: 200,
                                message: 'The street should be maximum 200 characters'
                            }
                        }
                    },
                    permAddrArea: {
                    	trigger: 'blur',
                    	selector: '.permAddrArea',
                        validators: {
                            notEmpty: {
                                message: 'The area is required and cannot be empty'
                            },
                            validWord: {
                            	message: 'The area contains invalid words'
                            },
                            stringLength: {
                            	max: 300,
                                message: 'The area should be maximum 300 characters'
                            }
                        }
                    },
                    permAddrSubArea: {
                    	trigger: 'blur',
                    	selector: '.permAddrSubArea',
                        validators: {
                            validWord: {
                            	message: 'The sub area contains invalid words'
                            },
                            stringLength: {
                            	max: 300,
                                message: 'The sub area should be maximum 300 characters'
                            }
                        }
                    },
                    permAddrCity: {
                    	trigger: 'blur',
                    	selector: '.permAddrCity',
                        validators: {
                            notEmpty: {
                                message: 'Please select a city'
                            }
                        }
                    },
                    permAddrState: {
                    	trigger: 'blur',
                    	selector: '.permAddrState',
                    	validators: {
                            notEmpty: {
                                message: 'The state is required and cannot be empty'
                            },
                            validWord: {
                            	message: 'The state contains invalid words'
                            },
                            stringLength: {
                            	max: 100,
                                message: 'The state should be maximum 100 characters'
                            }
                        }
                    },
                    permAddrCountry: {
                    	trigger: 'blur',
                    	selector: '.permAddrCountry',
                    	validators: {
                            notEmpty: {
                                message: 'Please select a country'
                            }
                        }
                    },
                    permAddrZipcode: {
                    	trigger: 'blur',
                    	selector: '.permAddrZipcode',
                    	validators: {
                            notEmpty: {
                                message: 'The zip code is required and cannot be empty'
                            },
                            stringLength: {
                            	max: 20,
                                message: 'The zip code should be maximum 20 characters'
                            }
                        }
                    },
                    permAddrEmailAddr: {
                    	trigger: 'blur',
                    	selector: '.permAddrEmailAddr',
                        validators: {
                            notEmpty: {
                                message: 'The email address is required and cannot be empty'
                            },
                            emailAddress: {
                                message: 'Please enter a valid email address'
                            },
                            stringLength: {
                            	max: 100,
                                message: 'The email address should be maximum 100 characters'
                            },
                            callback: {
                                message: 'The primary email address cannot be the same as secondary email address',
                                callback: function(value, validator, $field) {
                                	if(value === '') {
                                		return true;
                                	}
                                	var primary = $('.permAddrEmailAddr').val().toUpperCase();
                                	var secondary = $('.currAddrEmailAddr').val().toUpperCase();
                                    return primary !== secondary;
                                }
                            },
                            remote: {
                            	message: 'The email address already exists',
                            	url: 	MPMPROF.baseURL+'/mpmprof/checkMemberEmailAddress.go',
                                type: 'POST',
	                            data: function(validator) {
	                                return {
	                                    emailAddr: validator.getFieldElements('permAddr.emailAddr').val()
	                                };
	                            }
                            }
                        }
                    },
                    permAddrMobile: {
                    	trigger: 'blur',
                    	selector: '.permAddrMobile',
                        validators: {
                        	notEmpty: {
                                message: 'The mobile number is required and cannot be empty'
                            },
                        	callback: {
                                callback: function(value, validator, $field) {
                                	if(value === '') {
                                		return value === '';
                                	}
                                	if(value.length <= 5){
                                		return {
                                			valid: false,
                                			message: 'The mobile number is empty or invalid'
                                		};
                                	}
                                    return {
                                    	valid: $field.intlTelInput('isValidNumber'),
                                    	message: 'The mobile number is not valid'
                                    };
                                }
                            },
                        	remote: {
                            	message: 'Mobile number already exists',
                            	url: 	MPMPROF.baseURL+'/mpmprof/checkUserMobileNumber.go',
                                type: 'POST',
	                            data: function(validator) {
	                            	var mobile = validator.getFieldElements('permAddr.mobile').val();
	                                return {
	                                	mobileNo: mobile
	                                };
	                            }
                            }
                        }
                    },
                    currAddrDoorNo: {
                    	trigger: 'blur',
                    	selector: '.currAddrDoorNo',
                        validators: {
                            stringLength: {
                            	max: 20,
                                message: 'The current address door no should be maximum 20 characters'
                            }
                        }
                    },
                    currAddrStreet: {
                    	trigger: 'blur',
                    	selector: '.currAddrStreet',
                        validators: {
                            validWord: {
                            	message: 'The current address street contains invalid words'
                            },
                            stringLength: {
                            	max: 200,
                                message: 'The current address street should be maximum 200 characters'
                            }
                        }
                    },
                    currAddrArea: {
                    	trigger: 'blur',
                    	selector: '.currAddrArea',
                        validators: {
                            validWord: {
                            	message: 'The current address area contains invalid words'
                            },
                            stringLength: {
                            	max: 300,
                                message: 'The current address area should be maximum 300 characters'
                            }
                        }
                    },
                    currAddrSubArea: {
                    	trigger: 'blur',
                    	selector: '.currAddrSubArea',
                        validators: {
                            validWord: {
                            	message: 'The current address sub area contains invalid words'
                            },
                            stringLength: {
                            	max: 300,
                                message: 'The current address sub area should be maximum 300 characters'
                            }
                        }
                    },
                    currAddrState: {
                    	trigger: 'blur',
                    	selector: '.currAddrState',
                    	validators: {
                            validWord: {
                            	message: 'The current address state contains invalid words'
                            },
                            stringLength: {
                            	max: 100,
                                message: 'The current address state should be maximum 100 characters'
                            }
                        }
                    },
                    currAddrZipcode: {
                    	trigger: 'blur',
                    	selector: '.currAddrZipcode',
                    	validators: {
                            stringLength: {
                            	max: 20,
                                message: 'The current address zip code should be maximum 20 characters'
                            }
                        }
                    },
                    currAddrEmailAddr: {
                    	trigger: 'blur',
                    	selector: '.currAddrEmailAddr',
                        validators: {
                            emailAddress: {
                                message: 'Please enter a valid email address'
                            },
                            stringLength: {
                            	max: 100,
                                message: 'The email should be maximum 100 characters'
                            },
                            callback: {
                                message: 'The secondary email address cannot be the same as primary email address',
                                callback: function(value, validator, $field) {
                                	if(value === '') {
                                		return true;
                                	}
                                	var primary = $('.permAddrEmailAddr').val().toUpperCase();
                                	var secondary = $('.currAddrEmailAddr').val().toUpperCase();
                                	return primary !== secondary;
                                }
                            },
                            remote: {
                            	message: 'Email address already exists',
                            	url: 	MPMPROF.baseURL+'/mpmprof/checkMemberEmailAddress.go',
                                type: 'POST',
	                            data: function(validator) {
	                                return {
	                                    emailAddr: validator.getFieldElements('currAddr.emailAddr').val()
	                                };
	                            }
                            }
                        }
                    },
                    currAddrMobile: {
                    	trigger: 'blur',
                    	selector: '.currAddrMobile',
                        validators: {
                            callback: {
                                message: 'The mobile number is not valid',
                                callback: function(value, validator, $field) {
                                	if(value === '' || (value.split(' ').length == 1 && value.length <= 5)) {
                                		return true;
                                	}
                                    return $field.intlTelInput('isValidNumber');
                                }
                            },
                        	remote: {
                            	message: 'Mobile number already exists',
                            	url: 	MPMPROF.baseURL+'/mpmprof/checkUserMobileNumber.go',
                                type: 'POST',
                                data: function(validator) {
                                	var mobile = validator.getFieldElements('currAddr.mobile').val();
                                    return {
                                    	mobileNo: mobile
                                    };
                                }
                            }
                        }
                    },
                    educationQualification: {
                    	trigger: 'blur',
                    	selector: '.educationQualification',
                    	validators: {
                            notEmpty: {
                                message: 'Please select a qualification'
                            }
                        }
                    },
                    educationCourse: {
                    	trigger: 'blur',
                    	selector: '.educationCourse',
                    	validators: {
                            notEmpty: {
                                message: 'Please select a course'
                            }
                        }
                    },
                    educationBranch: {
                    	trigger: 'blur',
                    	selector: '.educationBranch',
                    	validators: {
                    		branchAdditionalInfo: {
                                    message: 'The additional info is required and cannot be empty'
                            },
                            validWord: {
                                	message: 'The additional info contains invalid words'
                            },
                            stringLength: {
                                	max: 100,
                                    message: 'The additional info should be maximum 100 characters'
                            }
                         }
                    },
                    educationPassoutYr: {
                    	trigger: 'blur',
                    	selector: '.educationPassoutYr',
                    	validators: {
                            notEmpty: {
                                message: 'The year of completion is required and cannot be empty'
                            },
                            between: {
                                min: 1900,
                                max: 2100,
                                message: 'The year of completion is invalid'
                            }
                        }
                    },
                    educationInstitute: {
                    	trigger: 'blur',
                    	selector: '.educationInstitute',
                    	validators: {
                            notEmpty: {
                                message: 'The institute is required and cannot be empty'
                            },
                            validWord: {
                            	message: 'The institute contains invalid words'
                            },
                            stringLength: {
                            	max: 100,
                                message: 'The institute should be maximum 100 characters'
                            }
                        }
                    },
                    occupation: {
                    	trigger: 'blur',
                        validators: {
                            notEmpty: {
                                message: 'Please select a occupation'
                            }
                        }
                    },
                    designation: {
                    	trigger: 'blur',
                        validators: {
                            designation: {
                                message: 'The designation is required and cannot be empty'
                            },
                            validWord: {
                            	message: 'The designation contains invalid words'
                            },
                            stringLength: {
                            	max: 100,
                                message: 'The designation should be maximum 100 characters'
                            }
                        }
                    },
                    department: {
                    	trigger: 'blur',
                        validators: {
                            validWord: {
                            	message: 'The department contains invalid words'
                            },
                            stringLength: {
                            	max: 100,
                                message: 'The department should be maximum 100 characters'
                            }
                        }
                    },
                    company: {
                    	trigger: 'blur',
                        validators: {
                            companyName: {
                            	message: 'The company name is required and cannot be empty'
                            },
                            validWord: {
                            	message: 'The company name contains invalid words'
                            },
                            stringLength: {
                            	max: 200,
                                message: 'The company name should be maximum 200 characters'
                            }
                        }
                    },
                    subscriptionAmt: {
                    	trigger: 'blur',
                        validators: {
                        	subscriptionAmt: {
                        		message: 'Invalid subscription amount'
                        	},
                            stringLength: {
                            	max: 8,
                                message: 'The subscription amount is too large'
                            }
                        }
                    },
                    termsAgreed: {
                        validators: {
                            notEmpty: {
                                message: 'Please read carefully and accept the terms and conditions'
                            }
                        }
                    },
                    /* end for registration form */

                    /* forget passsword form */
                    frgtEmail: {
                    	trigger: 'blur',
                    	validators: {
                            notEmpty: {
                                message: 'The email is required and cannot be empty'
                            },
                            emailAddress: {
                                message: 'Please enter a valid email address'
                            }
                        }
                    },
                    frgtSecAnsOne: {
                    	trigger: 'blur',
                    	validators: {
                            notEmpty: {
                                message: 'The answer is required and cannot be empty'
                            }
                        }
                    },
                    frgtSecAnsTwo: {
                    	trigger: 'blur',
                    	validators: {
                            notEmpty: {
                                message: 'The answer is required and cannot be empty'
                            }
                        }
                    }
                }
            }).on('success.form.bv, error.form.bv', function(e) {
            	ignoreRegistrationFields();
            }).on('success.field.bv', function(e, data) {
            	ignoreRegistrationFields();
            });
            
            var ignoreRegistrationFields = function(){
            	$(".permAddrSubArea").ignoreOptionalField();
            	$(".currAddrDoorNo").ignoreOptionalField();
            	$(".currAddrStreet").ignoreOptionalField();
            	$(".currAddrArea").ignoreOptionalField();
            	$(".currAddrSubArea").ignoreOptionalField();
            	$(".currAddrState").ignoreOptionalField();
            	$(".currAddrZipcode").ignoreOptionalField();
            	$(".currAddrMobile").ignoreOptionalField();
            	$(".currAddrEmailAddr").ignoreOptionalField();
            	$(".educationBranch").ignoreOptionalField();
            	$(".designation").ignoreOptionalField();
            	$(".department").ignoreOptionalField();
            	$(".company").ignoreOptionalField();
            	$(".subscriptionAmt").ignoreOptionalField();
            }
            
            $('#achieversForm').bootstrapValidator({
            	live: 'enabled',
                message: 'This value is not valid',
                excluded: [':disabled'],
                feedbackIcons: {
                	valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    achieverName: {
                    	trigger: 'blur',
                        validators: {
                            notEmpty: {
                                message: 'The achiever name is required and cannot be empty'
                            },
                            validWord: {
                            	message: 'The achiever name contains invalid words'
                            },
                            stringLength: {
                            	max: 100,
                                message: 'The achiever name should be maximum 100 characters'
                            },
                            regexp:{
                            	regexp:  /^([^0-9]*)$/,
                            	message: 'The achiever name should not contain digits'
                            }
                        }
                    },
                    shortDesc: {
                    	trigger: 'blur',
                        validators: {
                            notEmpty: {
                                message: 'The short description is required and cannot be empty'
                            },
                            validWord: {
                            	message: 'The short description contains invalid words'
                            },
                            stringLength: {
                            	max: 180,
                                message: 'The short description should be maximum 180 characters'
                            }
                        }
                    },
                    achievementDetails: {
                    	trigger: 'blur',
                        validators: {
		                    callback: {
		                        message: 'The achievement details is required and cannot be empty',
		                        callback: function() { return !($('.textarea').summernote('isEmpty')); }
		                    }
                        }
                    },
                    achieverImg: {
                        validators: {
            				file: {
                            	extension: 'jpg,jpeg,png,gif,bmp',
                                type: 'image/jpeg,image/png,image/gif,image/bmp',
                                maxSize: 3072 * 1024,   // 3 MB
                                message: 'The selected file should be jpg/png/gif/bmp with max 3MB size'
                            }
                        }
                    }
                }
             }) .on('success.form.bv, error.form.bv', function(e) {
               	 $("#achieverImg").ignoreOptionalField();
             }).on('success.field.bv', function(e, data) {
            	if (data.field === 'achieverImg') {
            		$("#achieverImg").ignoreOptionalField();
            	}
             });
            
            $('#articlePostForm').bootstrapValidator({
                live: 'enabled',
                message: 'This value is not valid',
                excluded: [':disabled'],
                feedbackIcons: {
                	valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    articleTitle: {
                    	trigger: 'blur',
                        validators: {
                            notEmpty: {
                                message: 'The article title is required and cannot be empty'
                            },
                            validWord: {
                            	message: 'The article title contains invalid words'
                            },
                            stringLength: {
                            	max: 180,
                                message: 'The article title should be maximum 180 characters'
                            }
                        }
                    },
                    articleCategory: {
                    	trigger: 'blur',
                        validators: {
                            notEmpty: {
                                message: 'Please choose article category'
                            }
                        }
                    },
                    articleContent: { 
                        validators: {
                            callback: {
                                message: 'The article content is required and cannot be empty',
                                callback: function() { return !($('.textarea').summernote('isEmpty')); }
                            }
                        }
                    },
                    articleSource: {
                    	trigger: 'blur',
                        validators: {
                            stringLength: {
                            	max: 200,
                                message: 'The article source should be maximum 200 characters'
                            }
                        }
                    },
                    articleAttachment: {
                        validators: {
                            file: {
                            	extension: 'jpg,jpeg,gif,tiff,png,bmp,pdf,doc,docx',
                                type: 'image/jpeg,image/gif,image/tiff,image/png,image/bmp,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                                maxSize: 3072 * 1024,   // 3 MB
                                message: 'The selected file should be jpg/png/gif/bmp/tiff/pdf/doc with max 3MB size'
                            }
                        }
                    }
                }
             }).on('success.form.bv, error.form.bv', function(e) {
            	 $("#articleAttachment").ignoreOptionalField();
            	 $('#articleSource').ignoreOptionalField();
             }).on('success.field.bv', function(e, data) {
            	if (data.field === 'articleAttachment') {
            		$("#articleAttachment").ignoreOptionalField();
            	}
            	if (data.field === 'articleSource') {
            		$("#articleSource").ignoreOptionalField();
            	}
             });
            
            $('#donateUsForm').bootstrapValidator({
                live: 'enabled',
                message: 'This value is not valid',
                feedbackIcons: {
                	valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    donorName: {
                    	trigger: 'blur',
                        validators: {
                            notEmpty: {
                                message: 'The name is required and cannot be empty'
                            },
                            validWord: {
                            	message: 'The name contains invalid words'
                            },
                            stringLength: {
                            	max: 100,
                                message: 'The name should be maximum 100 characters'
                            },
                            regexp:{
                            	regexp:  /^([^0-9]*)$/,
                            	message: 'The name should not contain digits'
                            }
                        }
                    }, 
                    donorMobile: {
                    	trigger: 'blur',
                        validators: {
		                    notEmpty: {
		                        message: 'The mobile number is required and cannot be empty'
		                    },
		                    callback: {
                                callback: function(value, validator, $field) {
                                	if(value === '') {
                                		return value === '';
                                	}
                                	if(value.split(' ').length === 1 && value.length <= 5){
                                		return {
                                			valid: false,
                                			message: 'The mobile number is empty or invalid'
                                		};
                                	}
                                    return {
                                    	valid: $field.intlTelInput('isValidNumber'),
                                    	message: 'The mobile number is not valid'
                                    };
                                }
                            }
                        }
                    },
                    donorAddress: {
                    	trigger: 'blur',
                    	validators: {
                            notEmpty: {
                                message: 'The address is required and cannot be empty'
                            },
                            validWord: {
                            	message: 'The address contains invalid words'
                            },
                            stringLength: {
                            	max: 200,
                                message: 'The address should be maximum 200 characters'
                            }
                        }
                   },
                   donorCountry: {
                	    trigger: 'blur',
                        validators: {
                            notEmpty: {
                            	message: 'Please select a country'
                            }
                        }
                    },
                    donorEmail: {
                    	trigger: 'blur',
                        validators: {
                            notEmpty: {
                                message: 'The email address is required and cannot be empty'
                            },
                            emailAddress: {
                                message: 'Please enter a valid email address'
                            },
                            stringLength: {
                            	max: 100,
                                message: 'The email address should be maximum 100 characters'
                            }
                        }
                    },
                    donationAmount: {
                    	trigger: 'blur',
                        validators: {
                            notEmpty: {
                                message: 'The donation amount is required and cannot be empty'
                            },
                            digits: {
                                message: 'The donation amount can only consist of numbers'
                            },                            
                            greaterThan: {
                            	value: 100,
                            	message: 'Please contribute at least Rs.100/- for donation'
                            },
                            stringLength: {
                            	max: 8,
                                message: 'The donation amount is too large'
                            }
                        }
                    },
                    donationType: {
                    	validators: {
                    		notEmpty: {
                                message: 'Please select contribution type'
                            }
                    	}
                    },
                    donationPaymentMode: {
                    	validators: {
                    		notEmpty: {
                                message: 'Please select mode of payment'
                            }
                    	}
                    }
                }
             });
            
            $('#volunteerForm').bootstrapValidator({
                live: 'enabled',
                message: 'This value is not valid',
                feedbackIcons: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                	volunteerName: {
                		trigger: 'blur',
                        validators: {
                            notEmpty: {
                                message: 'The name is required and cannot be empty'
                            },
                            validWord: {
                            	message: 'The name contains invalid words'
                            },
                            stringLength: {
                            	max: 100,
                                message: 'The name should be maximum 100 characters'
                            },
                            regexp:{
                            	regexp:  /^([^0-9]*)$/,
                            	message: 'The name should not contain digits'
                            }
                        }
                    },
                    volunteerGender: {
                    	trigger: 'blur',
                        validators: {
                            notEmpty: {
                                message: 'Please select a gender'
                            }
                        }
                    },
                    volunteerDOB: {
                    	trigger: 'blur',
                        validators: {
                            notEmpty: {
                                message: 'The date of birth is required and cannot be empty'
                            },
                            date: {
                                format: 'DD/MM/YYYY',
                                message: 'The date of birth is not a valid'
                            },
                            callback: {
                            	message: 'The date of birth does not look correct',
                                callback: function(value, validator) {
                                	if(value === ''){
                                		return true;
                                	}
	                            	var m = new moment(value, 'DD/MM/YYYY', true);
			                        if (!m.isValid()) {
			                           return true;
			                        }
			                        var sm = new moment('01/01/1900','DD/MM/YYYY', true);
	                                return m.isAfter(sm) && m.isBefore(moment().subtract(15, 'years'));
	                            }
	                        }
                        }
                    },
                    volunteerAddress: {
                    	trigger: 'blur',
                    	validators: {
                            notEmpty: {
                                message: 'The address is required and cannot be empty'
                            },
                            validWord: {
                            	message: 'The address contains invalid words'
                            },
                            stringLength: {
                            	max: 200,
                                message: 'The address should be maximum 200 characters'
                            }
                        }
                    },
                    volunteerCountry: {
                    	trigger: 'blur',
                    	validators: {
                            notEmpty: {
                                message: 'Please select a country'
                            }
                        }
                    },
                    volunteerProfession: {
                        validators: {
                            notEmpty: {
                                message: 'The profession is required and cannot be empty'
                            }
                        }
                    },
                    volunteerQualification: {
                    	trigger: 'blur',
                    	validators: {
                            notEmpty: {
                                message: 'The qualification is required and cannot be empty'
                            },
                            validWord: {
                            	message: 'The qualification contains invalid words'
                            },
                            stringLength: {
                            	max: 100,
                                message: 'The qualification should be maximum 100 characters'
                            }
                        }
                    }, 
                    volunteerInterest: {
                    	trigger: 'blur',
                        validators: {
                            notEmpty: {
                                message: 'The Area of interest is required and cannot be empty'
                            }
                        }
                    }, 
                    volunteerEmail:  {
                    	trigger: 'blur',
                        validators: {
                            notEmpty: {
                                message: 'The email address is required and cannot be empty'
                            },
                            emailAddress: {
                                message: 'Please enter a valid email address'
                            },
                            stringLength: {
                            	max: 100,
                                message: 'The email address should be maximum 100 characters'
                            }
                        }
                    },
                    volunteerMobile: {
                    	trigger: 'blur',
                        validators: {
		                    notEmpty: {
		                        message: 'The mobile number is required and cannot be empty'
		                    },
		                    callback: {
                                message: 'The mobile number is not valid',
                                callback: function(value, validator, $field) {
                                	if(value === '') {
                                		return value === '';
                                	}
                                	if(value.split(' ').length === 1 && value.length <= 5){
                                		return {
                                			valid: false,
                                			message: 'The mobile number is empty or invalid'
                                		};
                                	}
                                    return {
                                    	valid: $field.intlTelInput('isValidNumber'),
                                    	message: 'The mobile number is not valid'
                                    };
                                }
                            }
                        }
                    },
                    volunteerLocation: {
                    	trigger: 'blur',
                        validators: {
                            stringLength: {
                            	max: 200,
                                message: 'The present address should be maximum 200 characters'
                            },
                            validWord: {
                            	message: 'The present address contains invalid words'
                            }                            
                        }
                    },
                    volunteerTermsAgreed: {
                        validators: {
                            notEmpty: {
                                message: 'Please read carefully and accept the terms and conditions'
                            }
                        }
                    }
                }
            }).on('success.form.bv, error.form.bv', function(e) {
            	$('#volunteerLocation').ignoreOptionalField();
            }).on('success.field.bv', function(e, data) {
            	if (data.field === 'volunteerLocation') {
            	  $('#volunteerLocation').ignoreOptionalField();
            	}
            });
            
            $('#jobPostForm').bootstrapValidator({
                live: 'enabled',
                message: 'This value is not valid',
                excluded: [':disabled'],
                feedbackIcons: {
                	valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    jobPostCompany: {
                    	trigger: 'blur',
                        validators: {
                            notEmpty: {
                                message: 'The company name is required and cannot be empty'
                            },
                            validWord: {
                            	message: 'The company name contains invalid words'
                            },
                            stringLength: {
                            	max: 100,
                                message: 'The company name should be maximum 100 characters'
                            }
                        }
                    },
                    jobPostLocation: {
                    	trigger: 'blur',
                        validators: {
                            notEmpty: {
                                message: 'The job location is required and cannot be empty'
                            },
                            validWord: {
                            	message: 'The job location contains invalid words'
                            },
                            stringLength: {
                            	max: 200,
                                message: 'The job location should be maximum 200 characters'
                            }
                        }
                    },
                    jobPostExperience: {
                    	trigger: 'blur',
                        validators: {
                            notEmpty: {
                                message: 'The experience is required and cannot be empty'
                            }
                        }
                    },
                    jobPostDescription: {
                    	trigger: 'blur',
                        validators: {
		                    callback: {
		                        message: 'The description is required and cannot be empty',
		                        callback: function() { return !($('.textarea').summernote('isEmpty')); }
		                    }
                        }
                    },
                    jobPostSource: {
                    	trigger: 'blur',
                        validators: {
                            stringLength: {
                            	max: 200,
                                message: 'The job reference/source should be maximum 200 characters'
                            }
                        }
                    },
                    jobPostToBeExpiredDate: {
                    	trigger: 'blur',
                        validators: {
                            notEmpty: {
                                message: 'Please choose job expiry date'
                            },
                            date: {
                                format: 'DD/MM/YYYY',
                                message: 'The job expiry date is not a valid format'
                            },
                            callback: {
                                message: 'The job expiry date is invalid or cannot be past date',
                                callback: function(value, validator) {
                                	if(value === ''){
                                		return true;
                                	}
                                    var m = new moment(value, 'DD/MM/YYYY', true);
                                    if (!m.isValid()) {
                                        return true;
                                    }
                                    return m.isSame(moment(),'day') || m.isAfter(moment());
                                }
                            }
                        }
                    },
                    jobPostAttachment: {
                        validators: {
                            file: {
                            	extension: 'jpg,jpeg,gif,tiff,png,bmp,pdf,doc,docx',
                                type: 'image/jpeg,image/gif,image/tiff,image/png,image/bmp,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                                maxSize: 3072 * 1024,   // 3 MB
                                message: 'The selected file should be jpg/png/gif/bmp/tiff/pdf/doc with max 3MB size'
                            }
                        }
                    },
                }
             }).on('success.form.bv, error.form.bv', function(e) {
             	$('#jobPostAttachment').ignoreOptionalField();
             	$('#jobPostSource').ignoreOptionalField();
             }).on('success.field.bv', function(e, data) {
            	 if (data.field === 'jobPostAttachment') {
             	     $('#jobPostAttachment').ignoreOptionalField();
            	 }
            	 if (data.field === 'jobPostSource') {
             	    $('#jobPostSource').ignoreOptionalField();
            	 }
             });
            
            $('#eventPostForm').bootstrapValidator({
                live: 'enabled',
                message: 'This value is not valid',
                excluded: [':disabled'],
                feedbackIcons: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    eventTitle: {
                    	trigger: 'blur',
                        validators: {
                            notEmpty: {
                                message: 'The event title is required and cannot be empty'
                            },
                            validWord: {
                            	message: 'The event title contains invalid words'
                            },
                            stringLength: {
                            	max: 100,
                                message: 'The event title should be maximum 100 characters'
                            }
                        }
                    },
                    eventCategory: {
                    	trigger: 'blur',
                        validators: {
                            notEmpty: {
                                message: 'The event category is required and cannot be empty'
                            }
                        }
                    },
                    eventShortDesc: {
                    	trigger: 'blur',
                        validators: {
                            notEmpty: {
                                message: 'The short description is required and cannot be empty'
                            },
                            validWord: {
                            	message: 'The short description contains invalid words'
                            },
                            stringLength: {
                            	max: 180,
                                message: 'The short description should be maximum 180 characters'
                            }
                        }
                    },
                    eventDesc: {
                        validators: {
		                    callback: {
		                        message: 'The description is required and cannot be empty',
		                        callback: function() { return !($('.textarea').summernote('isEmpty')); }
		                    }
                        }
                    },
                    eventStartDate: {
                    	trigger: 'blur',
                        validators: {
                            notEmpty: {
                                message: 'The start date is required and cannot be empty'
                            },
                            date: {
                                format: 'DD/MM/YYYY',
                                message: 'The start date is not a valid format'                                
                            },
                            callback: {
                                message: 'Please check the start and end dates. Start date must be before end date',
                                callback: function(value, validator) {
                                	if(value === ''){
                                		return true;
                                	}
                                	var m = new moment(value, 'DD/MM/YYYY', true);
 		                            if (!m.isValid()) {
 		                                return true;
 		                            }
                                    var endDt = moment($('#EventEndDate').val(), 'DD/MM/YYYY',true);
                                    if (endDt.isValid()) {
                                    	return (m.isSame(moment(),'day') || m.isAfter(moment())) && (m.isSame(endDt) || m.isBefore(endDt));
     		                        }
                                    return (m.isSame(moment(),'day') || m.isAfter(moment()));
                                }
                            }
                        }
                    },
                    eventEndDate: {
                    	trigger: 'blur',
                        validators: {
                            notEmpty: {
                                message: 'The end date is required and cannot be empty'
                            }, 
                            date: {
                                format: 'DD/MM/YYYY',
                                message: 'The end date is not a valid format'
                            },
                            callback: {
                            	message: 'Please check the start and end dates. End date must be after start date',
                                callback: function(value, validator) {
                                	if(value === ''){
                                		return true;
                                	}
	                            	var m = new moment(value, 'DD/MM/YYYY', true);
			                        if (!m.isValid()) {
			                             return true;
			                        }
	                                var startDt = moment($('#EventStartDate').val(), 'DD/MM/YYYY',true);
	                                if (startDt.isValid()) {
	                                	return (m.isSame(moment(),'day') || m.isAfter(moment())) && (m.isSame(startDt) || m.isAfter(startDt));
		                            }
	                                return (m.isSame(moment(),'day') || m.isAfter(moment()));
	                            }
	                        }
                        }
                    },
                    eventAttachment: {
                        validators: {
                            file: {
                            	extension: 'jpg,jpeg,gif,tiff,png,bmp,pdf,doc,docx',
                                type: 'image/jpeg,image/gif,image/tiff,image/png,image/bmp,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                                maxSize: 3072 * 1024,   // 3 MB
                                message: 'The selected file should be jpg/png/gif/bmp/tiff/pdf/doc with max 3MB size'
                            }
                        }
                    }                	
                }
            }).on('success.form.bv, error.form.bv', function(e) {
            	$('#eventAttachment').ignoreOptionalField();
            }).on('success.field.bv', function(e, data) {
            	if (data.field === 'eventStartDate' && $('#EventEndDate').val() !== '' && !data.bv.isValidField('eventEndDate')) {
                    data.bv.revalidateField('eventEndDate');
                }
            	if (data.field === 'eventEndDate' && $('#EventStartDate').val() !== '' && !data.bv.isValidField('eventStartDate')) {
                    data.bv.revalidateField('eventStartDate');
                }
            	if (data.field === 'eventAttachment') {
               		$("#eventAttachment").ignoreOptionalField();
               	}
            });
            
            $('#userProfilePersonalForm').bootstrapValidator({
                live: 'enabled',
                message: 'This value is not valid',
                feedbackIcons: {
                	valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    profModalName: {
                    	trigger: 'blur',
                    	selector: '.profModalName',
                        validators: {
                            notEmpty: {
                                message: 'The name is required and cannot be empty'
                            },
                            validWord: {
                            	message: 'The name contains invalid words'
                            },
                            stringLength: {
                            	max: 100,
                                message: 'The name should be maximum 100 characters'
                            },
                            regexp:{
                            	regexp:  /^([^0-9]*)$/,
                            	message: 'The name should not contain digits'
                            }
                        }
                    }, 
                    profModalParentName: {
                    	trigger: 'blur',
                    	selector: '.profModalParentName',
                        validators: {
                            notEmpty: {
                                message: 'The parent name is required and cannot be empty'
                            },
                            validWord: {
                            	message: 'The parent name contains invalid words'
                            },
                            stringLength: {
                            	max: 100,
                                message: 'The parent name should be maximum 100 characters'
                            },
                            regexp:{
                            	regexp:  /^([^0-9]*)$/,
                            	message: 'The parent name should not contain digits'
                            }
                        }
                  },
                  profModalGender: {
                  	trigger: 'blur',
                  	selector: '.profModalGender',
                    validators: {
                          notEmpty: {
                              message: 'Please select a gender'
                          }
                      }
                  },
                  profModalDOB: {
                  	trigger: 'blur',
                  	selector: '.profModalDOB',
                    validators: {
                          notEmpty: {
                              message: 'The date of birth is required and cannot be empty'
                          }, 
                          date: {
                              format: 'DD/MM/YYYY',
                              message: 'The date is not a valid format'
                          },
                          callback: {
                          	message: 'The date of birth does not look correct',
                              callback: function(value, validator) {
                              	if(value === ''){
                              		return true;
                              	}
	                            	var m = new moment(value, 'DD/MM/YYYY', true);
			                        if (!m.isValid()) {
			                           return true;
			                        }
			                        var sm = new moment('01/01/1900','DD/MM/YYYY', true);
	                                return m.isAfter(sm) && m.isBefore(moment().subtract(15, 'years'));
	                            }
	                        }
                      }
                  }
                }
             });
            
            $('#userProfileContactForm').bootstrapValidator({
                live: 'enabled',
                message: 'This value is not valid',
                feedbackIcons: {
                	valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                	profModalPermAddrMobile: {
                		trigger: 'blur',
                		selector: '.profModalPermAddrMobile',
                        validators: {
                        	notEmpty: {
                                message: 'The mobile number is required and cannot be empty'
                            },
                        	callback: {
                                callback: function(value, validator, $field) {
                                	if(value === '') {
                                		return value === '';
                                	}
                                	if(value.length <= 5){
                                		return {
                                			valid: false,
                                			message: 'The mobile number is empty or invalid'
                                		};
                                	}
                                    return {
                                    	valid: $field.intlTelInput('isValidNumber'),
                                    	message: 'The mobile number is not valid'
                                    };
                                }
                            },
                        	remote: {
                            	message: 'Mobile number already exists',
                            	url: 	MPMPROF.baseURL+'/mpmprof/checkUserMobileNumber.go',
                                type: 'POST',
	                            data: function(validator) {
	                            	var mobile = validator.getFieldElements('personalDetails.contactDetails.mobile').val();
	                            	var savedMobile = $('.primary-mob-holder').html();
	                            	if(savedMobile === mobile){
	                            		mobile = '+91 000000000';
	                            	}
	                                return {
	                                	mobileNo: mobile
	                                };
	                            }
                            }
                        }
                    },
                    profModalPermAddrEmailAddr: {
                    	trigger: 'blur',
                    	selector: '.profModalPermAddrEmailAddr',
                        validators: {
                            notEmpty: {
                                message: 'The email address is required and cannot be empty'
                            },
                            emailAddress: {
                                message: 'Please enter a valid email address'
                            },
                            stringLength: {
                            	max: 100,
                                message: 'The email address should be maximum 100 characters'
                            },
                            callback: {
                                message: 'The primary email address cannot be the same as secondary email address',
                                callback: function(value, validator, $field) {
                                	if(value === '') {
                                		return true;
                                	}
                                	var primary = $('.profModalPermAddrEmailAddr').val().toUpperCase();
                                	var secondary = $('.profModalCurrAddrEmailAddr').val().toUpperCase();
                                    return primary !== secondary;
                                }
                            },
                            remote: {
                            	message: 'The email address already exists',
                            	url: 	MPMPROF.baseURL+'/mpmprof/checkMemberEmailAddress.go',
                                type: 'POST',
	                            data: function(validator) {
	                            	var email = validator.getFieldElements('personalDetails.contactDetails.emailAddress').val();
	                            	var savedEmail = $('.primary-email-holder').html();
	                            	if(savedEmail === email){
	                            		email = 'email_unavailable';
	                            	}
	                                return {
	                                    emailAddr: email
	                                };
	                            }
                            }
                        }
                    },
                    profModalCurrAddrMobile: {
                    	trigger: 'blur',
                    	selector: '.profModalCurrAddrMobile',
                        validators: {
                            callback: {
                                message: 'The mobile number is not valid',
                                callback: function(value, validator, $field) {
                                	if(value === '' || (value.split(' ').length == 1 && value.length <= 5)) {
                                		return true;
                                	}
                                    return $field.intlTelInput('isValidNumber');
                                }
                            },
                        	remote: {
                            	message: 'Mobile number already exists',
                            	url: 	MPMPROF.baseURL+'/mpmprof/checkUserMobileNumber.go',
                                type: 'POST',
                                data: function(validator) {
                                	var mobile = validator.getFieldElements('personalDetails.contactDetails.secondaryMobile').val();
                                	var savedMobile = $('.secondary-mob-holder').html();
	                            	if(savedMobile === mobile){
	                            		mobile = '+91 000000000';
	                            	}
                                    return {
                                    	mobileNo: mobile
                                    };
                                }
                            }
                        }
                  },
                  profModalCurrAddrEmailAddr: {
                    	trigger: 'blur',
                    	selector: '.profModalCurrAddrEmailAddr',
                        validators: {
                            emailAddress: {
                                message: 'Please enter a valid email address'
                            },
                            stringLength: {
                            	max: 100,
                                message: 'The email should be maximum 100 characters'
                            },
                            callback: {
                                message: 'The secondary email address cannot be the same as primary email address',
                                callback: function(value, validator, $field) {
                                	if(value === '') {
                                		return true;
                                	}
                                	var primary = $('.profModalPermAddrEmailAddr').val().toUpperCase();
                                	var secondary = $('.profModalCurrAddrEmailAddr').val().toUpperCase();
                                	return primary !== secondary;
                                }
                            },
                            remote: {
                            	message: 'Email address already exists',
                            	url: 	MPMPROF.baseURL+'/mpmprof/checkMemberEmailAddress.go',
                                type: 'POST',
	                            data: function(validator) {
	                                var email = validator.getFieldElements('personalDetails.contactDetails.secondaryEmail').val();
	                            	var savedEmail = $('.secondary-email-holder').html();
	                            	if(savedEmail === email){
	                            		email = 'email_unavailable';
	                            	}
	                                return {
	                                    emailAddr: email
	                                };
	                            }
                           }
                        }
                    }
                }
             }).on('success.form.bv, error.form.bv', function(e) {
            	 $(".profModalCurrAddrMobile").ignoreOptionalField();
             	 $(".profModalCurrAddrEmailAddr").ignoreOptionalField();
             }).on('success.field.bv', function(e, data) {
            	 $(".profModalCurrAddrMobile").ignoreOptionalField();
             	 $(".profModalCurrAddrEmailAddr").ignoreOptionalField();
             });
            
            $('#userProfileEducationForm').bootstrapValidator({
                live: 'enabled',
                message: 'This value is not valid',
                feedbackIcons: {
                	valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                	profModalEducationQualification: {
	                	trigger: 'blur',
	                	selector: '.profModalEducationQualification',
	                	validators: {
	                        notEmpty: {
	                            message: 'Please select a qualification'
	                        }
	                    }
	                },
	                profModalEducationCourse: {
	                	trigger: 'blur',
	                	selector: '.profModalEducationCourse',
	                	validators: {
	                        notEmpty: {
	                            message: 'Please select a course'
	                        }
	                    }
	                },
	                profModalEducationBranch: {
	                	trigger: 'blur',
	                	selector: '.profModalEducationBranch',
	                	validators: {
	                		branchAdditionalInfo: {
	                                message: 'The additional info is required and cannot be empty'
	                        },
	                        validWord: {
	                            	message: 'The additional info contains invalid words'
	                        },
	                        stringLength: {
	                            	max: 100,
	                                message: 'The additional info should be maximum 100 characters'
	                        }
	                     }
	                },
	                profModalEducationPassoutYr: {
	                	trigger: 'blur',
	                	selector: '.profModalEducationPassoutYr',
	                	validators: {
	                        notEmpty: {
	                            message: 'The year of completion is required and cannot be empty'
	                        },
	                        between: {
	                            min: 1900,
	                            max: 2100,
	                            message: 'The year of completion is invalid'
	                        }
	                    }
	                },
	                profModalEducationInstitute: {
	                	trigger: 'blur',
	                	selector: '.profModalEducationInstitute',
	                	validators: {
	                        notEmpty: {
	                            message: 'The institute is required and cannot be empty'
	                        },
	                        validWord: {
	                        	message: 'The institute contains invalid words'
	                        },
	                        stringLength: {
	                        	max: 100,
	                            message: 'The institute should be maximum 100 characters'
	                        }
	                    }
	                }
                }
             }).on('success.form.bv, error.form.bv', function(e) {
            	 $(".profModalEducationBranch").ignoreOptionalField();
             }).on('success.field.bv', function(e, data) {
            	 $(".profModalEducationBranch").ignoreOptionalField();
             });

            $('#userProfileEmploymentForm').bootstrapValidator({
                live: 'enabled',
                message: 'This value is not valid',
                feedbackIcons: {
                	valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    profModalOccupation: {
                    	trigger: 'blur',
                    	selector: '.profModalOccupation',
                        validators: {
                            notEmpty: {
                                message: 'Please select a occupation'
                            },
                            callback: {
                                message: 'Please contribute at least Rs.50/- monthly subscription. We advice Rs.100/-',
                                callback: function(value, validator, $field) {
                                	if(value === '') {
                                		return true;
                                	}
                                	var subAmt = $('#SubscriptionAmt').val();
                                	return value === 'Student' || parseInt(subAmt) >= MPMPROF.mpmprofMinAmt;
                                }
                            }
                        }
                    },
                    profModalDesignation: {
                    	trigger: 'blur',
                    	selector: '.profModalDesignation',
                        validators: {
                            designation: {
                                message: 'The designation is required and cannot be empty'
                            },
                            validWord: {
                            	message: 'The designation contains invalid words'
                            },
                            stringLength: {
                            	max: 100,
                                message: 'The designation should be maximum 100 characters'
                            }
                        }
                    },
                    profModalDepartment: {
                    	trigger: 'blur',
                    	selector: '.profModalDepartment',
                        validators: {
                            validWord: {
                            	message: 'The department contains invalid words'
                            },
                            stringLength: {
                            	max: 100,
                                message: 'The department should be maximum 100 characters'
                            }
                        }
                    },
                    profModalCompany: {
                    	trigger: 'blur',
                    	selector: '.profModalCompany',
                        validators: {
                            companyName: {
                            	message: 'The company name is required and cannot be empty'
                            },
                            validWord: {
                            	message: 'The company name contains invalid words'
                            },
                            stringLength: {
                            	max: 200,
                                message: 'The company name should be maximum 200 characters'
                            }
                        }
                    }
                }
             }).on('success.form.bv, error.form.bv', function(e) {
            	$(".profModalDesignation").ignoreOptionalField();
            	$(".profModalDepartment").ignoreOptionalField();
            	$(".profModalCompany").ignoreOptionalField();
             }).on('success.field.bv', function(e, data) {
            	$(".profModalDesignation").ignoreOptionalField();
             	$(".profModalDepartment").ignoreOptionalField();
             	$(".profModalCompany").ignoreOptionalField();
             });
            
            $('#userProfilePermAddrForm').bootstrapValidator({
                live: 'enabled',
                message: 'This value is not valid',
                feedbackIcons: {
                	valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                	profModalPermAddrDoorNo: {
                    	trigger: 'blur',
                    	selector: '.profModalPermAddrDoorNo',
                        validators: {
                            notEmpty: {
                                message: 'The door no is required and cannot be empty'
                            },
                            stringLength: {
                            	max: 20,
                                message: 'The door no should be maximum 20 characters'
                            }
                        }
                    },
                    profModalPermAddrStreet: {
                    	trigger: 'blur',
                    	selector: '.profModalPermAddrStreet',
                        validators: {
                            notEmpty: {
                                message: 'The street is required and cannot be empty'
                            },
                            validWord: {
                            	message: 'The street contains invalid words'
                            },
                            stringLength: {
                            	max: 200,
                                message: 'The street should be maximum 200 characters'
                            }
                        }
                    },
                    profModalPermAddrArea: {
                    	trigger: 'blur',
                    	selector: '.profModalPermAddrArea',
                        validators: {
                            notEmpty: {
                                message: 'The area is required and cannot be empty'
                            },
                            validWord: {
                            	message: 'The area contains invalid words'
                            },
                            stringLength: {
                            	max: 300,
                                message: 'The area should be maximum 300 characters'
                            }
                        }
                    },
                    profModalPermAddrSubArea: {
                    	trigger: 'blur',
                    	selector: '.profModalPermAddrSubArea',
                        validators: {
                            validWord: {
                            	message: 'The sub area contains invalid words'
                            },
                            stringLength: {
                            	max: 300,
                                message: 'The sub area should be maximum 300 characters'
                            }
                        }
                    },
                    profModalPermAddrCountry: {
                    	trigger: 'blur',
                    	selector: '.profModalPermAddrCountry',
                    	validators: {
                            notEmpty: {
                                message: 'Please select a country'
                            }
                        }
                    },
                    profModalPermAddrCity: {
                    	trigger: 'blur',
                    	selector: '.profModalPermAddrCity',
                        validators: {
                            notEmpty: {
                                message: 'Please select a city'
                            }
                        }
                    },
                    profModalPermAddrState: {
                    	trigger: 'blur',
                    	selector: '.profModalPermAddrState',
                    	validators: {
                            notEmpty: {
                                message: 'The state is required and cannot be empty'
                            },
                            validWord: {
                            	message: 'The state contains invalid words'
                            },
                            stringLength: {
                            	max: 100,
                                message: 'The state should be maximum 100 characters'
                            }
                        }
                    },
                    profModalPermAddrZipcode: {
                    	trigger: 'blur',
                    	selector: '.profModalPermAddrZipcode',
                    	validators: {
                            notEmpty: {
                                message: 'The zip code is required and cannot be empty'
                            },
                            stringLength: {
                            	max: 20,
                                message: 'The zip code should be maximum 20 characters'
                            }
                        }
                    }
                }
            }).on('success.form.bv, error.form.bv', function(e) {
            	$(".profModalPermAddrSubArea").ignoreOptionalField();
            }).on('success.field.bv', function(e, data) {
            	$(".profModalPermAddrSubArea").ignoreOptionalField();
            });
            
            $('#userProfileCurrAddrForm').bootstrapValidator({
                live: 'enabled',
                message: 'This value is not valid',
                feedbackIcons: {
                	valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
            		profModalCurrAddrDoorNo: {
                    	trigger: 'blur',
                    	selector: '.profModalCurrAddrDoorNo',
                        validators: {
                            stringLength: {
                            	max: 20,
                                message: 'The current address door no should be maximum 20 characters'
                            }
                        }
                    },
                    profModalCurrAddrStreet: {
                    	trigger: 'blur',
                    	selector: '.profModalCurrAddrStreet',
                        validators: {
                            validWord: {
                            	message: 'The current address street contains invalid words'
                            },
                            stringLength: {
                            	max: 200,
                                message: 'The current address street should be maximum 200 characters'
                            }
                        }
                    },
                    profModalCurrAddrArea: {
                    	trigger: 'blur',
                    	selector: '.profModalCurrAddrArea',
                        validators: {
                            validWord: {
                            	message: 'The current address area contains invalid words'
                            },
                            stringLength: {
                            	max: 300,
                                message: 'The current address area should be maximum 300 characters'
                            }
                        }
                    },
                    profModalCurrAddrSubArea: {
                    	trigger: 'blur',
                    	selector: '.profModalCurrAddrSubArea',
                        validators: {
                            validWord: {
                            	message: 'The current address sub area contains invalid words'
                            },
                            stringLength: {
                            	max: 300,
                                message: 'The current address sub area should be maximum 300 characters'
                            }
                        }
                    },
                    profModalCurrAddrState: {
                    	trigger: 'blur',
                    	selector: '.profModalCurrAddrState',
                    	validators: {
                            validWord: {
                            	message: 'The current address state contains invalid words'
                            },
                            stringLength: {
                            	max: 100,
                                message: 'The current address state should be maximum 100 characters'
                            }
                        }
                    },
                    profModalCurrAddrZipcode: {
                    	trigger: 'blur',
                    	selector: '.profModalCurrAddrZipcode',
                    	validators: {
                            stringLength: {
                            	max: 20,
                                message: 'The current address zip code should be maximum 20 characters'
                            }
                        }
                    }
                }
             }).on('success.form.bv, error.form.bv', function(e) {
            	$(".profModalCurrAddrDoorNo").ignoreOptionalField();
              	$(".profModalCurrAddrStreet").ignoreOptionalField();
              	$(".profModalCurrAddrArea").ignoreOptionalField();
              	$(".profModalCurrAddrSubArea").ignoreOptionalField();
              	$(".profModalCurrAddrState").ignoreOptionalField();
              	$(".profModalCurrAddrZipcode").ignoreOptionalField();
             }).on('success.field.bv', function(e, data) {
            	$(".profModalCurrAddrDoorNo").ignoreOptionalField();
             	$(".profModalCurrAddrStreet").ignoreOptionalField();
             	$(".profModalCurrAddrArea").ignoreOptionalField();
             	$(".profModalCurrAddrSubArea").ignoreOptionalField();
             	$(".profModalCurrAddrState").ignoreOptionalField();
             	$(".profModalCurrAddrZipcode").ignoreOptionalField();
             });
            
            $('#userProfileContribForm').bootstrapValidator({
                live: 'enabled',
                message: 'This value is not valid',
                feedbackIcons: {
                	valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                	profModalSubAmt: {
                    	trigger: 'blur',
                    	selector: '.profModalSubAmt',
                        validators: {
                        	stringLength: {
                            	max: 8,
                                message: 'The subscription amount is too large'
                            },
                            subscriptionAmt: {
                                message: 'Invalid subscription amount'
                            }
                        }
                    }
                }
             }).on('success.form.bv, error.form.bv', function(e) {
             	$(".profModalSubAmt").ignoreOptionalField();
             }).on('success.field.bv', function(e, data) {
             	$(".profModalSubAmt").ignoreOptionalField();
             });
            
            $('#contactUsForm').bootstrapValidator({
                live: 'enabled',
                message: 'This value is not valid',
                feedbackIcons: {
                	valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    contactName: {
                    	trigger: 'blur',
                        validators: {
                            notEmpty: {
                                message: 'The name is required and cannot be empty'
                            },
                            validWord: {
                            	message: 'The name contains invalid words'
                            },
                            stringLength: {
                            	max: 100,
                                message: 'The name should be maximum 100 characters'
                            },
                            regexp:{
                            	regexp:  /^([^0-9]*)$/,
                            	message: 'The name should not contain digits'
                            }
                        }
                    }, 
                    contactMobile: {
                    	trigger: 'blur',
                        validators: {
		                    notEmpty: {
		                        message: 'The mobile number is required and cannot be empty'
		                    },
		                    callback: {
                                message: 'The mobile number is not valid',
                                callback: function(value, validator, $field) {
                                	if(value === '') {
                                		return value === '';
                                	}
                                	if(value.split(' ').length === 1 && value.length <= 5){
                                		return {
                                			valid: false,
                                			message: 'The mobile number is empty or invalid'
                                		};
                                	}
                                    return {
                                    	valid: $field.intlTelInput('isValidNumber'),
                                    	message: 'The mobile number is not valid'
                                    };
                                }
                            }
                        }
                    },
                    contactCountry: {
                    	trigger: 'blur',
                        validators: {
                            notEmpty: {
                            	message: 'Please select a country'
                            }
                        }
                    },
                    contactEmail: {
                    	trigger: 'blur',
                        validators: {
                            notEmpty: {
                                message: 'The email address is required and cannot be empty'
                            },
                            emailAddress: {
                                message: 'Please enter a valid email address'
                            },
                            stringLength: {
                            	max: 100,
                                message: 'The email address should be maximum 100 characters'
                            }
                        }
                    },
                    contactType: {
                        validators: {
                            notEmpty: {
                            	message: 'Please select a query type'
                            }
                        }
                    },
                    contactMessage: {
                    	trigger: 'blur',
                        validators: {
                            notEmpty: {
                            	message: 'The message is required and cannot be empty'
                            },
                            validWord: {
                            	message: 'The message contains invalid words'
                            },
                            stringLength: {
                            	max: 500,
                                message: 'The message should be maximum 500 characters'
                            }
                        }
                    }
                }
             });
            
            $('#advertisementForm').bootstrapValidator({
            	live: 'enabled',
            	message: 'This value is not valid',
            	feedbackIcons: {
            		valid: 'glyphicon glyphicon-ok',
            		invalid: 'glyphicon glyphicon-remove',
            		validating: 'glyphicon glyphicon-refresh'
            	},
            	fields: {
            		title: {
            			trigger: 'blur',
            			validators: {
            				notEmpty: {
            					message: 'The advertisement title is required and cannot be empty'
            				},
                            validWord: {
                            	message: 'The advertisement title contains invalid words'
                            },
                            stringLength: {
                            	max: 100,
                                message: 'The advertisement title should be maximum 100 characters'
                            }
            			}
            		},
            		description: {
            			trigger: 'blur',
            			validators: {
            				notEmpty: {
            					message: 'The advertisement description is required and cannot be empty'
            				},
                            validWord: {
                            	message: 'The advertisement description contains invalid words'
                            },
                            stringLength: {
                            	max: 300,
                                message: 'The advertisement description should be maximum 300 characters'
                            }
            			}
            		},
            		validity: {
            			trigger: 'blur',
            			validators: {
            				notEmpty: {
            					message: 'The advertisement validity date is required and cannot be empty'
            				}, 
            				date: {
            					format: 'DD/MM/YYYY',
            					message: 'The advertisement validity date is not a valid'
            				},
            				callback: {
		                        message: 'The advertisement validity date cannot be past date',
		                        callback: function(value, validator) {
		                        	if(value === ''){
                                		return true;
                                	}
		                            var m = new moment(value, 'DD/MM/YYYY', true);
		                            if (!m.isValid()) {
		                                return true;
		                            }
		                            return m.isSame(moment(),'day') || m.isAfter(moment());
		                        }
		                    }
            			}
            		},
            		adImgContent: {
            			validators: {
            				notEmpty: {
            					message: 'The advertisement image is required and cannot be empty'
            				},
            				file: {
            					extension: 'jpg,jpeg,png,gif',
                                type: 'image/jpeg,image/png,image/gif',
                                maxSize: 3072 * 1024,   // 3 MB
            					message: 'The selected file should be jpg/png/gif with max 3MB size'
            				}
            			}
            		},
            		externalLink: {
            			trigger: 'blur',
            			validators: {
            				stringLength: {
                            	max: 200,
                                message: 'The advertisement link should be maximum 200 characters'
                            },  
            				regexp:{
                            	regexp:  /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/,
                            	message: 'Please enter valid url'
                            }
                            //Shorten the display in dashboard
            			}
            		},
            		adLocation: {
            			validators: {
            				notEmpty: {
            					message: 'The advertisement location is required and cannot be empty'
            				}
            			}
            		}
            	}
            }).on('success.form.bv, error.form.bv', function(e) {
            	$('#externalLink').ignoreOptionalField();
            }).on('success.field.bv', function(e, data) {
            	if (data.field === 'externalLink') {
            	  $('#externalLink').ignoreOptionalField();
            	}
            });
            
            $('#galleryForm').bootstrapValidator({
            	live: 'enabled',
            	message: 'This value is not valid',
            	feedbackIcons: {
            		valid: 'glyphicon glyphicon-ok',
            		invalid: 'glyphicon glyphicon-remove',
            		validating: 'glyphicon glyphicon-refresh'
            	},
            	fields: {
            		title: {
                    	trigger: 'blur',
                        validators: {
                            stringLength: {
                            	max: 150,
                                message: 'The title should be maximum 150 characters'
                            },
                            validWord: {
                            	message: 'The title contains invalid words'
                            }                            
                        }
                    },
                    footer: {
                    	trigger: 'blur',
                        validators: {
                            stringLength: {
                            	max: 150,
                                message: 'The footer should be maximum 150 characters'
                            },
                            validWord: {
                            	message: 'The footer contains invalid words'
                            }                            
                        }
                    },
            		programYear: {
            			validators: {
            				notEmpty: {
            					message: 'Please select a program year'
            				}
            			}
            		},
            		programName: {
            			validators: {
            				notEmpty: {
            					message: 'Please select a event/program'
            				}
            			}
            		},
            		photo: {
            			validators: {
            				notEmpty: {
            					message: 'The photo is required and cannot be empty'
            				},
            				file: {
            					extension: 'jpg,jpeg,png,gif',
                                type: 'image/jpeg,image/png,image/gif',
                                maxSize: 3072 * 1024,   // 3 MB
            					message: 'The selected file should be jpg/png/gif with max 3MB size'
            				}
            			}
            		}
            	}
            }).on('success.form.bv, error.form.bv', function(e) {
            	$('#title').ignoreOptionalField();
            	$('#footer').ignoreOptionalField();
            }).on('success.field.bv', function(e, data) {
            	if (data.field === 'title') {
            	  $('#title').ignoreOptionalField();
            	}
            	if (data.field === 'footer') {
              	  $('#footer').ignoreOptionalField();
              	}
            });

            $('#changeRoleForm').bootstrapValidator({
                live: 'enabled',
                message: 'This value is not valid',
                feedbackIcons: {
                	valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                	memberId: {
                		trigger: 'blur',
                        validators: {
                            notEmpty: {
                                message: 'Please select the username to change role'
                            }
                        }
                    },
                    roleId: {
                    	trigger: 'blur',
                        validators: {
                            notEmpty: {
                                message: 'Please select the role name'
                            }
                        }
                    }
                }
             });
            
             $('#updateRemarksForm').bootstrapValidator({
                live: 'enabled',
                message: 'This value is not valid',
                feedbackIcons: {
                	valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                	remarks: {
                		trigger: 'blur',
                        validators: {
                        	validWord: {
                            	message: 'The remarks contains invalid words'
                            },
                            stringLength: {
                            	max: 1000,
                                message: 'The remarks should be maximum 1000 characters'
                            }
                        }
                    }
                }
             });
             
         	$('#shareUsForm').bootstrapValidator({
                live: 'enabled',
                message: 'This value is not valid',
                feedbackIcons: {
                	valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    friendEmail: {
                    	trigger: 'blur',
                    	validators: {
                    		notEmpty: {
                                message: 'The email address is required and cannot be empty'
                            },
                            emailAddress: {
                                message: 'Please enter a valid email address'
                            },
                            stringLength: {
                            	max: 100,
                                message: 'The email address should be maximum 100 characters'
                            }
                        }
                    }
                }
             });
            
            $('#resetButton').on('click touchstart', function() {
                $('#forgotPwdForm, #userRegistrationForm, #donateUsForm, #volunteerForm, #contactUsForm, #changePasswordForm, #changeSecretQuestionsForm, #resetPwdForm, #jobPostForm, #articlePostForm, #eventPostForm, #achieversForm, #advertisementForm, #galleryForm, #shareUsForm, #updateRemarksForm').data('bootstrapValidator').resetForm(true);
            	
                $(this).closest('form').find("input, textarea").not(":hidden, :radio, :checkbox").attr('value', function(){
            		if($(this).is('textarea')) { 
            			$(this).text('');   
            	    }
            		return '';
            	});
            	
            	$(this).closest('form').find("select").not(":hidden").each(function(){
            		var that = $(this);
            		var values = [];
            	    that.children('option').each(function(){
            	    	values.push($(this).val());
            		});
            	    that.empty();
            	    $.each(values, function(index, val){
            	    	var html = val;
            	    	if(val === ''){
            	    		html = 'Select';
            	    	}
            	    	that.append($('<option></option>').val(val).html(html));
            	    });
            	});
            	
            	//Summernote textarea reset
            	$('.textarea').summernote('reset');
            	
            	$('.alert').hide(); //Hide Alerts if any
            	
            	var formId = $(this).closest('form').attr("id");
            	if(formId === 'userRegistrationForm'){
            		$("#CurrAddrSection").fadeIn();
            		$("#PwdStrength").resetPwdIndicator();
            	}
            	
            	if(formId === 'donateUsForm'){
            		$("#OfflineInfo,#OnlineInfo").removeClass('show').addClass('hide');            		
            	}
            	
            	if(formId === 'changePasswordForm' || formId === 'resetPwdForm'){
            		$("#PwdStrength").resetPwdIndicator();
            	}
            	
            });
            
            $("#LoginBox").on('hide.bs.modal', function () {
            	$('#loginForm').data('bootstrapValidator').resetForm(true);
            	$('.alert').hide(); //Hide Alerts if any
            });	
            
            $("#ProfilePersonalBox").on('hide.bs.modal', function () {
            	$('#userProfilePersonalForm').data('bootstrapValidator').resetForm(true);
            	$('#userProfilePersonalForm')[0].reset();
            	$('.alert').hide(); //Hide Alerts if any
            	
            	var gender = $('.gender-holder').html();
            	$('input[type="radio"][value="'+gender+'"]').attr("checked", "checked");
            	
            	if(upPersonalDetailsValidationError){
            		$('.profModalName').val($('.full-name-holder').html());
            		$('.profModalParentName').val($('.parent-name-holder').html());
            		$('.profModalDOB').val($('.dob-holder').html());
            	}
            });
            
            $("#ProfileContactBox").on('hide.bs.modal', function () {
            	$('#userProfileContactForm').data('bootstrapValidator').resetForm(true);
            	$('#userProfileContactForm')[0].reset();
            	$('.alert').hide(); //Hide Alerts if any
            	if(upContactDetailsValidationError){
            		var whatsApp = $('.primary-whatsapp-holder').html();
                	$('input[class="primaryWhatsapp"][value="'+whatsApp+'"]').attr("checked", "checked");
            		$('.profModalPermAddrMobile').val($('.primary-mob-holder').html());
            		$('.profModalPermAddrEmailAddr').val($('.primary-email-holder').html());
            		whatsApp = $('.secondary-whatsapp-holder').html();
            		$('input[class="secondaryWhatsapp"][value="'+whatsApp+'"]').attr("checked", "checked");
            		$('.profModalCurrAddrMobile').val($('.secondary-mob-holder').html());
            		$('.profModalCurrAddrEmailAddr').val($('.secondary-email-holder').html());
            	}
            });
            
            $("#ProfileEducationBox").on('hide.bs.modal', function () {
            	$('#userProfileEducationForm').data('bootstrapValidator').resetForm(true);
            	$('#userProfileEducationForm')[0].reset();
            	$('.alert').hide(); //Hide Alerts if any
            	if(upEducationDetailsValidationError){
            		$('.profModalEducationQualification').val($('.qualification-holder').html());
            		$('.profModalEducationBranch').val($('.branch-holder').html());
            		$('.profModalEducationPassoutYr').val($('.passout-holder').html());
            		$('.profModalEducationInstitute').val($('.institute-holder').html());
            	}
            	$(".profModalEducationQualification").profEducationQualFn();
            }).on('show.bs.modal', function() {
            	$('.profModalEducationCourse').val($('.course-holder').html());
            });
            
            $("#ProfileEmploymentBox").on('hide.bs.modal', function () {
            	$('#userProfileEmploymentForm').data('bootstrapValidator').resetForm(true);
            	$('#userProfileEmploymentForm')[0].reset();
            	$('.alert').hide(); //Hide Alerts if any
            	if(upEmploymentDetailsValidationError){
            		$('.profModalOccupation').val($('.occupation-holder').html());
            		$('.profModalDesignation').val($('.designation-holder').html());
            		$('.profModalDepartment').val($('.department-holder').html());
            		$('.profModalCompany').val($('.company-holder').html());
            	}
            	$("#Designation,#Department,#Company").removeAttr("disabled");
            	if($(".profModalOccupation").val() === "Student"){
        	    	$("#Designation,#Department,#Company").attr("disabled", "disabled").val('');
        	   	}
            });
            
            $("#ProfilePermAddressBox").on('hide.bs.modal', function () {
            	$('#userProfilePermAddrForm').data('bootstrapValidator').resetForm(true);
            	$('#userProfilePermAddrForm')[0].reset();
            	$('.alert').hide(); //Hide Alerts if any
            	if(upPermanentAddressValidationError){
            		$('.profModalPermAddrDoorNo').val($('.perm-door-holder').html());
            		$('.profModalPermAddrStreet').val($('.perm-street-holder').html());
            		$('.profModalPermAddrSubArea').val($('.perm-subarea-holder').html());
            		$('.profModalPermAddrArea').val($('.perm-area-holder').html());
            		$('.profModalPermAddrState').val($('.perm-state-holder').html());
            		$('.profModalPermAddrCountry').val($('.perm-country-holder').html());
            		$('.profModalPermAddrZipcode').val($('.perm-zipcode-holder').html());
            	}
            	$("#ProfModalPermAddrCountry").cityPickerFn('ProfModalPermAddrCity');
            }).on('show.bs.modal', function() {
            	$('.profModalPermAddrCity').val($('.perm-city-holder').html());
            });
            
            $("#ProfileCurrAddressBox").on('hide.bs.modal', function () {
            	$('#userProfileCurrAddrForm').data('bootstrapValidator').resetForm(true);
            	$('#userProfileCurrAddrForm')[0].reset();
            	$('.alert').hide(); //Hide Alerts if any
            	if(upCurrentAddressValidationError){
            		$('.profModalCurrAddrDoorNo').val($('.curr-door-holder').html());
            		$('.profModalCurrAddrStreet').val($('.curr-street-holder').html());
            		$('.profModalCurrAddrSubArea').val($('.curr-subarea-holder').html());
            		$('.profModalCurrAddrArea').val($('.curr-area-holder').html());
            		$('.profModalCurrAddrState').val($('.curr-state-holder').html());
            		$('.profModalCurrAddrCountry').val($('.curr-country-holder').html());
            		$('.profModalCurrAddrZipcode').val($('.curr-zipcode-holder').html());
            	}
            	$("#ProfModalCurrAddrCountry").cityPickerFn('ProdModalCurrAddrCity');
            }).on('show.bs.modal', function() {
            	$('.profModalCurrAddrCity').val($('.curr-city-holder').html());
            });
            
            $("#ProfileContribBox").on('hide.bs.modal', function () {
            	$('#userProfileContribForm').data('bootstrapValidator').resetForm(true);
            	$('#userProfileContribForm')[0].reset();
            	$('.alert').hide(); //Hide Alerts if any
            	if(upContribDetailsValidationError){
            		$('.profModalSubAmt').val($('.sub-amt-holder').html());
            	}
            });	

        };
        
        /* Initiate Function */
        var initFunction = function() {
            validationRules(); 
        };

        /* Return public properties/methods */
        return {
            initFunction: initFunction
        };

    }());

}(window, document, jQuery, MPMPROF));

(function($) {
	   $.fn.bootstrapValidator.validators.designation = {
		    /**
		     * Return true if the input value is empty and occupation is other than employed
		     *
		     * @param {BootstrapValidator} validator Validate plugin instance
		     * @param {jQuery} $field Field element
		     * @param {Object} [options]
		     * @returns {Boolean}
		     */
		    validate: function(validator, $field, options) {
		    	var occu = $('#UserOccupation').val(), emp = 'Employed';
	          
	    		if ($field.val() === '') {
	                return {
	                	valid: occu != emp, //Not mandatory for fields other than employed
	                    message: options.message
	                };
	            }
	    		
	    		return {
	    			valid: true,
	    			message: options.message
	    		};
	        }		
	   };
}(window.jQuery));

(function($) {
	   $.fn.bootstrapValidator.validators.companyName = {
		    /**
		     * Return true if the input value is empty and occupation is other than employed and self-employed
		     *
		     * @param {BootstrapValidator} validator Validate plugin instance
		     * @param {jQuery} $field Field element
		     * @param {Object} [options]
		     * @returns {Boolean}
		     */
		    validate: function(validator, $field, options) {
	    		var occu = $('#UserOccupation').val(), emp = 'Employed', selfEmp = 'Self-Employed';
	          
	    		if ($field.val() === '') {
	                return {
	                	valid: occu != emp && occu != selfEmp, //Not mandatory for fields other than employed and self-employed
	                    message: options.message
	                };
	            }
	    		
	    		return {
	    			valid: true,
	    			message: options.message
	    		};
	        }		
	   };
}(window.jQuery));

(function($) {
	   $.fn.bootstrapValidator.validators.branchAdditionalInfo = {
		    /**
		     * Return true if the input value matches other than UG, PG, Research
		     *
		     * @param {BootstrapValidator} validator Validate plugin instance
		     * @param {jQuery} $field Field element
		     * @param {Object} [options]
		     * @returns {Boolean}
		     */
		    validate: function(validator, $field, options) {
	    		var eduQual = $('#EducationQualification').val();
	    		var ug = 'Under Graduate(UG)', pg = 'Post Graduate(PG)', res = 'Research';
	          
	    		if ($field.val() === '') {
	                return {
	                	valid: eduQual != ug && eduQual != pg && eduQual != res, //Not mandatory for fields other than ug, pg, research
	                    message: options.message
	                };
	            }
	    		
	    		return {
	    			valid: true,
	    			message: options.message
	    		};
	        }		
	   };
}(window.jQuery));

(function($) {
	$.fn.bootstrapValidator.validators.validWord = {
	    /**
	     * Return true if the input value contains valid word in description
	     *
	     * @param {BootstrapValidator} validator Validate plugin instance
	     * @param {jQuery} $field Field element
	     * @param {Object} [options]
	     * @returns {Boolean}
	     */
		validate: function(validator, $field, options) {
			var value = $field.val();
			
    		if (value === '') {
				return true;
			}
    		
    		var $valid = true;
    		var words = value.split(" ");
    		$.each(words, function(index, val){
    			if(val.trim().length > validWordLength){
    				$valid = false;
    				return;
    			}
    		});
    		
    		return {
            	valid: $valid,
            	message: options.message
            };
	    }
  	};
}(window.jQuery));

(function($) {
   $.fn.bootstrapValidator.validators.subscriptionAmt = {
	    /**
	     * Return true if the input value contains digits only
	     *
	     * @param {BootstrapValidator} validator Validate plugin instance
	     * @param {jQuery} $field Field element
	     * @param {Object} [options]
	     * @returns {Boolean}
	     */
	    validate: function(validator, $field, options) {
    		var userOccupation = $('#UserOccupation').val();
    		var value = $field.val();
          
    		if (value === '') {
                return {
                	valid: userOccupation === "Student", //Not mandatory for students
                    message: 'The subscription amount is required and cannot be empty'
                };
            }

    		var isNumericValue = /^\d+$/.test(value);
            return  isNumericValue ? 
            		{ 
            		   valid: parseInt(value) >= MPMPROF.mpmprofMinAmt,
            		   message: 'Please contribute at least Rs.50/- monthly subscription. We advice Rs.100/-'
            		} :
            		{
            		   valid: false,
                 	   message: 'The subscription amount can only consist of numbers'
            		};	
        }		
   };
}(window.jQuery));

/* Bind the validation utilities function to document load */
jQuery(MPMPROF.validationUtil.initFunction);
