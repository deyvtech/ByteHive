import Questions from "./Question";

const UsersQuestion = async ({ questions }) => {
	return (
		<>
			{questions.length === 0 ? (
				<h2 className="mt-10 text-2xl">You don't have any question</h2>
			) : (
				<>
					<h2 className="mt-10 text-2xl">
						You have {questions.length} questions
					</h2>
					{questions.map((question) => (
						<div key={question._id}>
							<Questions question={question} />
						</div>
					))}
				</>
			)}
		</>
	);
};

export default UsersQuestion;
