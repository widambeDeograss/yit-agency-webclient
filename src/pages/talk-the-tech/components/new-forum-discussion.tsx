import React, { useState, FormEvent } from 'react';
import ReactMarkdown from 'react-markdown';
import { Button } from "@/components/ui/button";
import {
    Bold,
    Italic,
    Heading,
    List,
    Code,
    Link,
    ListOrdered,
    AlignJustify,
    AtSign,
    ExternalLink,
    Undo,
    Square
} from "lucide-react";
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

type DiscussionFormProps = {
    onSubmit: (data: { title: string; content: string }) => void;
    onCancel: () => void;
    isPending: boolean;
};

type FormattingType =
    | 'bold'
    | 'italic'
    | 'heading'
    | 'link'
    | 'code'
    | 'list'
    | 'orderedList';

const DiscussionForm = ({ onSubmit, onCancel, isPending }: DiscussionFormProps) => {
    const [isPreview, setIsPreview] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit({ title, content });
    };

    const insertFormatting = (format: FormattingType) => {
        const formatters: Record<FormattingType, string> = {
            bold: "**bold text**",
            italic: "*italic text*",
            heading: "# Heading",
            link: "[link text](url)",
            code: "```\ncode block\n```",
            list: "- List item",
            orderedList: "1. List item",
        };

        setContent(prev => prev + " " + formatters[format]);
    };

    return (
        <div className="space-y-4 py-4 w-full">
            <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                    Title
                </label>
                <input
                    id="title"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter a descriptive title"
                    value={title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                />
            </div>

            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <label htmlFor="content" className="text-sm font-medium">
                        Content
                    </label>
                    <div className="flex space-x-2">
                        <Button
                            variant={isPreview ? "outline" : "default"}
                            size="sm"
                            onClick={() => setIsPreview(false)}
                            type="button"
                        >
                            Write
                        </Button>
                        <Button
                            variant={isPreview ? "default" : "outline"}
                            size="sm"
                            onClick={() => setIsPreview(true)}
                            type="button"
                        >
                            Preview
                        </Button>
                    </div>
                </div>

                {!isPreview ? (
                    <div className="border rounded-md">
                        <div className="flex items-center p-2 border-b bg-gray-50">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="p-1 h-8 w-8"
                                onClick={() => insertFormatting('heading')}
                                type="button"
                            >
                                <Heading className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="p-1 h-8 w-8"
                                onClick={() => insertFormatting('bold')}
                                type="button"
                            >
                                <Bold className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="p-1 h-8 w-8"
                                onClick={() => insertFormatting('italic')}
                                type="button"
                            >
                                <Italic className="h-4 w-4" />
                            </Button>
                            <div className="h-4 mx-1 border-r border-gray-300"></div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="p-1 h-8 w-8"
                                onClick={() => insertFormatting('list')}
                                type="button"
                            >
                                <List className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="p-1 h-8 w-8"
                                onClick={() => insertFormatting('orderedList')}
                                type="button"
                            >
                                <ListOrdered className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="p-1 h-8 w-8"
                                onClick={() => insertFormatting('code')}
                                type="button"
                            >
                                <Code className="h-4 w-4" />
                            </Button>
                            <div className="h-4 mx-1 border-r border-gray-300"></div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="p-1 h-8 w-8"
                                onClick={() => insertFormatting('link')}
                                type="button"
                            >
                                <Link className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="p-1 h-8 w-8" type="button">
                                <AtSign className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="p-1 h-8 w-8" type="button">
                                <ExternalLink className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="p-1 h-8 w-8" type="button">
                                <Undo className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="p-1 h-8 w-8" type="button">
                                <Square className="h-4 w-4" />
                            </Button>
                        </div>
                        <textarea
                            id="content"
                            className="w-full px-3 py-2 border-0 rounded-b-md focus:ring-0 focus:outline-none"
                            placeholder="Share your thoughts, questions, or ideas..."
                            rows={6}
                            value={content}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
                        />
                    </div>
                ) : (
                    <div className="border rounded-md p-3 min-h-[150px] max-w-none">
                        {content ? (
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeHighlight]}
                            >
                                {content}
                            </ReactMarkdown>
                        ) : (
                            <p className="text-gray-400">Nothing to preview</p>
                        )}
                    </div>
                )}

                <div className="flex items-center text-xs text-gray-500 mt-1">
                    <span>Supports Markdown. Drag and drop images or paste files.</span>
                </div>
            </div>

            <div className="flex justify-between pt-2">
                <div className="flex items-center">
                    <span className="text-xs text-gray-500">Paste, drop, or click to add files</span>
                </div>
                <div className="flex space-x-2">
                    <Button variant="outline" onClick={onCancel} type="button">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={isPending}
                        type="submit"
                    >
                        {isPending ? 'Posting...' : 'Post Discussion'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DiscussionForm;