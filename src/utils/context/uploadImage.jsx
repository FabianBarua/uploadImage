import { createContext, useEffect, useState } from 'react'
import { ALL_STATUS } from '../constants'
import axios from 'axios'

export const uploadImageContext = createContext()

export const UploadImageContextProvider = ({ children }) => {
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState(ALL_STATUS.IDLE)
  const [imageURL, setImageURL] = useState(null)
  const [fileSelected, setFileSelected] = useState(null)

  const setFile = (file) => {
    setFileSelected(file)
    setStatus(ALL_STATUS.LOADING)
  }

  useEffect(() => {
    if (!fileSelected) return
    const uploadImage = async () => {
      const formData = new FormData()
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          setProgress(percentCompleted)
        }
      }
      formData.append('file', fileSelected)
      try {
        const response = await axios.post('api/upload.json', formData, config)

        setImageURL(window.location.origin + '/api/img/' + response.data.publicId)
        setProgress(0)
        setStatus(ALL_STATUS.SUCCESS)
      } catch (error) {
        console.error(error)
        setStatus(ALL_STATUS.ERROR)
      }
    }

    uploadImage()
  }, [fileSelected])

  return (
    <uploadImageContext.Provider value={{
      progress,
      status,
      responseUrl: imageURL,
      responseID: imageURL?.split('/').pop(),
      setFile,
      setImageURL,
      setStatus
    }}
    >
      {children}
    </uploadImageContext.Provider>
  )
}
