import React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const faqData = [
    {
        question: "What is Latzio?",
        answer: "Latzio is a modern social media platform where you can connect, share, and engage with your friends through photos, videos, and text updates."
    },
    {
        question: "Is Latzio free to use?",
        answer: "Yes, Latzio is completely free to use. However, we offer premium features for users who want to enhance their experience."
    },
    {
        question: "What types of content can I share on Latzio?",
        answer: "You can share photos, videos, and text updates."
    },
    {
        question: "How is my data protected on Latzio?",
        answer: "Latzio uses industry-standard encryption and secure servers to protect your data. We also have a detailed privacy policy outlining how your data is used."
    },
    {
        question: "How do I report inappropriate content?",
        answer: "Use the \"Report\" button available on posts, profiles, or messages, and our moderation team will review it promptly."
    }
];

const GeneralFaq = () => {
    return (
        <div className="m-6 p-4">
            <h1 className="text-2xl font-bold mb-4">Frequently Asked Questions</h1>
            <div className=" border shadow-lg rounded-md m-2 p-6">
                <Accordion type="single" collapsible>
                    {faqData.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger>{item.question}</AccordionTrigger>
                            <AccordionContent>{item.answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    );
};

export default GeneralFaq;
