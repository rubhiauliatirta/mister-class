import Axios from 'axios'
import swal from './swal'

var axios = Axios.create({
  baseURL: 'https://cbr-api.herokuapp.com/'
})

export default axios
export function errorHandler (err) {
  if (err.response) {
    swal(err.response.data.message, true)
    console.log(err.response.data.error)
    // swal(`Error ${err.response.data.status} : ${err.response.data.error}`, true)
  } else if (err.request) {
    swal(`Internal Server Error`, true)
    console.log(err.request)
  } else {
    console.log('Error', err.message)
  }
  console.log(err.config)
}
