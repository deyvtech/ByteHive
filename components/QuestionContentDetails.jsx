import HtmlParse from "./HtmlParse";
const QuestionContentDetails = ({ content}) => {
	return (
		<div className="mt-10 ml-10">
            <HtmlParse content={content} />
		</div>
	);
};

export default QuestionContentDetails;
