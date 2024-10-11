import { Injectable } from '@angular/core';
import { environment } from '@env';
import {
  BlockQuote,
  Bold,
  Code,
  CodeBlock,
  Essentials,
  FileRepository,
  Font,
  Image,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  List,
  Paragraph,
  SimpleUploadAdapter,
  Strikethrough,
  Subscript,
  Superscript,
  TodoList,
} from 'ckeditor5';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class CkeditorService {
  constructor(private storage: StorageService) {}

  config = {
    toolbar: [
      'undo',
      'redo',
      '|',
      'bold',
      'italic',
      'strikethrough',
      'subscript',
      'superscript',
      'code',
      '|',
      'link',
      'uploadImage',
      'blockQuote',
      'codeBlock',
      '|',
      'bulletedList',
      'numberedList',
      'todoList',
      'outdent',
      'indent',
    ],
    plugins: [
      Essentials,
      Bold,
      Italic,
      Font,
      Paragraph,
      Strikethrough,
      Subscript,
      Superscript,
      Code,
      Link,
      Image,
      ImageUpload,
      SimpleUploadAdapter,
      FileRepository,
      BlockQuote,
      CodeBlock,
      List,
      TodoList,
      IndentBlock,
      Indent,
    ],
    simpleUpload: {
      uploadUrl: `${environment.base_url}/upload/`,
      withCredentials: true,
      headers: {
        Authorization: `token ${this.storage.token}`,
      },
    },
  };
}
