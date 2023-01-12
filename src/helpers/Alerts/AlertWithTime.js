import Swal from "sweetalert2";

export const AlertWithTime = (title, message) => {
  let timerInterval;
  Swal.fire({
    title: title,
    html: message,
    timer: 600,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const b = Swal.getHtmlContainer().querySelector("b");
      timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft();
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      // console.log("I was closed by the timer");
    }
  });
};
