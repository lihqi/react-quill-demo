export const copyFormatBrush = (quillEditor, copyFormatting) => {
    // 点击格式刷，如果有选中区域且有样式，则保存其样式，按键状态改为选中。
    // 再次点击，删除样式，按键取消选中。
    if (copyFormatting.value === 'un-active') {
      const range = quillEditor.getSelection(true);
      if (range == null || range.length === 0) return;
      const format = quillEditor.getFormat(range);
      if (Object.keys(format).length === 0) return;
      setCopyFormatting(quillEditor, copyFormatting, 'active', format);
    } else {
      setCopyFormatting(quillEditor, copyFormatting, 'un-active', null);
    }
  };
  
  // 设置copyFormatting: 修改保存的样式、按键状态、粘贴样式的处理程序
  export const setCopyFormatting = (quill, copyFormatting, value, format) => {
    copyFormatting.value = value;
    copyFormatting.format = format;
    const toolbar = quill.getModule('toolbar').container;
    const brushBtn = toolbar.querySelector('.ql-formatBrush');
    if (value === 'active') {
      brushBtn.classList.add('ql-formatBrushactive');
      quill.on('selection-change', pasteFormatHandler);
    } else {
      brushBtn.classList.remove('ql-formatBrushactive');
      quill.off('selection-change', pasteFormatHandler);
    }
    function pasteFormatHandler(range, oldRange, source) {
      return pasteFormat(range, oldRange, source, quill, copyFormatting);
    }
  };
  // 粘贴样式的处理程序: 如果选中范围且有保存样式，则粘贴样式，并初始化copyFormatting
  export const pasteFormat = (range, oldRange, source, quill, copyFormatting) => {
    if (range && copyFormatting.format) {
      if (range.length === 0) {
      } else {
        quill.formatText(range.index, range.length + 1, copyFormatting.format);
        setCopyFormatting(quill, copyFormatting, 'un-active', null);
      }
    } else {
      // console.log('Cursor not in the editor')
    }
  };
  