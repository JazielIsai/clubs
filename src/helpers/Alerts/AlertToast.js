import Swal from 'sweetalert2'

// typeIcon = [success, error, ]

export const AlertToast = (title, typeIcon = 'success', timer = 3000) => {
  
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: timer,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: typeIcon,
        title: title
      })

    
}
