'use client'
import React from 'react';
import {HeadingProps} from "@/app/interfaces";

const Heading2: React.FC<HeadingProps> = ({children}) => {
    return (
        <h2 className="text-4xl text-black font-bold p-2">{children}</h2>
    );
};

export default Heading2;