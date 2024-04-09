import { useContext, useEffect } from 'react'
import { uploadImageContext } from '../../utils/context/uploadImage'
import { ALL_STATUS, EVENTS } from '../../utils/constants'
import { IdleZone } from './IdleZone'
import { LoadingZone } from './LoadingZone'
import { SuccessZone } from './SuccessZone'
import { ErrorZone } from './ErrorZone'

export const UploadZone = () => {
  const { status, setImageURL, setStatus } = useContext(uploadImageContext)

  useEffect(() => {
    const changeParams = () => {
      const params = new URLSearchParams(window.location.search)
      const img = params.get('img')
      if (img) {
        setImageURL(window.location.origin + '/api/img/' + img)
        setStatus(ALL_STATUS.SUCCESS)
      } else {
        setImageURL(null)
        setStatus(ALL_STATUS.IDLE)
      }
    }
    changeParams()
    window.addEventListener(EVENTS.POPSTATE, changeParams)
    return () => {
      window.removeEventListener(EVENTS.POPSTATE, changeParams)
    }
  }, [])

  return (
    <>
      {
        status === ALL_STATUS.IDLE && <IdleZone />
      }
      {
        status === ALL_STATUS.LOADING && <LoadingZone />
      }
      {
        status === ALL_STATUS.SUCCESS && <SuccessZone />
      }
      {
        status === ALL_STATUS.ERROR && <ErrorZone />
      }
    </>
  )
}
