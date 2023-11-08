import * as React from 'react';

type PageProps = {
    title: string
}

export default function TitleBox({ title }: PageProps) {
    return (
        <div className='p-24'>
            <h1>{title}</h1>
        </div>
    );
}