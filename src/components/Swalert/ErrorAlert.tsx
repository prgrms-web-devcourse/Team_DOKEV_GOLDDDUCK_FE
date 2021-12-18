import Swal from 'sweetalert2'
import { COLORS } from '@utils/constants/colors'

const ErrorAlert = (title: string) => {
  return Swal.fire({
    imageUrl: '/erroralert.png',
    width: 320,
    imageWidth: 200,
    imageHeight: 200,
    title,
    confirmButtonColor: COLORS.RED,
  })
}

export default ErrorAlert
