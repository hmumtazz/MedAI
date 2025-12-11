/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { parseMarkdown } from '@/utils/markdownUtils';

interface FormattedMessageProps {
  text: string;
}

export const FormattedMessage: React.FC<FormattedMessageProps> = ({ text }) => {
  const formatted = parseMarkdown(text);

  return (
    <div className="prose prose-sm max-w-none prose-slate">
      {formatted}
    </div>
  );
};
