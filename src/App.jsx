import React, { useRef, useState} from "react";
import ReactQuill , { Quill } from 'react-quill-with-table';
import QuillBetterTable from 'quill-better-table';
import { copyFormatBrush } from './handler.jsx';
import 'react-quill-with-table/dist/quill.snow.css';
import 'quill-better-table/dist/quill-better-table.css';
import './handler.css';

Quill.register({
  "modules/better-table": QuillBetterTable,
},true);

const CustomButton = () => <i className="iconfont">格式刷</i>;

const CustomToolbar = () => (
  <div id="toolbar">
    <select className="ql-header" defaultValue={''} onChange={(e) => e.persist()}>
      <option value="1" />
      <option value="2" />
      <option value="3" />
      <option value="4" />
      <option value="5" />
      <option selected />
    </select>
    <select className="ql-size" defaultValue={''} onChange={(e) => e.persist()}>
      <option value="small" />
      <option selected />
      <option value="large" />
      <option value="huge" />
    </select>
    <button className="ql-formatBrush">
      <CustomButton />
    </button>
    <button className="ql-bold" />
    <button className="ql-italic" />
    <button className="ql-underline" />
    <button className="ql-strike" />
    <select className="ql-color" />
    <select className="ql-background" />
    <select className="ql-align" />
    <button className="ql-list" value="ordered" />
    <button className="ql-list" value="bullet" />
    <button className="ql-indent" value="+1" />
    <button className="ql-indent" value="-1" />
    <button className="ql-image" />
    <button className="ql-clean" />
  </div>
);


const copyFormatting = {
  value: 'un-active',
  format: {},
};


const  App = () =>  {
  const [value, setValue] = useState('');
  const editorRef = useRef(null);

  const modules = {
    toolbar: {
      // container: toolbarContainer,
      container: '#toolbar',
      handlers: {
        formatBrush: () => {
          copyFormatBrush(editorRef.current?.getEditor(), copyFormatting);
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
      <CustomToolbar />
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
