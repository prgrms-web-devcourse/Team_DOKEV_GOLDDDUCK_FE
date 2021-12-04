import styled from '@emotion/styled'
import React, { useState, useCallback, useRef, CSSProperties } from 'react'
import { COLORS } from '@utils/constants/colors'
import { FONT_SIZES } from '@utils/constants/sizes'

interface IUpload {
  id: string
  name: string
  value?: File
  droppable: boolean
  onChange?: any
  onClick?: any
  style?: CSSProperties
}

const Upload: React.FC<IUpload> = ({
  id,
  name,
  value,
  droppable,
  onChange,
  onClick,
  style,
  children,
}): JSX.Element => {
  const [file, setFile] = useState<File[] | null>(null)
  // const [file, setFile] = useState<File[]>([])
  const [dragging, setDragging] = useState(false)
  // const [url, setUrl] = useState('')
  const [url, setUrl] = useState('')
  const [isShow, setIsShow] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChooseFile = () => {
    inputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault()
    const files = e.target.files
    if (files) {
      console.log(files)
      // 파일 하나인 경우
      // const changedFile = files[0]
      // const fileReader = new FileReader()
      // fileReader.readAsDataURL(changedFile)
      // console.log(fileReader, 11, fileReader.result)
      // fileReader.onload = (e: any) => {
      //   setUrl(e.target.result)
      // }

      //멅티플
      Array.from(files).forEach((el: File) => {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(el)
        fileReader.onload = (e: any) => {
          const url = e.target.result
          // console.log([{ el, url }], el)
          setFile((prev: []) => [...prev, { ...el, url }])
        }
      })

      // const fileData: File[] = []
      // const urlData: string[] = []
      // const fileReader = new FileReader()
      // Array.from(files).forEach((el: File) => {
      //   console.log(el)
      //   fileData.push(el)
      //   fileReader.readAsDataURL(el)
      //   fileReader.onload = (e: any) => {
      //     console.log('onload')
      //     urlData.push(e.target.result)
      //     setUrl((prev) => prev.push(e.target.result))
      //   }
      // })
      // console.log(fileData, 'fileData')
      // console.log(urlData, 'urlData')
      // setFile(fileData)
      // setUrl(urlData)

      // const fileReader = new FileReader()
      // const fileData: File[] = Array.from(files).map((file) =>
      //   {
      //     fileReader.readAsDataURL(file)

      //   }
      // )
      // console.log(fileData, 'fileData')
      // setFile(fileData)

      // const changedFile = files[0]
      // const fileReader = new FileReader()
      // fileReader.readAsDataURL(changedFile)
      // console.log(fileReader, 11, fileReader.result)
      // fileReader.onload = (e: any) => {
      //   console.log(e.target.result)
      // }

      // fileData.forEach((el: File) => {
      //   fileReader.readAsDataURL(el)
      //   fileReader.onload = (e: any) => {
      //     setUrl(e.target.result)
      //   }
      // })

      // onChange && onChange(changedFile)
    }
  }

  const handleRemoveOnClick = (e: any) => {
    console.log('111')
    e.stopPropagation()
  }

  const handleDragEnter = (e: React.DragEvent) => {
    if (!droppable) return

    e.preventDefault() // 브라우저 기본 이벤트를 막는다.
    e.stopPropagation() // 부모나 자식 컴포넌트로 이벤트가 전파되는 것을 막는다.

    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragging(true)
    }
  }
  const handleDragLeave = (e: React.DragEvent) => {
    if (!droppable) return

    e.preventDefault()
    e.stopPropagation()

    setDragging(false)
  }
  const handleDragOver = (e: React.DragEvent) => {
    if (!droppable) return

    e.preventDefault()
    e.stopPropagation()
  }
  const handleFileDrop = (e: React.DragEvent) => {
    if (!droppable) return

    e.preventDefault()
    e.stopPropagation()

    const files = e.dataTransfer.files
    const changedFile = files[0]
    // setFile(changedFile)
    onChange && onChange(changedFile)
    setDragging(false)
  }
  console.log(file, 'file')

  return (
    <>
      {file ? (
        file.map((element, index) => (
          <UploadStyled
            key={index}
            onClick={handleChooseFile}
            style={{ ...style }}>
            <InputStyled
              ref={inputRef}
              type="file"
              name={element.name}
              accept="image/*"
              onChange={handleFileChange}
              multiple
            />
            {url ? (
              <RemoveUpload onClick={handleRemoveOnClick}>x</RemoveUpload>
            ) : (
              <UploadBtn>+</UploadBtn>
            )}
            {url && <ImageStyled src={url ? url : ''} />}
          </UploadStyled>
        ))
      ) : (
        <UploadStyled onClick={handleChooseFile} style={{ ...style }}>
          <InputStyled
            ref={inputRef}
            type="file"
            name={name}
            accept="image/*"
            onChange={handleFileChange}
            multiple
          />
          {url ? (
            <RemoveUpload onClick={handleRemoveOnClick}>x</RemoveUpload>
          ) : (
            <UploadBtn>+</UploadBtn>
          )}
          {url && <ImageStyled src={url ? url : ''} />}
        </UploadStyled>
      )}
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
`

const ImageStyled = styled.img`
  width: 80px;
  height: 120px;
  object-fit: cover;
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
`

const RemoveUpload = styled.button`
  color: ${COLORS.TEXT_BLACK};
  font-size: ${FONT_SIZES.MEDIUM};
  background: ${COLORS.RED};
  color: ${COLORS.WHITE};
  border: none;
  position: absolute;
  right: 0;
  border-radius: 50%;
`

export default Upload
