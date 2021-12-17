import Swal from 'sweetalert2'
import { COLORS } from '@utils/constants/colors'

const Swalert = (
  onRemove: any,
  imageUrl: string,
  confirmMsg: string,
  canceleMsg: string,
) => {
  return Swal.fire({
    imageUrl,
    width: 320,
    imageWidth: 200,
    imageHeight: 200,
    showCancelButton: true,
    confirmButtonColor: COLORS.RED,
    confirmButtonText: confirmMsg,
    cancelButtonColor: COLORS.GREEN,
    cancelButtonText: canceleMsg,
  }).then((result) => {
    if (result.isConfirmed) {
      onRemove()
    }
  })
}

export default Swalert
