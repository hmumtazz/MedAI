/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

// --- MARKDOWN & PARSING UTILS ---
export const parseInline = (text: string) => {
  // 1. Split by Links: [Title](URL)
  // Regex captures the whole link group
  const parts = text.split(/(\[.*?\]\(.*?\))/g);
  
  return parts.map((part, i) => {
    // Check if it's a link
    const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      return (
        <a 
          key={i} 
          href={linkMatch[2]} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-nobel-gold hover:underline font-medium break-words"
        >
          {linkMatch[1]}
        </a>
      );
    }

    // 2. Handle Bold: **text**
    const boldParts = part.split(/(\*\*.*?\*\*)/g);
    return boldParts.map((subPart, j) => {
        if (subPart.startsWith('**') && subPart.endsWith('**')) {
            return <strong key={`${i}-${j}`} className="font-bold text-slate-900">{subPart.slice(2, -2)}</strong>;
        }

        // 3. Handle Single Asterisk: *text* (Bold/Emphasis)
        const subParts = subPart.split(/(\*.*?\*)/g);
        if (subParts.length > 1) {
            return subParts.map((sub, k) => {
                if (sub.startsWith('*') && sub.endsWith('*')) {
                    return <strong key={`${i}-${j}-${k}`} className="font-bold text-slate-800">{sub.slice(1, -1)}</strong>;
                }
                return sub;
            });
        }
        return subPart;
    });
  });
};

export const parseMarkdown = (text: string) => {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];
  let listType: 'ul' | 'ol' | null = null;

  const flushList = () => {
    if (currentList.length > 0 && listType) {
      const ListTag = listType;
      elements.push(
        <ListTag key={elements.length} className="list-disc list-inside space-y-1 my-2">
          {currentList.map((item, i) => (
            <li key={i} className="text-slate-700">{parseInline(item)}</li>
          ))}
        </ListTag>
      );
      currentList = [];
      listType = null;
    }
  };

  lines.forEach((line, idx) => {
    // Headings
    if (line.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={idx} className="text-lg font-bold mt-4 mb-2 text-slate-900">
          {parseInline(line.slice(4))}
        </h3>
      );
    } else if (line.startsWith('## ')) {
      flushList();
      elements.push(
        <h2 key={idx} className="text-xl font-bold mt-6 mb-3 text-slate-900">
          {parseInline(line.slice(3))}
        </h2>
      );
    } else if (line.startsWith('# ')) {
      flushList();
      elements.push(
        <h1 key={idx} className="text-2xl font-bold mt-6 mb-4 text-slate-900">
          {parseInline(line.slice(2))}
        </h1>
      );
    }
    // Unordered list
    else if (line.match(/^[\-\*]\s+/)) {
      if (listType !== 'ul') {
        flushList();
        listType = 'ul';
      }
      currentList.push(line.replace(/^[\-\*]\s+/, ''));
    }
    // Ordered list
    else if (line.match(/^\d+\.\s+/)) {
      if (listType !== 'ol') {
        flushList();
        listType = 'ol';
      }
      currentList.push(line.replace(/^\d+\.\s+/, ''));
    }
    // Empty line
    else if (line.trim() === '') {
      flushList();
    }
    // Regular paragraph
    else {
      flushList();
      elements.push(
        <p key={idx} className="mb-2 text-slate-700 leading-relaxed">
          {parseInline(line)}
        </p>
      );
    }
  });

  flushList();
  return <>{elements}</>;
};