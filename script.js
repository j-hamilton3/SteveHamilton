/********w************
    
	Project 4 Javascript
	Name: James Hamilton
	Date: April 26th, 2023
	Description: A web page for musician Steve Hamilton.

*********************/

/*
 * Determines if a field has input
 *
 * param   field A text field input element
 * return  True if the field contains input; False if it contains no input
 */
function fieldHasInput(field) {
	if (field.value == null || field.value.trim() == "") {
		return false;
	}

	return true;
}

/*
 * Hides all of the error elements.
 */
function hideErrors() {
	// Get an array of error elements
	let error = document.getElementsByClassName("error");

	// Loop through each element in the error array
	for (let i = 0; i < error.length; i++) {
		// Hide the error element by setting it's display style to "none"
		error[i].style.display = "none";
	}
}

/*
 * Handles the submit event of the survey form
 *
 * param e  A reference to the event object
 * return   True if no validation errors; False if the form has
 *          validation errors
 */
function validate(e) {
	// Hides all error elements on the page
	hideErrors();

	// Determine if the form has errors
	if (formHasErrors()) {
		// Prevents the form from submitting
		e.preventDefault();

		return false;
	}

	return true;
}

/*
 * Handles the reset event for the form.
 *
 * param e  A reference to the event object
 * return   True allows the reset to happen; False prevents
 *          the browser from resetting the form.
 */
function resetForm(e) {
	// Confirm that the user wants to reset the form.
	if (confirm('Clear order?')) {
		hideErrors();

		document.getElementById("qty1").focus();

		return true;
	}

	e.preventDefault();

	return false;
}

/*
 * Does all the error checking for the form.
 *
 * return   True if an error was found; False if no errors were found
 */
function formHasErrors() {
    // Set the error flag to false.
    let errorFlag = false;

    // Created as an array, because I plan to expand requiredTextFields in the future.
    const requiredTextFields = ["name"];

    // Checks if text fields have content.
    for (textField of requiredTextFields) {
        if (!fieldHasInput(document.getElementById(textField))) {
			document.getElementById(textField + "_error").style.display = "block";
		
			// Focus on the first field that has an error.
			if (!errorFlag) {
				document.getElementById(textField).focus();
			}

			errorFlag = true;
		}
    }

    //Regular expression to test email.
	const emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
	const emailValue = document.getElementById("email").value;

	//Test if the email field has content, and if it does check if it is a valid email.
	if (!fieldHasInput(document.getElementById("email"))) {
		document.getElementById("email_error").style.display = "block";
		
		// Focus on it if it is the first error.
		if (!errorFlag) {
			document.getElementById("email").focus();
		}

		errorFlag = true;
	} 
	else if (!emailRegex.test(emailValue)) {
		document.getElementById("emailformat_error").style.display = "block";

		// Focus on the field if it is the first error.
		if (!errorFlag) {
			document.getElementById("email").focus();
			document.getElementById("email").select();
		}

		errorFlag = true;
	}

    // Regular expression to test phone number.
    const phoneRegex = new RegExp(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/);
    const phoneValue = document.getElementById("phone").value;

    //Test if the phone field has content, and if it does check if it is a valid email.
	if (!fieldHasInput(document.getElementById("phone"))) {
		document.getElementById("phone_error").style.display = "block";
		
		// Focus on it if it is the first error.
		if (!errorFlag) {
			document.getElementById("phone").focus();
		}

		errorFlag = true;
	} 
	else if (!phoneRegex.test(phoneValue)) {
		document.getElementById("phoneformat_error").style.display = "block";

		// Focus on the field if it is the first error.
		if (!errorFlag) {
			document.getElementById("phone").focus();
			document.getElementById("phone").select();
		}

		errorFlag = true;
	}

   // Return the errorFlag.
    return errorFlag;
}

/*
 * Handles the load event of the document.
 */
function load() {
    // Hide errors by default.
    hideErrors();

    // Add event listenr for the form submit.
    document.getElementById("contact-form").addEventListener("submit", validate);

    // Add event listener for the form reset.
	document.getElementById("contact-form").addEventListener("reset", resetForm);
}

// Add document load event listener.
document.addEventListener("DOMContentLoaded", load);