const form = document.querySelector(".validate");
form.addEventListener('blur', handleBlur, true);
form.addEventListener('input', handleInput);
form.addEventListener('submit', handleSubmit);

function handleBlur(event){
    // Dont validate if value is empty and no previous attempts
    if(!fieldHasValue(event.target) && !fieldTouched(event.target)){
        return;
    }
    validate(event.target);
}

function handleInput(event){
    // Dont real-time validate if no previous attempts
    if(!fieldTouched(event.target)){
        console.log("no real-time validaiton");
        return;
    }
    validate(event.target);
}

function validate(field){
    // Don't validate submits, buttons, file and reset inputs, and disabled fields
    if (field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') return;

    const hasErrors = !field.validity.valid;
    if(hasErrors){
        field.dataset.validity = "invalid"
    }
    else{
        field.dataset.validity = "valid"
    }
    return hasErrors;
}

function handleSubmit(event){
    const form = event.target;
    const hasErrors = !form.checkValidity();

    if(hasErrors){
        event.preventDefault();
        let firstError;
        for(let i = 0; i < form.elements.length; i++){
            const hasError = validate(form.elements[i]);
            if(!firstError && hasError){
                firstError = form.elements[i];
            }
        }
        firstError.focus();

        // TODO show form error
    }
    // else{
        
    // }

}

function fieldHasValue(field){
    return field.value.length > 0;
}

function fieldTouched(field){
    return field.dataset.validity;
}





