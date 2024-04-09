import { useContext } from 'react'
import { ALL_STATUS } from '../../utils/constants'
import { uploadImageContext } from '../../utils/context/uploadImage'

export const ErrorZone = () => {
  const { setStatus } = useContext(uploadImageContext)

  return (
    <section className=' border border-grayBorder dark:border-grayBorderDark dark:bg-fondoV2Dark px-16 py-8 rounded-lg text-center flex flex-col gap-4 dark:text-white  font-extralight '>
      <p>There was an error uploading the image</p>
      <button
        className='bg-blue-600 text-white px-4 py-2 rounded-lg'
        onClick={() => setStatus(ALL_STATUS.IDLE)}
      >
        Try again
      </button>
    </section>
  )
}
