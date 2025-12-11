import React from 'react';

export interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export interface Laureate {
  name: string;
  image: string;
  role: string;
  desc: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface FileData {
  name: string;
  type: string;
  base64: string;
  content?: string;
}
