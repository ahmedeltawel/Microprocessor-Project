
class Instruction {

    constructor(type, dest, first, second) {
      this.type = type;
      this.dest = dest;
      this.first = first;
      this.second = second;
      this.issue = undefined;
      this.executionstart = undefined;
      this.executionend = undefined;
      this.writeback = undefined;
    }

  }
  export {Instruction};