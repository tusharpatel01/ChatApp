import React from 'react'
import Sendinput from './Sendinput'
import Showmessages from './Showmessages'

function Messagecontainer() {
  return (
    <div className='md:min-w-[550px] flex flex-col'>
       <div className="bg-gray-600 px-2 py-3 mb-2 flex gap-3 items-center rounded-md p-2 cursor-pointer">
        <div className="avatar online">
          <div className="w-10 rounded-full">
            <img
              src="https://img.freepik.com/free-vector/young-man-glasses-hoodie_1308-174658.jpg?ga=GA1.1.1496133838.1738212006&semt=ais_hybrid"
              alt="Profile"
            />
          </div>
        </div>

        <div className=" flex  flex-col flex-1">
          <div className=" justify-between  flex gap-2 ">
            <p>tushar patel</p>
          </div>
        </div>
      </div>
      
      <Showmessages/>
      <Sendinput/>
    </div>
  )
}

export default Messagecontainer