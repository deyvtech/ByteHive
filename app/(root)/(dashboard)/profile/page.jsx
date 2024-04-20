import UsersQuestion from '@/components/UsersQuestion'
import { authOptions } from '@/utils/authOptions'
import { getServerSession } from 'next-auth'
import React from 'react'
import { getQuestionByUser } from "@/lib/actions/question.action";


const ProfilePage = async () => {
  const session = await getServerSession(authOptions);
  const questions = await getQuestionByUser(session.user.email)
  return (
    <div>
    
      <UsersQuestion  questions={questions}/>
    </div>
  )
}

export default ProfilePage