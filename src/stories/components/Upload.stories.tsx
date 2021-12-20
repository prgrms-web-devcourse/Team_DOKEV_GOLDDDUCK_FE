import Upload from '@components/Upload'
import { useState } from 'react'

export default {
  title: 'Components/Upload',
  component: Upload,
}

export const Default = () => {
  const [files, setFiles] = useState<File[]>([])

  const testShowfiles = (fileList: File[]) => {
    console.log('자식으로 부터 전달된 파일 리스트', fileList)
    setFiles(fileList)
  }

  console.log('부모에서의 파일 상태 리스트', files)

  return (
    <>
      <Upload
        id="upload"
        name="abc"
        useRefCheck={false}
        onClick={testShowfiles}
      />
    </>
  )
}
