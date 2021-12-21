import Swal from 'sweetalert2'
import { COLORS } from '@utils/constants/colors'

const GiftGetAlert = (title: string) => {
  return Swal.fire({
    imageUrl: '/giftget.png',
    width: 320,
    imageWidth: 200,
    imageHeight: 200,
    title,
    confirmButtonColor: COLORS.RED,
    confirmButtonText: 'GET!',
  }).then((result) => {
    if (result.isConfirmed) {
      return true
    } else {
      return false
    }
  })
}

export default GiftGetAlert
