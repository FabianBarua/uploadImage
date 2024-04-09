import { v2 as cloudinary } from 'cloudinary'
import { config } from './config'

// eslint-disable-next-line semi
export const prerender = false;

export const POST = async ({ request }) => {
  try {
    // Verificar que la solicitud sea contentType 'multipart/form-data'
    const contentType = request.headers.get('content-type')
    if (!contentType || !contentType.includes('multipart/form-data')) {
      return new Response(JSON.stringify({ error: 'Unsupported media type' }), {
        status: 415,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Verificar que se haya recibido un archivo de imagen (por ejemplo, llamado 'image')
    const formData = await request.formData()
    const imageFile = formData.get('file')
    if (!imageFile) {
      return new Response(JSON.stringify({ error: 'Image file not found in request' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    cloudinary.config({
      cloud_name: config.cloudName,
      api_key: config.apiKey,
      api_secret: config.apiSecret
    })

    // Subir la imagen a Cloudinary
    // subir como BASE64
    const imageBuffer = await imageFile.arrayBuffer()
    const imageBase64 = Buffer.from(imageBuffer).toString('base64')

    // define a max size for the image 2MB

    const maxSize = 2 * 1024 * 1024
    if (imageBase64.length > maxSize) {
      return new Response(JSON.stringify({ error: 'Image file too large' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(`data:image/jpeg;base64,${imageBase64}`, {
      folder: 'imageUploads'
    })

    // ONLY RETURN CLOUDINARY PUBLIC ID
    //     public_id: 'imageUploads/kkpagfacuaqvpshima4b',
    // only kkpagfacuaqvpshima4b
    // the last part of the public_id

    const parts = cloudinaryResponse.public_id.split('/')
    const publicId = parts[parts.length - 1]

    return new Response(
      JSON.stringify({
        publicId
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
  } catch (error) {
    console.error('Error al procesar la solicitud:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
