import React from 'react';

interface LinkListProps {
    links: Array<{ title: string; url: string }>;
}

export const LinkList: React.FC<LinkListProps> = ({ links }) => {
    return (
        <ul>
            {links.map((link, index) => (
                <li key={index}>
                    <a href={link.url} className="text-blue-500">{link.title}</a>
                </li>
            ))}
        </ul>
    );
};