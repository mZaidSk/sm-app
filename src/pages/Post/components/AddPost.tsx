import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { createPost } from "@/store/slice/PostSlice";
import { useNavigate } from "react-router-dom";

interface PostData {
    content: string;
    imageFile: File | null;
    postType: "TEXT" | "IMAGE";
    tags: string[];
    visibility: "PUBLIC" | "FRIENDS" | "PRIVATE";
}

const AddPost: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate(); // Initialize useNavigate hook

    const [formData, setFormData] = useState<PostData>({
        content: "",
        imageFile: null,
        postType: "TEXT",
        tags: [],
        visibility: "PUBLIC",
    });

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        if (name === "tags") {
            setFormData({
                ...formData,
                tags: value.split(",").map((tag) => tag.trim()),
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData({ ...formData, imageFile: file });

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreviewUrl(reader.result as string);
            reader.readAsDataURL(file);
        } else {
            setPreviewUrl(null);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("content", formData.content);
        formDataToSend.append("postType", formData.postType);
        formDataToSend.append("tags", JSON.stringify(formData.tags)); // Convert tags to a JSON string
        formDataToSend.append("visibility", formData.visibility);

        if (formData.imageFile) {
            formDataToSend.append("file", formData.imageFile);
        }

        // Log the FormData content
        console.log("FormData contents:");
        for (const [key, value] of formDataToSend.entries()) {
            console.log(`${key}:`, value);
        }

        dispatch(createPost(formDataToSend))
            .unwrap() // Ensure we handle success/failure
            .then(() => {
                // After successful login, navigate to the home page
                navigate("/"); // Redirect to '/'
            })
            .catch((error) => {
                // Handle login failure (optional)
                console.error("Login failed", error);
            });
    };

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white border rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Create Your Post
            </h2>
            <div className="flex flex-col md:flex-row gap-6">
                {/* Form Section */}
                <form onSubmit={handleSubmit} className="flex-1">
                    <div className="mb-4">
                        <Label
                            htmlFor="content"
                            className="font-medium text-gray-700"
                        >
                            Share your thoughts
                        </Label>
                        <Textarea
                            id="content"
                            name="content"
                            placeholder="What's happening?"
                            value={formData.content}
                            onChange={handleChange}
                            required={formData.postType === "TEXT"}
                            className="mt-2 bg-gray-50 rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-300"
                        />
                    </div>

                    {formData.postType === "IMAGE" && (
                        <div className="mb-4">
                            <Label
                                htmlFor="imageFile"
                                className="font-medium text-gray-700"
                            >
                                Upload Image
                            </Label>
                            <Input
                                id="imageFile"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="mt-2 bg-gray-50 rounded-md border-gray-300"
                            />
                        </div>
                    )}

                    <div className="mb-4">
                        <Label
                            htmlFor="postType"
                            className="font-medium text-gray-700"
                        >
                            Post Type
                        </Label>
                        <Select
                            onValueChange={(value) =>
                                setFormData({
                                    ...formData,
                                    postType: value as PostData["postType"],
                                    imageFile: null,
                                })
                            }
                            value={formData.postType}
                        >
                            <SelectTrigger className="mt-2 bg-gray-50 rounded-md border-gray-300">
                                <SelectValue placeholder="Select Post Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="TEXT">Text</SelectItem>
                                <SelectItem value="IMAGE">Image</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="mb-4">
                        <Label
                            htmlFor="tags"
                            className="font-medium text-gray-700"
                        >
                            Tags
                        </Label>
                        <Input
                            id="tags"
                            name="tags"
                            placeholder="Add tags (e.g., travel, coding)"
                            value={formData.tags.join(", ")}
                            onChange={handleChange}
                            className="mt-2 bg-gray-50 rounded-md border-gray-300"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full mt-6 text-white py-2 rounded-lg shadow-md"
                    >
                        Post Now
                    </Button>
                </form>

                {/* Preview Section */}
                {formData.postType === "IMAGE" && (
                    <div className="flex-shrink-0">
                        <h3 className="text-lg font-medium text-gray-700 mb-2">
                            Image Preview
                        </h3>
                        <div className="h-60 w-60 border rounded-md flex items-center justify-center bg-gray-50 shadow-md">
                            {previewUrl ? (
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="h-full w-full object-cover rounded-md"
                                />
                            ) : (
                                <span className="text-gray-400">No Image</span>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddPost;
