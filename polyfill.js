// polyfill.js
if (typeof File === 'undefined') {
  global.File = class File {
    constructor(blobParts, name, options = {}) {
      this.name = name;
      this.lastModified = options.lastModified || Date.now();
      this._blob = blobParts;
    }
    
    get size() { return 0; }
    get type() { return ''; }
    slice() { return this; }
    stream() { 
      const { Readable } = require('stream');
      return Readable.from([]);
    }
    arrayBuffer() { return Promise.resolve(new ArrayBuffer(0)); }
    text() { return Promise.resolve(''); }
  };
}
