
class ReservationStation {

    constructor(id, busy, cyclesNeeded, op, Vj, Vk, Qj, Qk, A, instrid) {
      this.id = id; //
      this.busy = busy; //
      this.op = op; //
      this.Vj = Vj; 
      this.Vk = Vk;
      this.Qj = Qj;
      this.Qk = Qk;
      this.A = A; //
      this.cyclesNeeded = cyclesNeeded; //
      this.instrid = instrid;
    }


  }
  export {ReservationStation};