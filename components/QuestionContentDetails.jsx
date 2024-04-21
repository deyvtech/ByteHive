import HtmlParse from "./HtmlParse";
const QuestionContentDetails = ({ content}) => {
	return (
		<div className="mt-10 ml-0 md:ml-10">
            <HtmlParse content={content} />
		</div>
	);
};

export default QuestionContentDetails;
