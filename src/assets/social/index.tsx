import { type ReactNode } from "react";

interface SocialProps {
    url: string;
    children: ReactNode;
}

export function Social({ url, children }: SocialProps) {
    return (
        <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="hover:opacity-70 transition-opacity"
        >
        {children}
        </a>
    )
}