/*
 *  Validate form
 */

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
    //if (field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') return;
    if (field.disabled || field.tagName != 'INPUT') return;

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
    if(field.value == null){
        return false;
    }
    return field.value.length > 0;
}

function fieldTouched(field){
    return field.dataset.validity;
}



/*
 *  Custom select
 */

const formSelect = document.querySelector(".js-form-select");

formSelect.addEventListener('click', function(e) {
    if(e.target.closest(".form-select__trigger")){
        // show/hide dropdown
        this.classList.toggle("form-select--is-active");
    }
    if(e.target.closest(".form-select__option")){
        // focus trigger (trigger will lose focus when user clicks on option)
        const trigger = this.querySelector('.form-select__trigger');
        trigger.focus();
        
        // get clicked option
        const clickedOption = e.target.closest(".form-select__option");
        
        // update --is-selected
        const allOptions = this.querySelectorAll(".form-select__option")
        allOptions.forEach(option => { option.classList.remove("form-select__option--is-selected")})
        clickedOption.classList.add("form-select__option--is-selected");
        
        // update value
        let selection = clickedOption.innerHTML;
        this.querySelector(".form-select__value").innerHTML = selection;
        
        // close dropdown
        this.classList.remove("form-select--is-active");
    }
});

document.addEventListener('click', e => {
    // close custom select dropdown
    if(!formSelect.contains(e.target)){
        formSelect.classList.remove("form-select--is-active");
    }
});