document.addEventListener('DOMContentLoaded', function(){

    const email = {
        email:'',
        asunto:'',
        mensaje:'',
    }

    //Seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputCC = document.querySelector('#cc');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type = "submit"]');
    const btnReset = document.querySelector('#formulario button[type= "reset"]');
    const spinner = document.querySelector('#spinner');

    //Asignar eventos, inut en tiempo real, blur es mediante selección y abandono de campo
    inputEmail.addEventListener('input', validar);
    inputCC.addEventListener('input', vNO)
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);

    formulario.addEventListener('submit', enviarEmail);
    btnReset.addEventListener('click',function(e){
        e.preventDefault();

        //Reiniciar formulario
        resetFormulario();
    })

    function enviarEmail(e){
        e.preventDefault()

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');
            
            //reiniciar el objeto
            resetFormulario();

            //Crear alerta
            const alertaExito = document.createElement('p');
            alertaExito.classList.add('bg-green-500', 'test-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            alertaExito.textContent = 'Mensaje enviado correctamente';

            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove();
            }, 3000);

        }, 3000);
    }

    function vNO(e){

        if (e.target.id ==='cc' && e.target.value.trim() !=='' && !validarEmail(e.target.value)){
            mostrarAlerta('Debe contener un email valido (ESTE CAMPO NO ES OBLIGATORIO)', e.target.parentElement);
            return;

        }
        
        limpiarAlerta(e.target.parentElement);
   

    }

    function validar (e){
        
        if(e.target.value.trim() === ''){//trim para eliminar espacios vacios
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name]='';
            comprobarEmail();
            return;
        } 

        if (e.target.id ==='email' && !validarEmail(e.target.value)){
            mostrarAlerta('El email no es valido', e.target.parentElement);
            email[e.target.name]='';
            comprobarEmail();
            return;
        }
        

        limpiarAlerta(e.target.parentElement);

        //Asignar los valores
        email[e.target.name]=e.target.value.trim().toLowerCase();
        
        

        comprobarEmail();
        
    };

    function mostrarAlerta(mensaje, referencia){
        limpiarAlerta(referencia);

        //Generar alerta en HTML //Esta forma genera codigo seguro
        const error = document.createElement('p');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');//Tailwind CSS: Libreria orientada a las utilidades

        //Inyectar el error al formulario
        referencia.appendChild(error);//appendchild enviara el mensaje al final del formulario
    }

    function limpiarAlerta(referencia){
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta){
            alerta.remove();
        }

    }

    function validarEmail(email){
        //Expresión regular: Codigo que busca un patrón en una cadena de texto o en una serie de numeros
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        const resultado = regex.test(email);
        return resultado;
    }

    function comprobarEmail(){
        if(Object.values(email).includes('')){
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;
        }
            btnSubmit.classList.remove('opacity-50');
            btnSubmit.disabled = false;
    }
    

    function resetFormulario(){
        email.email='';
        email.asunto='';
        email.mensaje='';
  
        formulario.reset();
        comprobarEmail();
    }


});