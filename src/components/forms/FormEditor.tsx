import { useState } from 'react';
import RichTextEditor from './RichTextEditor';

function FormEditor() {
  const [notes, setNotes] = useState('');

  return (
    <RichTextEditor
      value={notes}
      onChange={setNotes}
    />
  );
}

export default FormEditor;
