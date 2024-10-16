'use client'
import React from 'react';
import {HeadingProps} from "@/app/interfaces";



const Heading1: React.FC<HeadingProps> = ({children}) => {
    return (
        <h1 className="text-5xl text-black font-extrabold p-2">{children}</h1>
    );
};

export default Heading1;