import React from 'react';

export const HoneycombBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`
        absolute inset-0
        overflow-hidden
        pointer-events-none
        opacity-[0.03]
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="honeycomb"
            width="56"
            height="100"
            patternUnits="userSpaceOnUse"
            patternTransform="translate(0, 0)"
          >
            <path
              d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-accent"
            />
            <path
              d="M28 0L28 34L0 50L0 16L28 0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-accent"
            />
            <path
              d="M28 0L28 34L56 50L56 16L28 0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-accent"
            />
            <path
              d="M0 50L0 84L28 100L28 66L0 50"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-accent"
            />
            <path
              d="M56 50L56 84L28 100L28 66L56 50"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-accent"
            />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#honeycomb)"
        />
      </svg>
    </div>
  );
};
