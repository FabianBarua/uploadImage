import toast, { Toaster } from 'react-hot-toast'
import { Button } from './Button'
import { useContext, useEffect } from 'react'
import { uploadImageContext } from '../../utils/context/uploadImage'
import DownloadIcon from './DownloadIcon.jsx'
import ShareIcon from './ShareIcon.jsx'

const NoImage = () => (
  <div className=' flex justify-center items-center w-96 h-96 text-black dark:text-white'>
    <p className=' text-center'>No image selected</p>
  </div>
)

export const SuccessZone = () => {
  const { responseUrl, responseID } = useContext(uploadImageContext)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const img = params.get('img')
    if (!img) {
      const newParams = new URLSearchParams()
      newParams.set('img', responseID)
      window.history.pushState({}, '', `${window.location.pathname}?${newParams.toString()}`)
    }
  }, [responseUrl])

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = responseUrl
    link.download = 'image.png'
    link.click()
  }

  const handleShare = () => {
    const url = new URL(window.location)
    navigator.clipboard.writeText(url)
    toast.success('Link copied to clipboard', {
      position: 'bottom-center',
      className: ' dark:bg-blue-600 dark:text-white dark:bg-opacity-80'
    }
    )
  }

  return (

    <>
      <Toaster />
      {responseUrl
        ? (
          <section className=' border border-grayBorder dark:border-grayBorderDark dark:bg-fondoV2Dark rounded-lg text-center flex flex-col gap-4 dark:text-white  font-extralight w-96 p-4 '>
            <img
              src={responseUrl}
              onError={(e) => { e.target.src = '/404.png' }}
              alt=''
              className=' w-full h-full object-cover bg-slate-500/20 rounded-lg'
            />
          </section>
          )
        : <NoImage />}

      <div className=' flex gap-3 w-64 h-9 mt-4 text-white '>

        <Button
          onClick={handleShare}
        >
          <ShareIcon />
          Share
        </Button>
        <Button
          onClick={handleDownload}
        >
          <DownloadIcon />
          Download
        </Button>
      </div>
    </>

  )
}
