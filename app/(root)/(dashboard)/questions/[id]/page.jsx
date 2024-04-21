import QuestionDetails from '@/components/QuestionDetails'
import React from 'react'
import { getQuestionById } from "@/lib/actions/question.action";
import { getAnswerByQuestion } from '@/lib/actions/answer.action';
const Question =  async ({ params }) => {
  const question = await getQuestionById(params.id);
  const data = await getAnswerByQuestion(params.id)

  return <QuestionDetails result={question} answers={data} params={ params.id} />;
}

export default Question