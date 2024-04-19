import QuestionDetails from '@/components/QuestionDetails'
import React from 'react'
import { getQuestionById } from "@/lib/actions/question.action";
const Question =  async ({ params }) => {
  const result = await getQuestionById(params.id);
  return (
    <QuestionDetails result={result} />
  )
}

export default Question