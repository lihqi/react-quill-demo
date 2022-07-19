import React, { useRef, useState} from "react";
import ReactQuill , { Quill } from 'react-quill-with-table';
import QuillBetterTable from 'quill-better-table';
import 'react-quill-with-table/dist/quill.snow.css';
import 'quill-better-table/dist/quill-better-table.css';

Quill.register({
  "modules/better-table": QuillBetterTable,
},true);

const  App = () =>  {
  const [value, setValue] = useState('');
  const editorRef = useRef(null);

  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean'],
        ['table']
      ],
      handlers: {
        'table': () => {
          const tableModule = editorRef.current.getEditor().getModule('better-table');
          tableModule.insertTable(4, 4) // 简单插入一个3*3到表格
        },
      },
    },
    table: false,
    'better-table': {
      operationMenu: {
        items: {
          insertColumnRight: {
            text: '右边插入一列'
          },
          insertColumnLeft: {
            text: '左边插入一列'
          },
          insertRowUp: {
            text: '上边插入一行'
          },
          insertRowDown: {
            text: '下边插入一行'
          },
          mergeCells: {
            text: '合并单元格'
          },
          unmergeCells: {
            text: '拆分单元格'
          },
          deleteColumn: {
            text: '删除列'
          },
          deleteRow: {
            text: '删除行'
          },
          deleteTable: {
            text: '删除表格'
          }
        },
        color: {
          colors: ['green', 'red', 'yellow', 'blue', 'white'],
          text: 'Background Colors:'
        }
      }
    },
    keyboard: {
      bindings: QuillBetterTable.keyboardBindings
    }
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
    // 'table'
  ]


  return (
    <div className="App">
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        ref={editorRef}
        // value={value}
        onChange={(v) => console.log(v)}
      />

    </div>
  );
}

export default App;
