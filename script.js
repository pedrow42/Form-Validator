let validator = {
    handleSubmit:(event)=>{
        event.preventDefault(); //irá cancelar o evento padrao do form que é fazer o submit
        let send = true;

        validator.clearError();

        let inputs = form.querySelectorAll('input');
        for(let i=0; i<inputs.length;i++){
            let input = inputs[i];
            let check = validator.checkInput(input); //função para checar todos os inputs
            if(check != true){
                send=false;
                validator.showError(input, check);
            }
        }

        if(send){
            form.submit();
        }
    },
    checkInput:(input)=>{
        let rules = input.getAttribute('data-rules');
        if(rules != null){
            rules = rules.split('|');
            for(let k in rules){
                let rulesDetails = rules[k].split('=');
                switch(rulesDetails[0]){
                    case 'required':
                        if(input.value == ''){
                           return 'Field cannot be empty'
                        }
                    break;
                    case 'min':
                        if(input.value.length < rulesDetails[1]){
                            return `Field must be at least ${rulesDetails[1]} characters`
                        }
                    break;
                    case 'email':
                        if(input.value.length != 0){
                            let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

                            if(!regex.test(input.value.toLowerCase())){
                                return 'Invalid e-mail'
                            }
                        }
                    break;
                }
            }
        }

        return true;
    },
    clearError:()=>{
        let inputs = form.querySelectorAll('input');
        for(let i=0;i<inputs.length;i++){
            inputs[i].style.borderColor = '';
        }

        let errorElements = document.querySelectorAll('.error');
        for(let i=0;i<errorElements.length;i++){
            errorElements[i].remove()
        }
            
    },

    showError:(input, errorMsg)=>{
        input.style.borderColor = 'red';
        let errorElement = document.createElement('div');
        errorElement.classList.add('error');

        errorElement.innerHTML = errorMsg;

        input.parentElement.insertBefore(errorElement, input.nextSibling);
    }
}

let form = document.querySelector('.form');

//toda a vez que o formulario for submetido a autenticação, a função handleSubmit será executada
form.addEventListener('submit', validator.handleSubmit); 
