import Swal from 'sweetalert2'
import ImgPath from '/public/alert.png'
import { COLORS } from '@utils/constants/colors'

const Swalert = (onRemove: any) => {
  return Swal.fire({
    imageUrl: String(ImgPath),
    imageWidth: 200,
    imageHeight: 200,
    showCancelButton: true,
    confirmButtonColor: COLORS.RED,
    confirmButtonText: '진짜 삭제',
    cancelButtonColor: COLORS.GREEN,
    cancelButtonText: '잠시 대기!',
  }).then((result) => {
    if (result.isConfirmed) {
      onRemove()
    }
  })
}

export default Swalert
