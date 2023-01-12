import Swal from "sweetalert2";

export const AlertInfo = (title, messege, icon = 'info') => {
    Swal.fire({
        title: title,
        icon: icon,
        html: messege,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
            '<i> Great! </i> ',
    })

}