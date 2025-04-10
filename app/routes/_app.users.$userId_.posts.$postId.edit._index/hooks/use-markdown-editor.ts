import {
  defaultKeymap,
  history,
  historyKeymap,
  indentWithTab,
} from '@codemirror/commands';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import {
  HighlightStyle,
  indentUnit,
  syntaxHighlighting,
} from '@codemirror/language';
import { EditorState, StateEffect } from '@codemirror/state';
import {
  EditorView,
  type ViewUpdate,
  keymap,
  placeholder,
} from '@codemirror/view';
import { tags } from '@lezer/highlight';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface UseMarkdownEditorProps {
  doc: string | null;
  setDoc: (doc: string) => void;
  save: () => void;
  togglePreview?: () => void;
  toggleInsert?: () => void;
  imageUpload?: (file: File, onUploadComplete: (url: string) => void) => void;
}

export const useMarkdownEditor = ({
  doc,
  setDoc,
  save,
  togglePreview,
  toggleInsert,
  imageUpload,
}: UseMarkdownEditorProps) => {
  const editor = useRef(null); // EditorViewの親要素のref
  const [container, setContainer] = useState<HTMLDivElement>();
  const [view, setView] = useState<EditorView>();

  // Markdown記法のハイライト設定
  const highlightStyle = HighlightStyle.define([
    {
      tag: tags.heading1,
      color: 'black',
      fontSize: '1.4em',
      fontWeight: '700',
    },
    {
      tag: tags.heading2,
      color: 'black',
      fontSize: '1.3em',
      fontWeight: '700',
    },
    {
      tag: tags.heading3,
      color: 'black',
      fontSize: '1.2em',
      fontWeight: '700',
    },
    {
      tag: tags.heading4,
      color: 'black',
      fontSize: '1.1em',
      fontWeight: '700',
    },
    { tag: tags.strong, color: 'black', fontWeight: '700' }, // 太字
    { tag: tags.quote, color: '#6a737d' }, // 引用
    { tag: tags.emphasis, fontStyle: 'italic' }, // 斜体
    { tag: tags.url, textDecoration: 'underline' }, // URLに下線をつける
    { tag: tags.strikethrough, textDecoration: 'line-through' }, // 打ち消し線（GFM拡張）
  ]);

  // Editorの状態が更新されたときの処理
  const updateListener = useMemo(() => {
    return EditorView.updateListener.of((update: ViewUpdate) => {
      if (update.docChanged) {
        // エディタのテキストが更新されるたびにdocを更新する
        setDoc(update.state.doc.toString());
      }
    });
  }, [setDoc]);

  // Editor内のキーマップ設定
  const customKeymap = useMemo(() => {
    return keymap.of([
      {
        // 本文の保存
        key: 'Mod-s',
        run() {
          save();
          return true;
        },
      },
      {
        // プレビューと編集モードの切替
        key: 'Mod-p',
        run() {
          togglePreview?.();
          return true;
        },
      },
      {
        // 埋め込みモーダル表示の切替
        key: 'Mod-i',
        run() {
          toggleInsert?.();
          return true;
        },
      },
      {
        // Boldの設定・解除
        key: 'Mod-b',
        run(view) {
          const range = view.state.selection.main;
          if (
            view.state.sliceDoc(range.from, range.from + 2) === '**' &&
            view.state.sliceDoc(range.to - 2, range.to) === '**'
          ) {
            const transaction = view.state.update({
              changes: {
                from: range.from,
                to: range.to,
                insert: view.state.sliceDoc(range.from + 2, range.to - 2),
              },
            });
            view.dispatch(transaction);
          } else {
            const transaction = view.state.update({
              changes: {
                from: range.from,
                to: range.to,
                insert: `**${view.state.sliceDoc(range.from, range.to)}**`,
              },
            });
            view.dispatch(transaction);
          }
          return true;
        },
      },
    ]);
  }, [save, togglePreview, toggleInsert]);

  // Editor内で発生するイベントのハンドラー（extensionsに追加する）
  const eventHandlers = useMemo(
    () =>
      EditorView.domEventHandlers({
        // 画像ファイルがドラッグ＆ドロップされたときの処理
        // ref: https://developer.mozilla.org/ja/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop#%E3%83%89%E3%83%AD%E3%83%83%E3%83%97%E3%81%AE%E5%87%A6%E7%90%86
        drop(event, view) {
          if (!event.dataTransfer) return;

          const insertText = (url: string) => {
            // eventが発生したカーソルの位置を取得する
            const cursorPos = view.posAtCoords({
              x: event.pageX,
              y: event.pageY,
            });
            const insertText = `![image](${url})`;
            const transaction = view.state.update({
              changes: {
                from: cursorPos || 0,
                insert: insertText,
              },
            });
            view.dispatch(transaction);
          };

          // DataTransferItemList インターフェイスを使用して、ファイルにアクセスする
          if (event.dataTransfer.items) {
            for (let i = 0; i < event.dataTransfer.items.length; i++) {
              const item = event.dataTransfer.items[i];
              // ドロップしたものがファイルでない場合は拒否する
              if (item.kind === 'file') {
                const file = item.getAsFile();
                if (!file) return;

                imageUpload?.(file, (url) => {
                  insertText(url);
                });
              }
            }
          } else {
            // DataTransfer インターフェイスを使用してファイルにアクセスする
            for (let i = 0; i < event.dataTransfer.files.length; i++) {
              const file = event.dataTransfer.files[i];

              imageUpload?.(file, (url) => {
                insertText(url);
              });
            }
          }
        },

        // 画像ファイルがペーストされたときの処理
        paste(event, view) {
          if (!event.clipboardData?.files?.length) return;

          for (let i = 0; i < event.clipboardData.files.length; i++) {
            const file = event.clipboardData.files[i];

            imageUpload?.(file, (url) => {
              const insertText = `![image](${url})`;
              const transaction = view.state.update({
                changes: {
                  from: view.state.selection.main.head,
                  insert: insertText,
                },
              });
              view.dispatch(transaction);
            });
          }
        },
      }),
    [imageUpload],
  );

  // Editorのスタイル設定
  const editorStyle = useMemo(() => {
    return EditorView.theme({
      '&': {
        minHeight: '500px',
      },
      // editorの外枠
      '&.cm-editor': {
        outline: 'none', // エディターの枠線を非表示
      },
      // editorの内部
      '&.cm-editor .cm-scroller': {
        fontFamily: `'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace, 'Segoe UI Emoji'`,
        '-webkit-font-smoothing': 'antialiased',
        letterSpacing: '0.02em',
        fontSize: '15px',
        lineHeight: '1.8',
        color: '#000000',
      },
      // 選択範囲の背景色
      '.cm-selectionBackground': {
        backgroundColor: '#036dd626 !important',
      },
    });
  }, []);

  // Editorのextensionsをまとめる
  const extensions = useMemo(() => {
    return [
      placeholder('Write in markdown'),
      history(), // undo/redoを有効化
      keymap.of(defaultKeymap), // defaultKeymapを有効化
      keymap.of(historyKeymap), // historyKeymapを有効化
      keymap.of([indentWithTab]), // タブキーをbindしてインデントの上げ下げに使用する。入力される文字列はindentUnitで設定する
      indentUnit.of('    '), // インデントの単位をスペース4個にする。@codemirror/lang-markdownでネストしたリストに正しい挙動をさせるには2-5の範囲にする必要がある
      EditorView.lineWrapping, // テキストの折返しを有効化
      EditorState.tabSize.of(4), // Tab（\t）をスペース4個分の大きさにする
      updateListener,
      customKeymap,
      eventHandlers,
      editorStyle,
      syntaxHighlighting(highlightStyle),
      markdown({
        // markdownパーサーをGFM(https://github.github.com/gfm/)にする。
        // CommonMarkにない記法の装飾ができるようになる。
        base: markdownLanguage,
        completeHTMLTags: false, // HTMLタグのオートコンプリートを無効化
      }),
    ];
  }, [
    customKeymap,
    updateListener,
    eventHandlers,
    editorStyle,
    highlightStyle,
  ]);

  // Editorをフォーカスする
  const focusToEditor = useCallback(() => {
    if (!view) return;
    view.focus();
  }, [view]);

  // Editorのカーソル位置にテキストを挿入する
  const insertTextToEditor = useCallback(
    (text: string) => {
      if (!view) return;

      const transaction = view.state.update({
        changes: {
          from: view.state.selection.main.head,
          insert: text,
        },
      });
      view.dispatch(transaction);
    },
    [view],
  );

  // editorのrefをcontainerに設定する
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (editor.current) {
      setContainer(editor.current);
    }
  }, [setContainer]);

  // viewを初期化する
  useEffect(() => {
    if (!view && container) {
      const state = EditorState.create({
        doc: doc ?? '',
        extensions,
      });
      const viewCurrent = new EditorView({
        state,
        parent: container,
      });
      setView(viewCurrent);
    }
  }, [view, container, doc, extensions]);

  // extensionsを更新する
  useEffect(() => {
    if (view) {
      view.dispatch({ effects: StateEffect.reconfigure.of(extensions) });
    }
  }, [view, extensions]);

  return {
    editor,
    focusToEditor,
    insertTextToEditor,
  };
};
