import Swal from 'sweetalert2'
import { COLORS } from '@utils/constants/colors'

const LogOutAlert = (onRemove: any) => {
  return Swal.fire({
    imageUrl: '/logout.png',
    width: 320,
    imageWidth: 200,
    imageHeight: 200,
    showCancelButton: true,
    confirmButtonColor: COLORS.RED,
    confirmButtonText: '로그아웃',
    cancelButtonColor: COLORS.GREEN,
    cancelButtonText: '머무르기',
  }).then((result) => {
    if (result.isConfirmed) {
      onRemove()
    }
  })
}

export default LogOutAlert
