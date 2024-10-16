'use client'
import React from 'react';
import {HeadingProps} from "@/app/interfaces";

const Heading3: React.FC<HeadingProps> = ({children}) => {
    return (
        <h3 className="text-3xl text-black font-bold p-2">{children}</h3>
    );
};

export default Heading3;