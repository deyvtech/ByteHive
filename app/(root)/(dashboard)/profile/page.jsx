import UsersQuestion from '@/components/UsersQuestion'
import { authOptions } from '@/utils/authOptions'
import { getServerSession } from 'next-auth'
import React, { Suspense } from 'react' // Added Suspense
import { getQuestionByUser } from "@/lib/actions/question.action";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return (
      <div className="flex justify-center mt-10">
        <h2 className="text-xl font-semibold">Please sign in to view your profile</h2>
      </div>
    );
  }

  const result = await getQuestionByUser(session.user.email) || { metadata: { totalCount: 0 }, data: [] };
  const { data } = result;

  return (
    <div>
      <Suspense fallback={<div>Loading your questions...</div>}>
        <UsersQuestion questions={data || []} />
      </Suspense>
    </div>
  )
}

export default ProfilePage