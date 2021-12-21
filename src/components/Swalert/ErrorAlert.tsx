import Swal from 'sweetalert2'
import { COLORS } from '@utils/constants/colors'

const ErrorAlert = (text: string) => {
  return Swal.fire({
    imageUrl: '/erroralert.png',
    width: 320,
    imageWidth: 200,
    imageHeight: 200,
    text,
    confirmButtonColor: COLORS.RED,
  })
}

export default ErrorAlert
