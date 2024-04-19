"use client";
import { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Button } from "@nextui-org/react";
import { addAnswer } from "@/lib/actions/answer.action";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const FormAnswer = ({ questionId }) => {
	const editorRef = useRef(null);
    const { data: session } = useSession();
    const authorEmail = session?.user.email
    const pathname = usePathname()


	const log = () => {
		if (editorRef.current) {
			return editorRef.current.getContent();
		}
	};

    const handleSubmitAnswer = async () => {
        try {
            const content = log();
            await addAnswer({ questionId, authorEmail, content, pathname });

            if (editorRef.current) {
                editorRef.current.setContent('');
            }
            
            toast.success('Answered Successfully')
        } catch (error) {
            
        }
	
	};

	return (
		<div className="mt-4 p-5 dark:bg-darkTheme-100 rounded-md">
			<h3 className="text-xl my-4">Your Answer</h3>
			<Editor
				apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
				onInit={(_evt, editor) => (editorRef.current = editor)}
				initialValue=""
				init={{
					height: 300,
					menubar: false,
					plugins: [
						"advlist",
						"autolink",
						"lists",
						"link",
						"image",
						"charmap",
						"preview",
						"anchor",
						"searchreplace",
						"visualblocks",
						"code",
						"fullscreen",
						"insertdatetime",
						"media",
						"table",
						"code",
						"help",
						"wordcount",
						"codesample",
					],
					toolbar:
						"bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | codesample",
					content_style:
						"body { font-family: Roboto,sans-serif; font-size:16px ; background: #121212; color: #fff}",
				}}
			/>
			<Button
				onClick={handleSubmitAnswer}
				className="my-10 bg-primaryTheme-500 text-black font-semibold"
			>
				Post Your Answer
            </Button>
            
            <Toaster /> 
		</div>
	);
};

export default FormAnswer;
