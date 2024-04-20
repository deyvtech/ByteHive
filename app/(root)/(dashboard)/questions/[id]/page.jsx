import QuestionDetails from '@/components/QuestionDetails'
import React from 'react'
import { getQuestionById } from "@/lib/actions/question.action";
import { revalidatePath } from 'next/cache';
const Question =  async ({ params }) => {
  const result = await getQuestionById(params.id);
  revalidatePath('/')

  return (
    <QuestionDetails result={result} />
  )
}

export default Question