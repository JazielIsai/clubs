import Swal from 'sweetalert2'

export const AlertDialog = async (title, message, confirmButtonText, denyButtonText) => {
    return await Swal.fire({
        title: title,
        showDenyButton: true,
        confirmButtonText: confirmButtonText,
        denyButtonText: denyButtonText,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire('Saved!', '', 'success')
            return true;
        } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
            return false;
        }
      })
}