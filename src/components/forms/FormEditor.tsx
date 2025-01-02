import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function FormEditor() {
  const [notes, setNotes] = useState('');

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],  // headers
      [{ 'font': [] }],                            // font family
      [{ 'size': ['small', false, 'large', 'huge'] }],  // font size
      ['bold', 'italic', 'underline', 'strike'],   // toggled buttons
      [{ 'color': [] }, { 'background': [] }],     // dropdown with colors
      [{ 'align': [] }],                           // text align
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['blockquote', 'code-block'],
      ['clean']                                    // remove formatting
    ]
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'list', 'bullet',
    'align',
    'blockquote', 'code-block'
  ];

  return (
    <ReactQuill 
      theme="snow"
      value={notes}
      onChange={setNotes}
      modules={modules}
      formats={formats}
      className="h-36" // ajusta la altura según necesites
    />
  );
}

export default FormEditor;