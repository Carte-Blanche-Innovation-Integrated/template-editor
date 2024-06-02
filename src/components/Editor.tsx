import {EditorContent, useEditor} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import ExtensionVariables from './extension-variables';
import './styles.css';

const extensions = [StarterKit, ExtensionVariables];

const content = `
<p><b>Subject: Application Update - <span data-type="variable" data-id="job_title">$job_title</span> at
<span data-type="variable" data-id="company_name">$company_name</span></b></p>
<p>Dear 
<span data-type="variable" data-id="candidate_name">$candidate_name</span>,</p>

<p>We appreciate you applying for the <span data-type="variable" data-id="job_title">$job_title</span>
position at <span data-type="variable" data-id="company_name">$company_name</span>.</p>

<p>We're currently reviewing applications and wanted to inform you that yours has progressed to the <span data-type="variable" data-id="current_step">$current_step</span> stage.</p>

<p>Our team will reach out to you shortly to schedule this. In the meantime, if you have any questions, feel free to contact us.</p>

<p>Thank you for your continued interest!</p>

<p>Sincerely,<br/>
<span data-type="variable" data-id="sender_name">$sender_name</span></p>`;

export default function Editor() {
  const editor = useEditor({
    extensions,
    content,
  });

  return (
    <div className="rich-text-editor mx-auto max-w-2xl rounded border-2 border-gray-800">
      <EditorContent
        className="prose max-w-full px-4 py-2 [&>*]:outline-none"
        editor={editor}
      />
    </div>
  );
}
