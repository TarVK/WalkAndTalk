import {FC} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const Markdown: FC<{children: string}> = ({children}) => (
    <ReactMarkdown children={children} remarkPlugins={[remarkGfm]} />
);
