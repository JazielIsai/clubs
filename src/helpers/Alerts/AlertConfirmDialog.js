import Swal from 'sweetalert2';

export async function confirmDialog (title, text, nameAction, actionReady) {
    let confirm = await Swal.fire({
        title: title,
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                nameAction,
                actionReady,
                'success'
            )
            return true;
        } else {
            return false;
        }
      })
    return confirm;
}