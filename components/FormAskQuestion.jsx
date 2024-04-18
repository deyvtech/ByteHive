'use client'
import { Input, Button, Chip } from "@nextui-org/react";
import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { AiFillCloseCircle  } from "react-icons/ai";

const FormAskQuestion = () => {
    const editorRef = useRef(null);
    const log = () => {
      if (editorRef.current) {
        console.log(editorRef.current.getContent());
      }
    };
	return (
		<>
            <form action="">
                <div className="p-5 dark:bg-darkTheme-100 rounded-md">
                    <h3 className="text-xl my-4">Title</h3>
                    <Input
                        variant="underlined"
                        type="text"
                        placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
                    />
                </div>
               
                <div className="mt-4 p-5 dark:bg-darkTheme-100 rounded-md">
                    <h3 className="text-xl my-4">What are the details of your problem?</h3>
                    <Editor
                        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                        onInit={(_evt, editor) => editorRef.current = editor}
                        initialValue=""
                        init={{
                            height: 300,
                            menubar: false,
                            plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount', 'codesample'
                            ],
                            toolbar: 'bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | codesample',
                            content_style: 'body { font-family: Roboto,sans-serif; font-size:16px ; background: #121212; color: #fff}'
                        }}
                    />
                </div>

                <div className="mt-4 p-5 dark:bg-darkTheme-100 rounded-md">
                    <h3 className="text-xl my-4  ">Tags</h3>
                    <Input
                        variant="underlined"
                        type="text"
                        placeholder="e.g. (excel css c)"
                        className="pb-10"
                    />
                    <div className="space-x-2">
                    <Chip
                        size="sm"
                        className="rounded-sm text-primaryTheme-700 font-light"
                        endContent={<AiFillCloseCircle  className="w-4 h-full cursor-pointer text-red-500"/>}
						>
							Javascript
                        </Chip>

                        <Chip
                        size="sm"
                        className="rounded-sm text-primaryTheme-700 font-light"
                        endContent={<AiFillCloseCircle  className="w-4 h-full cursor-pointer text-red-500"/>}
						>
							PHP
						</Chip>
                    </div>
                    
                </div>
              

                <Button type="submit"  className="my-10 bg-primaryTheme-500 text-black font-semibold">Add Question</Button>
			</form>
		</>
	);
};

export default FormAskQuestion;
