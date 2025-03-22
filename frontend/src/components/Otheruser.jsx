import React from 'react'

const Otheruser = (props) => {
  const user=props.user
  return (
    <div>
        <div className="flex gap-3 items-center hover:bg-zinc-500 rounded-md p-2 cursor-pointer">
        <div className="avatar online">
          <div className="w-10 rounded-full">
            <img
              src={user?.profilePhoto}
              alt="Profile"
            />
          </div>
        </div>

        <div className=" flex  flex-col flex-1">
          <div className=" justify-between  flex gap-2 ">
            <p>{user?.fullName}</p>
          </div>
        </div>
      </div>
      {/* <div className="divider"></div> */}
    </div>
  )
}

export default Otheruser