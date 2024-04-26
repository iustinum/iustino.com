import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { motion as m } from 'framer-motion';

const BlogPost = () => {
    const [postContent, setPostContent] = useState("");
    const { slug } = useParams(); // Assuming your route parameter is named 'slug'

    useEffect(() => {
        const fetchMarkdownPost = async () => {
            try {
                // Dynamic import based on the slug
                const markdownFile = await import(`./posts/${slug}.md`);

                // Fetching the markdown content
                const response = await fetch(markdownFile.default);
                const markdownContent = await response.text();
                setPostContent(markdownContent);
            } catch (err) {
                console.error("Failed to fetch markdown file", err);
                setPostContent("Sorry, the post could not be loaded.");
            }
        };

        fetchMarkdownPost();
    }, [slug]); // Rerun the effect if the slug changes


    // Custom components for markdown
    // e.g. h1 is designed to have a hr after it 
    const customComponents = {
        h1: ({ node, ...props }) => (
            <div>
                <h1 className="text-[#F7CC90] text-[53px] m-0 leading-none font-normal" {...props} />
                <hr className="my-4 border-t-[1px] border-[#F7CC90]" />  {/* Horizontal line after h1 */}
            </div>
        ),
        p: ({ node, ...props }) => (
            <p className="text-[#F7CC90] mt-5 font-normal text-[20px] font-['Sohne-Buch'] tracking-[0px]" {...props} />
        ),
        // Add other tags as needed
    };

    // just feed the customComponents json components field
    return (
        <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="container mx-auto px-4"
        >
            <div className="absolute left-[15%] top-1/2 transform -translate-y-1/4 w-2/5 max-h-[90%]">
                <Markdown components={customComponents}>
                    {postContent}
                </Markdown>
            </div>
        </m.div>
    );
}

export default BlogPost;
