import { Bold, Essentials, Italic, Mention, Paragraph, Undo } from 'ckeditor5';

export const CKEDITOR_CONFIG = {
  toolbar: ['undo', 'redo', '|', 'bold', 'italic'],
  plugins: [Bold, Essentials, Italic, Mention, Paragraph, Undo],
};
