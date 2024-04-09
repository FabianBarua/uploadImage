import { useContext } from 'react'
import { uploadImageContext } from '../../utils/context/uploadImage'

export const LoadingZone = () => {
  const { progress } = useContext(uploadImageContext)

  return (

    <section className=' border border-grayBorder dark:border-grayBorderDark dark:bg-fondoV2Dark px-8 sm:px-16 py-8 rounded-lg text-center flex flex-col gap-4 dark:text-white  font-extralight '>
      <p><b>Uploading</b>, please wait...</p>
      <div className=' w-full max-w-96 h-2  overflow-hidden  bg-slate-600 rounded-lg transition-all'>
        <div className='  transition-all h-full bg-blue-600 ' style={{ width: `${progress}%` }} />
      </div>
    </section>

  )
}
