import styled from '@emotion/styled'
import React, {
  useState,
  useCallback,
  useRef,
  CSSProperties,
  useEffect,
} from 'react'
import { COLORS } from '@utils/constants/colors'
import { FONT_SIZES } from '@utils/constants/sizes'
import Image from '@components/Image'

interface IUpload {
  id: string
  name: string
  onClick?: (string: File[]) => void
  style?: CSSProperties
}

const Upload = ({ id, name, style, onClick }: IUpload): JSX.Element => {
  const [fileList, setFileList] = useState<File[]>([])
  const [urlList, setUrlList] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  // Input 요소에 직접 접근하여 클릭이벤트 호출. (display:none)
  const handleChooseFile = useCallback(() => {
    inputRef.current?.click()
  }, [])

  /**
   * 선택한 파일로 상태를 업데이트.
   * fildDate : 파일 객체를 담는 데이터.
   * urlData : 파일 객체를 URL로 변환하여 미리보기에 사용함.
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files || []
    if (files.length < 11 && urlList.length + files.length < 11) {
      const fileData: File[] = []
      const urlData: string[] = []
      Array.from(files).forEach((file: File) => {
        fileData.push(file)
        urlData.push(URL.createObjectURL(file))
      })
      setFileList((prevState: File[]) => [...fileData, ...prevState])
      setUrlList((prevState: string[]) => [...urlData, ...prevState])
    } else {
      alert('파일 갯수 10개를 초과하였습니다!')
    }
  }

  /**
   * fileList 와 urlList에서 해당 이미지 파일을 모두 삭제함.
   * Submit 이벤트 관련 preventDefault 추후 여부에 따라 삭제 할 것.
   */
  const handleRemoveOnClick = (
    e: React.MouseEvent<HTMLButtonElement>,
  ): void => {
    e.preventDefault()
    const fileIndex = e.target as HTMLButtonElement
    setFileList(
      fileList.filter((_: File, index) => index !== parseInt(fileIndex.id, 10)),
    )
    setUrlList(
      urlList.filter(
        (_: string, index) => index !== parseInt(fileIndex.id, 10),
      ),
    )
  }

  useEffect(() => {
    onClick && onClick(fileList)
  }, [fileList])

  return (
    <>
      <UploadStyled onClick={handleChooseFile} style={{ ...style }}>
        <InputStyled
          ref={inputRef}
          id={id}
          type="file"
          name={name}
          accept="image/*"
          onChange={handleFileChange}
          multiple
        />
        <UploadBtn>+</UploadBtn>
      </UploadStyled>
      {fileList?.length !== 0 &&
        fileList.map((_, index) => (
          <UploadStyled key={index} id={id + index} style={{ ...style }}>
            <RemoveUpload id={String(index)} onClick={handleRemoveOnClick}>
              x
            </RemoveUpload>
            <Image src={urlList[index]} width={80} height={120} />
          </UploadStyled>
        ))}
    </>
  )
}

const InputStyled = styled.input`
  display: none;
`

const UploadStyled = styled.div`
  display: inline-block;
  width: 80px;
  height: 120px;
  background-color: ${COLORS.TEXT_GRAY_LIGHT};
  cursor: pointer;
  position: relative;
  margin-left: 8px;
  &:first-of-type {
    margin: 0;
  }
`

const UploadBtn = styled.button`
  color: ${COLORS.TEXT_BLACK};
  font-size: ${FONT_SIZES.MEDIUM};
  border: none;
  background: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
`

const RemoveUpload = styled.button`
  font-size: ${FONT_SIZES.MEDIUM};
  background: ${COLORS.RED};
  color: ${COLORS.WHITE};
  border: none;
  position: absolute;
  right: 0;
  border-radius: 50%;
  cursor: pointer;
`

export default Upload
