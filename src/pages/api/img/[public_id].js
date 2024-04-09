const config = {
  cloudName: import.meta.env.CLOUDINARY_CLOUD_NAME
}
// eslint-disable-next-line semi
export const prerender = false;

export async function GET ({ params }) {
  const imageId = params.public_id
  const cloudImageUrl = `https://res.cloudinary.com/${config.cloudName}/image/upload/v1/imageUploads/${imageId}`

  const response = await fetch(cloudImageUrl)

  if (!response.ok) {
    return new Response(null, { status: 404 })
  }

  return new Response(await response.arrayBuffer())
}
