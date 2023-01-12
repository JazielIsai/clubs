import Swal from 'sweetalert2'

export const AlertSuccess = (title, text) => {    
    Swal.fire({  
        title: title,  
        text: text,
        icon: 'success'
      }); 
}
