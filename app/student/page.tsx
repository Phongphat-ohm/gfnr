'use client'
import StudentNavbar from "@/components/Navigation/StudentNav";
import { useState } from "react";
import { Editor } from '@tinymce/tinymce-react';


export default function Page() {
    const handleEditorChange = (content: any, editor: any) => {
        console.log('Content was updated:', content);
    };

    return (
        <>
            <StudentNavbar />
            <br /><br /><br /><br /><br />
            <div className="container mx-auto px-5">
                
            </div>
        </>
    )
}