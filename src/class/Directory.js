import { sortBy } from 'lodash-es';
/**
 * @export
 * @class Directory
 * @property {File[]} files
 * @property {string} name
 * @property {Object} dir
 * @property {number} selected
 *
 * @param {Object} options
 * @param {string} options.name
 * @param {File[]} options.files
 * @param {Object} options.directories
 */
export default class Directory {
  constructor({ name = '', files = [], directories = {} } = {}) {
    this.name = name;
    this.files = files;
    this.dir = directories;
    this.selected = 0;

    if (this.files.length) {
      this.sortFilesAlphabetically();
    }
  }

  /**
   *
   * Adds a file to the directory and will create nested directories to properly represent the files local path if required
   * @param {File} file
   * @memberof Directory
   */
  addFile(file) {
    const pathArray = file.webkitRelativePath.split('/');

    pathArray.length -= 1;

    let currentDir = this;

    for (let i = 0, l = pathArray.length; i < l; i++) {
      let dir = currentDir[pathArray[i]];
      if ('undefined' === typeof dir) {
        currentDir.addDirectory(new Directory({ name: pathArray[i] }));
        dir = currentDir.dir[pathArray[i]];
      }

      currentDir = dir;
    }
    currentDir.files.push(file);
    currentDir.sortFilesAlphabetically();
  }

  /**
   * Adds a already existing Directory instance to this directory as a nested directory. It will not add it if there is already a directory with the same name
   * @param {Directory} dir
   * @memberof Directory
   */
  addDirectory(dir) {
    if (
      !(dir instanceof Directory) ||
      (dir instanceof Directory && 'undefined' !== typeof this.dir[dir.name])
    ) {
      return;
    }

    this.dir[dir.name] = dir;
  }

  /**
   * Sorts files stored in this directory Alphabetically
   * @memberof Directory
   */
  sortFilesAlphabetically() {
    this.files = sortBy(this.files, (f) => f.name);
  }

  /**
   *
   * Sets the current pointer of this directory to the specified index if it exists in this directory and returns that file
   * @param {number} index
   * @returns {File}
   * @memberof Directory
   */
  selectByIndex(index) {
    if (-1 < index && index < this.files.length) {
      this.selected = index;
    }

    return this.currentFile();
  }

  /**
   * Sets the current pointer of this directory to the specified file if it exists in this directory and returns it
   * @param {File} file
   * @returns {File}
   * @memberof Directory
   */
  selectByFile(file) {
    const index = this.files.indexOf(file);

    if (-1 === index) {
      return;
    }

    this.selected = index;
    return this.currentFile();
  }

  /**
   * Returns the currently active file in the directory
   * @returns {File}
   * @memberof Directory
   */
  currentFile() {
    return this.files[this.selected];
  }

  /**
   * Moves the directory pointer by plus 1 and returns the file. If it can't move forward it will return the current file
   * @returns {File}
   * @memberof Directory
   */
  nextFile() {
    const next = this.selected + 1;
    const nextFile = this.files[next];

    if ('undefined' === typeof nextFile) {
      return null;
    }

    this.selected = next;
    return this.currentFile();
  }

  /**
   * Moves the directory pointer by minus 1 and returns the file. If it can't move back it will return the current file
   * @returns {File}
   * @memberof Directory
   */
  previousFile() {
    if (0 >= this.selected) {
      return this.files[this.selected];
    }

    this.selected -= 1;

    return this.currentFile();
  }
}
