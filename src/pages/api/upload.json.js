import { v2 as cloudinary } from 'cloudinary'

const config = {
  cloudName: import.meta.env.CLOUDINARY_CLOUD_NAME,
  apiKey: import.meta.env.CLOUDINARY_API_KEY,
  apiSecret: import.meta.env.CLOUDINARY_API_SECRET
}

// eslint-disable-next-line semi
export const prerender = false;

export const POST = async ({ request }) => {
  try {
    const contentType = request.headers.get('content-type')
    if (!contentType || !contentType.includes('multipart/form-data')) {
      return new Response(JSON.stringify({ error: 'Unsupported media type' }), {
        status: 415,
        headers: { 'Content-Type': 'application/json' }
      })
    }

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

    const imageBuffer = await imageFile.arrayBuffer()
    const imageBase64 = Buffer.from(imageBuffer).toString('base64')

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
