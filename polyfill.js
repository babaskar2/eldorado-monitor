// polyfill.js - Fix for 'File is not defined' error in Node.js
if (typeof global.File === 'undefined') {
  console.log('Loading File polyfill...');
  
  // Simple File polyfill for Node.js environment
  global.File = class File {
    constructor(blobParts, name, options = {}) {
      this.name = name;
      this.lastModified = options.lastModified || Date.now();
      this._blob = blobParts;
      this.size = blobParts.reduce((size, part) => size + (part.length || part.size || 0), 0);
      this.type = options.type || '';
    }
    
    slice(start, end, contentType) {
      return this;
    }
    
    stream() {
      const { Readable } = require('stream');
      return Readable.from([]);
    }
    
    arrayBuffer() {
      return Promise.resolve(new ArrayBuffer(0));
    }
    
    text() {
      return Promise.resolve('');
    }
  };
  
  console.log('File polyfill loaded successfully');
}
