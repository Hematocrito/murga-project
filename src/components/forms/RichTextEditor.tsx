import { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['clean']
  ]
};

const formats = [
  'header',
  'bold', 'italic', 'underline',
  'list', 'bullet'
];

const getEditorValue = (editor: Quill) => {
  const html = editor.root.innerHTML;
  return html === '<p><br></p>' ? '' : html;
};

const RichTextEditor = ({ value, onChange, placeholder }: RichTextEditorProps) => {
  const editorContainerRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<Quill | null>(null);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (!editorContainerRef.current || editorRef.current) {
      return;
    }

    const editor = new Quill(editorContainerRef.current, {
      theme: 'snow',
      modules,
      formats,
      placeholder
    });

    editorRef.current = editor;
    if (value) {
      editor.clipboard.dangerouslyPasteHTML(value);
    }

    editor.on('text-change', () => {
      onChangeRef.current(getEditorValue(editor));
    });
  }, [placeholder, value]);

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) {
      return;
    }

    const nextValue = value || '';
    if (getEditorValue(editor) !== nextValue) {
      const selection = editor.getSelection();
      editor.clipboard.dangerouslyPasteHTML(nextValue);
      if (selection) {
        editor.setSelection(selection);
      }
    }
  }, [value]);

  return (
    <div className="rich-text-editor h-32 md:h-48 mb-20 md:mb-12">
      <div ref={editorContainerRef} />
    </div>
  );
};

export default RichTextEditor;
