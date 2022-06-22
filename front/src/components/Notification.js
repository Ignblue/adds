import React from 'react'

const Notification = ({message}) => {
  if(message === null)
  return null;
  if(message.includes(`Įkeltas`) || message.includes(`Atnaujintas`))
  return (
    <div className='confirmm'>{message}</div>
  )
  else
  return (
    <div className='error'>{message}</div>
  )
}

export default Notification