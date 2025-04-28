import React, { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Image, FileText, Tag, X, Upload } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import { accountService } from '@/apis/services/auth/account.service';
import { forumsService } from '@/apis/services/tet/forums.services';
import { toast } from 'react-toastify';


interface Category {
  id: number;
  name: string;
  slug: string;
}

interface CreatePostData {
  title: string;
  description: string;
  category: string;
  tags: string[];
  featured_image?: File | null;
}

export default function CreateForumModal() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("write");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Fetch categories
  const {
    data: categories,
    isLoading: isCategoriesLoading
  } = useQuery({
    queryKey: ['categories'],
    queryFn: () => accountService.getTechCategories()
  });

  // Create post mutation
  const createPostMutation = useMutation({
    mutationFn: async (postData: CreatePostData) => {
      const formData = new FormData();
      formData.append('title', postData.title);
      formData.append('description', postData.description);
      formData.append('category', postData.category);
      postData.tags.forEach(tag => formData.append('tags', tag));
      if (postData.featured_image) {
        formData.append('featured_image', postData.featured_image);
      }

      // Replace with your actual API endpoint
      const response = await forumsService.createForums(formData);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Post created successfully!');
      setOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast.error('Failed to create post');
      console.error('Error creating post:', error);
    }
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFeaturedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFeaturedImage(null);
    setPreviewImage(null);
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setCategory("");
    setTags("");
    setFeaturedImage(null);
    setPreviewImage(null);
  };

  const handleSubmit = () => {
    if (!title || !content || !category) {
      toast.error('Please fill all required fields');
      return;
    }

    const tagArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);

    createPostMutation.mutate({
      title,
      description:content,
      category,
      tags: tagArray,
      featured_image: featuredImage
    });
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Create Forum Post</Button>
      <Dialog open={open} onOpenChange={(isOpen) => {
        if (!isOpen) {
          resetForm();
        }
        setOpen(isOpen);
      }

      }>
        <DialogContent className="max-w-7xl p-0 overflow-scroll-y">
          <DialogHeader className="p-6 pb-2">
            <DialogTitle className="text-xl font-bold">Create New Forum Post</DialogTitle>
          </DialogHeader>

          <div className="p-6 pt-2">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-sm font-medium">Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter forum post title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category" className="text-sm font-medium">Category *</Label>
                  <Select
                    value={category}
                    onValueChange={setCategory}
                    disabled={isCategoriesLoading}
                  >
                    <SelectTrigger id="category" className="mt-1">
                      <SelectValue placeholder={isCategoriesLoading ? "Loading..." : "Select category"} />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.results?.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id.toString()}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="tags" className="text-sm font-medium">Tags</Label>
                  <div className="flex items-center mt-1">
                    <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
                    <Input
                      id="tags"
                      placeholder="Tags separated by commas"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Featured Image</Label>
                {!previewImage ? (
                  <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-primary/5 transition-colors">
                    <input
                      type="file"
                      id="featured-image"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <label htmlFor="featured-image" className="cursor-pointer flex flex-col items-center">
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm font-medium">Click to upload featured image</p>
                      <p className="text-xs text-muted-foreground mt-1">PNG, JPG, GIF up to 5MB</p>
                    </label>
                  </div>
                ) : (
                  <div className="relative rounded-lg overflow-hidden border">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-full h-48 object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 rounded-full"
                      onClick={removeImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="content" className="text-sm font-medium mb-2 block">Content *</Label>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-2">
                    <TabsTrigger value="write" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" /> Write
                    </TabsTrigger>
                    <TabsTrigger value="preview" className="flex items-center gap-2">
                      <Image className="h-4 w-4" /> Preview
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="write" className="mt-2">
                    <Textarea
                      id="content"
                      placeholder="Use Markdown to format your comment"
                      value={content}
                      rows={10}
                      onChange={(e) => setContent(e.target.value)}
                      className="min-h-[200px] max-h-[400px] overflow-y-auto"
                      autoFocus
                    />
                  </TabsContent>
                  <TabsContent value="preview" className="border rounded-md p-4 min-h-[200px] max-h-[400px] overflow-y-auto mt-2">
                    {content ? (
                      <div className="prose max-w-none h-full overflow-auto">
                        <ReactMarkdown>{content}</ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center italic py-8">
                        Preview will appear here
                      </p>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>

          <DialogFooter className="p-6 pt-2 border-t bg-muted/30">
            <div className="flex gap-2 ml-auto">
              <Button
                variant="outline"
                onClick={() => {
                  resetForm();
                  setOpen(false);
                }}
                disabled={createPostMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={createPostMutation.isPending || !title || !content || !category}
              >
                {createPostMutation.isPending ? 'Creating...' : 'Create Post'}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}