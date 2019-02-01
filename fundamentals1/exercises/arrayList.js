class ArrayList {
  constructor() {
    this.length = 0;
    this.data = {};
  }

  push(value) {
    this.data[this.length] = value;
    this.length++;
    // example = arr[3] = "nacho"
  }

  pop() {
    const answer = this.data[this.length - 1];
    delete this.data[this.length - 1];
    this.length--;
    // also could be return this.delete(this.length-1)
    return answer;
  }

  get(index) {
    return this.data[index];
  }

  delete(index) {
    const answer = this.data[index];
    this._collapseTo(index);
    return answer;
  }

  _collapseTo(index) {
    for (let i = index; i < this.length; i++) {
      this.data[i] = this.data[i + 1];
    }
    delete this.data[this.length - 1];
    this.length--;
  }
}

/* Not good recomendation to use delete to much because is expensive for memory(individual spaces in memory), much cheaper get values. The other way occurs on linked list */
