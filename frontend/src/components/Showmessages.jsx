import React from 'react'
import Message from './Message'

const Showmessages = () => {
  return (
    <div className='px-4 py-2 flex-1 overflow-auto' >
        <h1>Messages</h1>
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message /> 
        <Message />
    </div>
  )
}

export default Showmessages