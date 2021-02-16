const form = document.querySelector(".validate");
  
form.addEventListener('blur', handleBlur, true);

function handleBlur(event){

    // Dont validate if value is empty and no previous attempts
    if(!fieldHasValue(event.target) && !fieldTouched(event.target)){
        console.log("not validating");
        return;
    }

    validate(event.target);
}

function validate(field){
    console.log("validating");
    
    // Don't validate submits, buttons, file and reset inputs, and disabled fields
    if (field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') return;

    const hasErrors = !field.validity.valid;

    if(hasErrors){
        field.dataset.validity = "invalid"
    }
    else{
        field.dataset.validity = "valid"
    }
}

function fieldHasValue(field){
    return field.value.length > 0;
}

function fieldTouched(field){
    return field.dataset.validity;
}



//todo
// 1. show error AND valid state - can show valid on first attempt

// 2. trim input when checking



//more
// 1. on submit:
//    check for errors - 
//      store first error so we can 'focus' it 
//      (get error fields into an array while checking, and 'focus' on it - errors[0])
//    if errors 
//      prevent default  - "event.preventDefault();"
//      focus on first error field
//      show fail message ?
//    can use the form.checkValidity() method
//      fires 'invalid' events for all controld



// notes
// 1. field.validity.valueMissing ???
//      cant use this to check for no value 
//      because if the constraint is not 'required' 
//      then this will not report anything
//      SO handleBlur might skip validation if field is empty and not required
