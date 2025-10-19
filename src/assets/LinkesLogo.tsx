import type { SVGProps } from 'react';

export function LinkesLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      {...props}
    >
      <rect width="100" height="100" rx="20" fill="#0a0a0a"/>
      <path 
        d="M25 50 L25 35 Q25 25 35 25 L55 25 Q65 25 72 32 L80 40 Q85 45 85 52.5 Q85 60 80 65 L72 73 Q65 80 55 80 L52 80" 
        stroke="#e5e5e5" 
        strokeWidth="14" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        fill="none"
      />
      <path 
        d="M52 80 L35 80 Q25 80 25 70 L25 50" 
        stroke="#e5e5e5" 
        strokeWidth="14" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        fill="none"
      />
      <path 
        d="M72 73 L55 73 Q50 73 50 68 L50 52.5" 
        stroke="#8b5cf6" 
        strokeWidth="14" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        fill="none"
      />
    </svg>
  );
}
