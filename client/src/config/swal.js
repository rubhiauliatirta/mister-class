import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2';

Vue.use(VueSweetalert2);

function myToast (message, isError) {
  Vue.swal({
    toast: true,
    position: 'top-end',
    background: isError ? '#dc3545' : '#28a745',
    html: `<p class="text-white">${message}</p>`,
    timer: isError ? 4000 : 2000,
    showConfirmButton: false
  })
}

Vue.prototype.$mytoast = myToast

export default myToast
