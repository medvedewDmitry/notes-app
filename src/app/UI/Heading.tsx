'use client';

type HeadingType = 'h1' | 'h2' | 'h3' | 'h4';

interface HeadingProps {
    type: HeadingType;
    children: string;
}

const Heading = ({ type, children }: HeadingProps) => {
    const headingClasses = {
        h1: 'text-5xl',
        h2: 'text-4xl',
        h3: 'text-3xl',
        h4: 'text-2xl'
    };
    const classNames = `${headingClasses[type]} text-black font-extrabold p-2`;
    const Tag = type;

    return <Tag className={classNames}>{children}</Tag>;
};

export default Heading;
