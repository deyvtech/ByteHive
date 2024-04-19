'use client'
import { Input, Button, Chip } from "@nextui-org/react";
import { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { AiFillCloseCircle  } from "react-icons/ai";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import { addQuestion } from "@/lib/actions/question.action";
import { useRouter, usePathname  } from "next/navigation";

const FormAskQuestion = () => {
    const editorRef = useRef(null);
    const formRef = useRef(null);
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('')
    const [isSubmit, setIsSubmit] = useState(false)
    const router = useRouter();
    const pathname = usePathname();

    const { data: session } = useSession()

    const log = () => {
      if (editorRef.current) {
        return editorRef.current.getContent();
      }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!isSubmit) {
            if (!session) {
                return  toast.error('You need to sign in!!')
            }
            
             e.preventDefault();
             const formData = new FormData(formRef.current);
             const data = {};
             formData.forEach((value, key) => {
               data[key] = value;
             });
     
             data.content = log()
            data.tags = tags
            data.authorEmail = session.user.email
            data.pathname = pathname
     
             if (Object.values(data).some(value => value === '')) {
                 return toast.error('Some Input Field is Empty')
             } else {
                 await addQuestion(data)
                 setIsSubmit(true)
                 
                    router.push('/')
                 return toast.success('Successfully added question')

            }
            
        }

    }

    const handleRemoveTag = (indexToRemove) => {
        setTags((prevTags) => prevTags.filter((_, index) => index !== indexToRemove));
      };
	return (
		<>
            <form ref={formRef} onSubmit={handleSubmit}>
                <div className="p-5 dark:bg-darkTheme-100 rounded-md">
                    <h3 className="text-xl my-4">Title <span className="text-sm text-red-500 align-text-top">*</span></h3>
                    <Input
                        name="title"
                        variant="underlined"
                        type="text"
                        placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
                    />
                </div>
               
                <div className="mt-4 p-5 dark:bg-darkTheme-100 rounded-md">
                    <h3 className="text-xl my-4">What are the details of your problem? <span className="text-sm text-red-500 align-text-top">*</span></h3>
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
                    <h3 className="text-xl mt-4  ">Tags <span className="text-sm text-red-500 align-text-top">*</span></h3>
                    <Input
                        variant="underlined"
                        type="text"
                        placeholder="e.g. (excel css c)"
                        name="tags"
                        value={tagInput}
                        onChange={(e) => setTagInput(() => e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && e.target.value !== '' && tags.length <= 5) {
                                e.preventDefault();
                                setTags(prev => [...prev, e.target.value])
                                setTagInput('')
                            }
                        }}
                    />
                    <p className="text-sm mt-2 mb-4">Add up to 5 tags to describe what your question is about.</p>
                    <div className="space-x-2 mt-10">
                        {tags.map((tag, i) => (
                            <Chip
                                key={i}
                        size="sm"
                        className="rounded-sm text-primaryTheme-700 font-light capitalize"
                        endContent={<AiFillCloseCircle  className="w-4 h-full cursor-pointer text-primaryTheme-500" onClick={() => handleRemoveTag(i)}/>}
						>
							{tag}
                        </Chip>
                        ))}
                    
                    </div>
                    
                </div>
              

                <Button type="submit"  className="my-10 bg-primaryTheme-500 text-black font-semibold">Add Question</Button>
            </form>
            
            <Toaster/>
		</>
	);
};

export default FormAskQuestion;
