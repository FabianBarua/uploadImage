export const Button = ({ children, ...props }) => {
  return (
    <button
      className=' bg-blue-700 w-full h-full rounded-lg  p-2 flex justify-center gap-2 items-center'
      {...props}
    >
      {children}
    </button>
  )
}
