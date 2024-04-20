import UsersQuestion from '@/components/UsersQuestion'
import { authOptions } from '@/utils/authOptions'
import { getServerSession } from 'next-auth'
import React from 'react'
import { getQuestionByUser } from "@/lib/actions/question.action";


const ProfilePage = async () => {
  const session = await getServerSession(authOptions);
  const { metadata, data } = await getQuestionByUser(session.user.email)
  
  console.log(data)
  return (
    <div>
    
      <UsersQuestion  questions={data}/>
    </div>
  )
}

export default ProfilePage