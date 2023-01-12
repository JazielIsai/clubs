import Swal from 'sweetalert2';

export const AlertError = (title, message) => { 
    Swal.fire({
        icon: 'error',
        title: title,
        text: message,
        // footer: '<a href="">Why do I have this issue?</a>'
      })
}