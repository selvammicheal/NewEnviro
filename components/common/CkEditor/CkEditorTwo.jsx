import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function CkEditorTwo(props) {
    const [editorData, setEditorData] = useState(props.ckEditorData);

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        props.sendDataToParent(data);
    };

    return (
        <div>
            <CKEditor
                editor={ClassicEditor}
                data={editorData}
                onChange={handleEditorChange}
                onBlur={(event, editor) => {
                }}
                onFocus={(event, editor) => {
                }}
                
            />
        </div>
    );
}

export default CkEditorTwo;
