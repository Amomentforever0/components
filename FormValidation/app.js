(() => {
    window.onload = () => {
        const form = document.querySelector('form');

        const errorTypes = {
            // Checks for when a specified field is required
            required: {
                msg: "This field is required.",
                test: function(value) {
                    // Make sure that something was not entered and that this
                    // isn't on page load (showing 'field required' messages
                    // would be annoying on page load)
                    return !(value === '');
                }
            },
            
            // Makes sure that the field s a valid email address
            email: {
                msg: "Not a valid email address.",
                test: function(value) {
                    // Make sure that something was entered and that it looks like
                    // an email address
                    return !value || 
                        /^[a-z0-9_+.-]+\@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/i.test(value);
                }
            },
            
            // Makes sure the field is a phone number and
            // auto-formats the number if it is one
            phone: {
                msg: "Not a valid phone number.",
                test: function(value) {
                    // Check to see if we have something that looks like
                    // a valid phone number
                    var m = /(\d{3}).*(\d{3}).*(\d{4})/.exec(value);
                    
                    // If it is, seemingly, valid - force it into the specific
                    // format that we desire: (123) 456-7890
                    if ( m ) value = "(" + m[1] + ") " + m[2] + "-" + m[3];
                        
                    return !value || m;
                }
            },
            
            // Makes sure that the field is a valid MM/DD/YYYY date
            date: {
                msg: "Not a valid date.",
                test: function(value) {
                    // Make sure that something is entered, and that it
                    // looks like a valid MM/DD/YYYY date
                    return !value || /^\d{2}\/\d{2}\/\d{2,4}$/.test(value);
                }
            },
            
            // Makes sure that the field is a valid URL
            url: {
                msg: "Not a valid URL.",
                test: function(value) {
                    // Make sure that some text was entered, and that it's
                    // not the default http:// text
                        return  !(value === 'http://') ||
                            // Make sure that it looks like a valid URL
                            /^https?:\/\/([a-z0-9-]+\.)+[a-z0-9]{2,4}.*$/.test(value);
                }
            }
        };
    
        // A function for validating all fields within a form.
        // The form argument should be a reference to a form element
        // the validation function is being run on page load, versus dynamically
        function validateForm(form) {
            let valid = true;
            Array.from(form.querySelectorAll('.errors')).forEach((el) => { console.log(el); el.remove(); });
            // Go through all the field elements in form
            // form.elements is an array of all fields in a form
            for (let i=0; i<form.elements.length; i++) {
                
                // Check to see if the field contains valid contents, or not
                if (!validateField(form.elements[i])) {
                    valid = false;
                }
            }
    
            // Return false if a field does not have valid contents
            // true if all fields are valid
            return valid;
        }
    
        // Validate a single field's contents
        function validateField(elem) {
            hideErrors(elem);
            let errors = [];
            // Go through all the possible validation classes
            for (let name in errorTypes ) {
                // See if the field has the class specified by the error type
                let re = new RegExp("(^|\\s)" + name + "(\\s|$)");
    
                // Check to see if  the element has the class and that it passes the
                // validatino test
                if (re.test(elem.className) && !errorTypes[name].test(elem.value)) {
                    // If it fails the validation, add the error message to list
                    errors.push(errorTypes[name].msg);
                }
            }
    
            // Show the error messages, if they exist
            if (errors.length > 0) {
                showErrors(elem, errors);
                animateCSS(elem, 'pulse');
                // elem.classList.add('animated', 'pulse');
                // setTimeout(() => {
                //     elem.classList.remove('animated', 'pulse');
                // }, 1500);
            }
    
            // Return false if the field fails any of the validation routines
            return errors.length > 0;
        }
    
        // Hide any validation error messages that are currently shown
        function hideErrors(elem) {
            // Find the next element after the current field
            const next = elem.nextElementSibling;

            // If the next element is a ul and has a class of errors
            if (next && next.className == "errors") {
                elem.style.border = '';
                next.remove();
            }
               
        }
    
        // Show a set of errors messages for a specific field within a form
        function showErrors(elem, errors) {
            // Find the next element after the field
            let next = elem.nextSibling;
            elem.style.border = '2px solid red';
            // If the field isn't one of our special error-holders.
            if (next && (next.nodeName !== "UL" || next.className !== "errors" )) {
                // We need to make one instead
                next = document.createElement("ul");
                next.className = "errors";
                // and then insert into the correct place in the DOM
                console.log(next, elem.nextSibling);
                elem.parentNode.insertBefore(next, elem.nextSibling);
            }
    
            // Now that we have a reference to the error holder UL
            // We then loop through all the error messages
            for ( var i = 0; i < errors.length; i++ ) {
                // Create a new li wrapper for each
                var li = document.createElement("li");
                li.innerHTML = errors[i];
    
                // and insert it into the DOM
                next.appendChild(li);
            }
        }
    
        function watchForm(form) {
            // Watch the form for submission

            form.addEventListener('submit',  function(event) {
                if(!validateForm(form)) {
                    event.preventDefault();
                }
            });


            for(let i = 0; i<form.elements.length; i++) {
                form.elements[i].addEventListener('change', function() {
                    validateField(this);
                });
            }
        }

        function animateCSS(element, animationName, callback) {
            const node =  element;
            node.classList.add('animated', animationName);

            function handleAnimation() {
                node.classList.remove('animated', animationName);
                node.removeEventListener('animationend', handleAnimation);

                if (typeof callback === 'function') {
                    callback();
                }
            }

            node.addEventListener('animationend', handleAnimation);

        }
    
        // // and watch for when its submitted, to validate it
        watchForm(form);
    };
})();

