import { FileUploader } from 'react-drag-drop-files'
import { UploadIcon } from './Icons'
import { useContext } from 'react'
import { uploadImageContext } from '../../utils/context/uploadImage'

const fileTypes = ['JPG', 'PNG', 'GIF']

export const IdleZone = () => {
  const { setFile } = useContext(uploadImageContext)

  const handleDrop = (file) => {
    if (file?.type?.includes('image')) {
      setFile(file)
    }
  }

  return (
    <FileUploader
      handleChange={handleDrop}
      name='file'
      hoverTitle=' '
      dropMessageStyle={
          {
            backgroundColor: 'white',
            borderStyle: 'none',
            borderRadius: '0.5rem',
            opacity: '0.1'
          }
          }
      types={fileTypes}
      classes=' sm:w-full sm:max-w-xl  h-96 bg-white dark:text-white dark:bg-fondoV2Dark rounded-lg shadow-lg  p-2'
    >
      <div className='   w-full h-full flex flex-col justify-center items-center   px-8  border-dashed border-[2px] rounded-lg border-l-grayBorder  dark:border-grayBorderDark '>
        <UploadIcon />
        <h1 className='font-medium mt-2  '>
          Drag & drop a file or
          <span className='text-blue-500 ml-1 font-fondoDark transition-all cursor-pointer hover:text-blue-800 '> browse files</span>
        </h1>
        <h2 className=' font-extralight text-sm mt-1'>JPG, PNG or GIF - Max file size 2MB</h2>
      </div>
    </FileUploader>
  )
}
