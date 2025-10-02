import React from 'react'
import { useAuthContext } from '../../context/AuthContext'

// Message bubble that aligns left/right based on current user.
// Expects `message` with shape: { from: string, to?: string, content: string, timestamp?: string }
// Optionally pass `otherUser` for avatar fallback: { username, profilePic }
const Msg = ({ message, otherUser }) => {
  const { authUser } = useAuthContext()
  const me = authUser?.username

  const isOwn = message?.from === me
  const ts = message?.timestamp ? new Date(message.timestamp) : new Date()
  const time = ts.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  const myAvatar = authUser?.profilePicture && authUser.profilePicture.trim()
    ? authUser.profilePicture
    : `https://avatar.iran.liara.run/public/boy?username=${encodeURIComponent(me || 'me')}`

  const otherAvatar = otherUser?.profilePic && otherUser.profilePic.trim()
    ? otherUser.profilePic
    : `https://avatar.iran.liara.run/public/girl?username=${encodeURIComponent(otherUser?.username || 'user')}`

  const avatar = isOwn ? myAvatar : otherAvatar
  const name = isOwn ? 'You' : (message?.from || otherUser?.username || 'User')

  return (
    <div className={`chat  ${isOwn ? 'chat-end' : 'chat-start'}  `}>
      <div className="chat-image avatar">
        <div className="w-8 rounded-full">
          <img alt={name} src={avatar} />
        </div>
      </div>

      <div className={` flex flex-col chat-bubble text-lg ${isOwn ? 'bg-brand text-ink' : 'bg-white text-ink'}`}>
        <div className="chat-header flex justify-between">
          {name}
          <time className="text-xs  opacity-80 ml-1">{time}</time>
        </div>
        {message?.content}
      </div>
      {/* Placeholder for status; wire real delivery/read later */}
      {/* <div className="chat-footer opacity-50">Delivered</div> */}
    </div>
  )
}

export default Msg
