'use client'
import React from 'react';
import {HeadingProps} from "@/app/interfaces";

const Heading4: React.FC<HeadingProps> = ({children}) => {
    return (
        <h4 className="text-2xl text-black font-bold p-2">{children}</h4>
    );
};

export default Heading4;