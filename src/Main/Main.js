
import { ReservationStation } from "./ReservationStation.js"
import { Instruction } from "./Instruction.js"
import { Load } from "./Load.js"
import { Registers } from "./Registers.js"
import { Store } from "./Store.js"
// import readline from 'readline';
import promptSync from 'prompt-sync';



class Main {



    constructor(addCycles,subCycles,mulCycles,divCycles,loadCycles,storeCycles,instructionTypes,destinationRegisters,firstRegisters,secondRegisters,registerValues,addressValues,memoryValues) {


        //  this.prompt = promptSync();


        // const rl = readline.createInterface({
        //     input: process.stdin,
        //     output: process.stdout

        // });

        console.log(instructionTypes)

        this.add = addCycles
        this.sub = subCycles
        this.load = loadCycles
        this.store = storeCycles
        this.mul = mulCycles
        this.div = divCycles

        // this.add = 4
        // this.sub = 2
        // this.load = 2
        // this.store = 2
        // this.mul = 6
        // this.div = 40



        // this.instructions = [
        //     ["L.D", "F6", "32"], // F6 = 10
        //     ["L.D", "F2", "44"], // F2 = 5
        //     ["MUL.D", "F0", "F2", "F4"], // F0 = 5*3 = 15
        //     ["SUB.D", "F8", "F2", "F6"], // F8 = 5 - 10 = -5
        //     ["DIV.D", "F10", "F0", "F6"], // F10 = 15 / 10 = 1.5
        //     ["ADD.D", "F6", "F8", "F2"], // F6 = -5 + 5 = 0 
        //     ["ADD.D", "F9", "F8", "F2"], // F9 = 0 
        // ]


        // this.instructions = [
        //     ["MUL.D", "F3", "F1", "F2"], // F6 = 10
        //     ["ADD.D", "F5", "F3", "F4" ], // F2 = 5
        //     ["ADD.D", "F7", "F2", "F6"], // F0 = 5*3 = 15
        //     ["ADD.D", "F10", "F8", "F9"], // F8 = 5 - 10 = -5
        //     ["MUL.D", "F11", "F7", "F10"], // F10 = 15 / 10 = 1.5
        //     ["ADD.D", "F5", "F5", "F11"], // F6 = -5 + 5 = 0 
        // ]



                // MUL R3, R1, R2  //R3 = 2 * 3 = 6
                // ADD R5, R3, R4 // R5 = 6 + 2 = 8
                // ADD R7, R2, R6 // R7 = 3 + 7 = 10
                // ADD R10, R8, R9 // R10 = 5 + 15 =20 
                // MUL R11, R7, R10 // R11 = 10 * 20 = 200
                // ADD R5, R5, R11 // R5 = 8 + 200 = 208

        this.InstrArray = []
        this.instr = ""

        for (let i = 0; i < instructionTypes.length; i++) {
            if (instructionTypes[i] == "L.D" || instructionTypes[i] == "S.D")
            this.instr = new Instruction(instructionTypes[i], destinationRegisters[i], firstRegisters[i])
            else
            this.instr = new Instruction(instructionTypes[i], destinationRegisters[i], firstRegisters[i], secondRegisters[i])
            this.InstrArray.push(this.instr)
        }


        // for (let i = 0; i < this.instructions.length; i++) {
        //     if (this.instructions[i][0] == "L.D" || this.instructions[i][0] == "S.D")
        //     this.instr = new Instruction(this.instructions[i][0], this.instructions[i][1], this.instructions[i][2])
        //     else
        //     this.instr = new Instruction(this.instructions[i][0], this.instructions[i][1], this.instructions[i][2], this.instructions[i][3])
        //     this.InstrArray.push(this.instr)
        // }


        // console.log(this.InstrArray[0])
        // console.log(this.InstrArray[1])
        // console.log(this.InstrArray[2])




        // const NoOfAddSlots = 3;
        // const NoOfMulStots = 2;

        this.memory = new Map();

        // this.memory.set("32", 10)
        // this.memory.set("44", 5)

        for (let i = 0; i < addressValues.length; i++) {

            this.memory.set(addressValues[i],memoryValues[i])   
        }

        console.log(this.memory)



        this.Register = new Registers

        var r = 0;
        for (var prop in this.Register) {
           this.Register[prop] = parseFloat(registerValues[r])
           r++;
        }


        

        console.log(this.Register)
      


        this.AddTable = []
        this.MulTable = []
        this.LoadTable = []
        this.StoreTable = []

     

        this.myReservationStationAdd1 = new ReservationStation('A1', false)
        this.myReservationStationAdd2 = new ReservationStation('A2', false)
        this.myReservationStationAdd3 = new ReservationStation('A3', false)

        this.myReservationStationMul1 = new ReservationStation('M1', false)
        this.myReservationStationMul2 = new ReservationStation('M2', false)

        this.loadstation1 = new Load("L1", false)
        this.loadstation2 = new Load("L2", false)
        this.loadstation3 = new Load("L3", false)

        this.storestation1 = new Store("S1", false)
        this.storestation2 = new Store("S2", false)
        this.storestation3 = new Store("S3", false)


        // console.log(AddSlots)
        this.AddTable.push(this.myReservationStationAdd1);
        this.AddTable.push(this.myReservationStationAdd2);
        this.AddTable.push(this.myReservationStationAdd3);

        this.MulTable.push(this.myReservationStationMul1);
        this.MulTable.push(this.myReservationStationMul2);

        this.LoadTable.push(this.loadstation1);
        this.LoadTable.push(this.loadstation2);
        this.LoadTable.push(this.loadstation3);

        this.StoreTable.push(this.storestation1);
        this.StoreTable.push(this.storestation2);
        this.StoreTable.push(this.storestation3);

      

    

    this.instrCounter = 0;
    this.writeback = new Map();

    this.FlagAddSub = false;
    this.FlagMulDiv = false;
    this.FlagLoad = false;
    this.FlagStore = false;

    this.instrleft = true;
    this.Addtableempty = false;
    this.Multableempty = false;
    this.Loadtableempty = false;
    this.Storetableempty = false;
    this.End = false;

    this.i = 1;

    console.log("Createddd!!")

    }



    tick() {

       if(this.End){
           return false
       }
        // while (!this.End) {
            this.Addtableempty = false;
            this.Multableempty = false;
            this.Loadtableempty = false;
            this.Storetableempty = false;

            var instrtype
            if (this.instrCounter < this.InstrArray.length) {
                this.instr = this.InstrArray[this.instrCounter];
                instrtype = (this.instr.type).toLowerCase()

            }
            else {
                this.instr = undefined;
                instrtype = undefined;
                this.instrleft = false;
            }

            console.log(instrtype)

            if (instrtype == "l.d") {
                var added = false;

                this.LoadTable.forEach(element => {
                    if (element.busy == false) {
                        if (!added) {
                            element.busy = true;
                            element.A = this.instr.first
                            element.cyclesNeeded = this.load
                            element.instrid = this.instrCounter
                            this.Register[this.instr.dest] = element.id
                            this.instr.issue = this.i;
                            added = true;
                        }
                    }
                });

                if (added) this.instrCounter++;

            }

            else if (instrtype == "s.d") {
                var added = false;

                this.StoreTable.forEach(element => {
                    if (element.busy == false) {
                        if (!added) {
                            element.busy = true;
                            element.A = this.instr.first
                            element.cyclesNeeded = this.store
                            element.instrid = this.instrCounter
                            if (typeof this.Register[this.instr.dest] === 'string')
                                element.Q = this.Register[this.instr.dest]
                            else
                                element.V = this.Register[this.instr.dest]

                            this.instr.issue = this.i;
                            added = true;
                        }
                    }
                });
                if (added) this.instrCounter++;
            }

            else if (instrtype == "add.d") {
                var added = false;

                this.AddTable.forEach(element => {
                    if (element.busy == false) {
                        if (!added) {
                            element.busy = true;
                            element.op = this.instr.type;
                            element.cyclesNeeded = this.add
                            element.instrid = this.instrCounter

                            if (typeof this.Register[this.instr.first] === 'string')
                                element.Qj = this.Register[this.instr.first]
                            else
                                element.Vj = this.Register[this.instr.first]

                            if (typeof this.Register[this.instr.second] === 'string')
                                element.Qk = this.Register[this.instr.second]
                            else
                                element.Vk = this.Register[this.instr.second]

                            this.Register[this.instr.dest] = element.id
                            this.instr.issue = this.i;
                            added = true;
                        }
                    }
                });
                if (added) this.instrCounter++;
            }

            else if (instrtype == "sub.d") {
                var added = false;

                this.AddTable.forEach(element => {
                    if (element.busy == false) {
                        if (!added) {
                            element.busy = true;
                            element.op = this.instr.type;
                            element.cyclesNeeded = this.sub
                            element.instrid = this.instrCounter

                            if (typeof this.Register[this.instr.first] === 'string')
                                element.Qj = this.Register[this.instr.first]
                            else
                                element.Vj = this.Register[this.instr.first]

                            if (typeof this.Register[this.instr.second] === 'string')
                                element.Qk = this.Register[this.instr.second]
                            else
                                element.Vk = this.Register[this.instr.second]

                                this.Register[this.instr.dest] = element.id
                            this.instr.issue = this.i;
                            added = true;
                        }
                    }
                });
                if (added) this.instrCounter++;
            }

            else if (instrtype == "mul.d") {
                var added = false;

                this.MulTable.forEach(element => {
                    if (element.busy == false) {
                        if (!added) {
                            element.busy = true;
                            element.op = this.instr.type;
                            element.cyclesNeeded = this.mul
                            element.instrid = this.instrCounter

                            if (typeof this.Register[this.instr.first] === 'string')
                                element.Qj = this.Register[this.instr.first]
                            else
                                element.Vj = this.Register[this.instr.first]

                            if (typeof this.Register[this.instr.second] === 'string')
                                element.Qk = this.Register[this.instr.second]
                            else
                                element.Vk = this.Register[this.instr.second]

                          this.Register[this.instr.dest] = element.id
                            this.instr.issue = this.i;
                            added = true;
                        }
                    }
                });
                if (added) this.instrCounter++;
            }

            else if (instrtype == "div.d") {
                var added = false;

                this.MulTable.forEach(element => {
                    if (element.busy == false) {
                        if (!added) {
                            element.busy = true;
                            element.op = this.instr.type;
                            element.cyclesNeeded = this.div
                            element.instrid = this.instrCounter

                            if (typeof this.Register[this.instr.first] === 'string')
                                element.Qj = this.Register[this.instr.first]
                            else
                                element.Vj = this.Register[this.instr.first]

                            if (typeof this.Register[this.instr.second] === 'string')
                                element.Qk = this.Register[this.instr.second]
                            else
                                element.Vk = this.Register[this.instr.second]

                                this.Register[this.instr.dest] = element.id
                            this.instr.issue = this.i;
                            added = true;
                        }
                    }
                });
                if (added) this.instrCounter++;
            }

            // console.log(this.InstrArray)
            console.log("-------------------------------")
            console.log("-------------------------------")



            this.AddTable.forEach(element => {  //AddSub
                if (element.busy == true) {

                    if (!((element.instrid != null) && this.InstrArray[element.instrid].issue === this.i)) {

                        if (element.Vj != null && element.Vk != null && this.InstrArray[element.instrid].executionstart == null) {
                            this.InstrArray[element.instrid].executionstart = this.i;
                            // this.FlagAddSub = true
                        }
                        if (this.InstrArray[element.instrid].executionstart != null) {
                            element.cyclesNeeded--;
                            if (element.cyclesNeeded == 0) {
                                this.InstrArray[element.instrid].executionend = this.i;
                                // this.FlagAddSub = false
                            }
                            console.log(element.cyclesNeeded)
                            if (element.cyclesNeeded === -1) {
                                this.InstrArray[element.instrid].writeback = this.i;
                                if (element.op == "ADD.D") {
                                    this.writeback.set(element.id, (element.Vj + element.Vk))
                                }
                                else {
                                    this.writeback.set(element.id, (element.Vj - element.Vk))
                                }
                                console.log(this.Register[this.InstrArray[element.instrid].dest])
                                console.log(element.id)
                                if (this.Register[this.InstrArray[element.instrid].dest] == element.id)
                                    this.Register[this.InstrArray[element.instrid].dest] = this.writeback.get(element.id)

                                element.busy = false;
                                element.op = undefined;
                                element.Vj = undefined;
                                element.Vk = undefined;
                                element.Qj = undefined;
                                element.Qk = undefined;
                                element.cyclesNeeded = undefined;
                                element.instrid = undefined;
                            }

                        }

                    }
                }

            })

            // console.log(AddTable)



            this.MulTable.forEach(element => { //MulDiv
                if (element.busy == true) {

                    if (!((element.instrid != null) && this.InstrArray[element.instrid].issue === this.i)) {

                        if (element.Vj != null && element.Vk != null && this.InstrArray[element.instrid].executionstart == null) {
                            this.InstrArray[element.instrid].executionstart = this.i;
                            // this.FlagMulDiv = true
                        }
                        if (this.InstrArray[element.instrid].executionstart != null) {
                            element.cyclesNeeded--;
                            if (element.cyclesNeeded == 0) {
                                this.InstrArray[element.instrid].executionend = this.i;
                                // this.FlagMulDiv = false
                            }
                            console.log(element.cyclesNeeded)
                            if (element.cyclesNeeded === -1) {
                                this.InstrArray[element.instrid].writeback = this.i;
                                if (element.op == "MUL.D") {
                                    this.writeback.set(element.id, (element.Vj * element.Vk))
                                }
                                else {
                                    this.writeback.set(element.id, (element.Vj / element.Vk))
                                }
                                if (this.Register[this.InstrArray[element.instrid].dest] == element.id)
                                    this.Register[this.InstrArray[element.instrid].dest] = this.writeback.get(element.id)

                                element.busy = false;
                                element.op = undefined;
                                element.Vj = undefined;
                                element.Vk = undefined;
                                element.Qj = undefined;
                                element.Qk = undefined;
                                element.cyclesNeeded = undefined;
                                element.instrid = undefined;
                            }

                        }
                    }

                }

            })



            this.StoreTable.forEach(element => { //Store
                if (element.busy == true) {

                    if (!((element.instrid != null) && this.InstrArray[element.instrid].issue === this.i)) {

                        if (element.V != null && this.InstrArray[element.instrid].executionstart == null) {
                            this.InstrArray[element.instrid].executionstart = this.i;
                        //   this.FlagStore = true
                        }
                        if (this.InstrArray[element.instrid].executionstart != null) {
                            element.cyclesNeeded--;
                            if (element.cyclesNeeded == 0) {
                                this.InstrArray[element.instrid].executionend = this.i;
                                // this.FlagStore = false
                            }
                            console.log(element.cyclesNeeded)
                            if (element.cyclesNeeded === -1) {
                                this.InstrArray[element.instrid].writeback = this.i;
                                this.memory.set(this.InstrArray[element.instrid].first, element.V)

                                element.busy = false;
                                element.V = undefined;
                                element.Q = undefined;
                                element.A = undefined;
                                element.cyclesNeeded = undefined;
                                element.instrid = undefined;
                            }

                        }
                    }

                }

            })



            this.LoadTable.forEach(element => { //Load
                if (element.busy == true) {

                    // console.log(element)

                    if (!((element.instrid != null) && this.InstrArray[element.instrid].issue === this.i)) {

                        if (this.InstrArray[element.instrid].executionstart == null ) {
                            this.InstrArray[element.instrid].executionstart = this.i;
                            // this.FlagLoad = true
                        }
                        if (this.InstrArray[element.instrid].executionstart != null) {
                            element.cyclesNeeded--;
                            if (element.cyclesNeeded == 0) {
                                this.InstrArray[element.instrid].executionend = this.i;
                                // this.FlagLoad = false
                            }
                            if (element.cyclesNeeded === -1) {
                                this.InstrArray[element.instrid].writeback = this.i;
                                this.writeback.set(element.id, this.memory.get(element.A))

                                console.log("Loaddddd")
                                console.log(this.Register[this.InstrArray[element.instrid].dest])
                                console.log(element.id)
                                if (this.Register[this.InstrArray[element.instrid].dest] == element.id)
                                    this.Register[this.InstrArray[element.instrid].dest] = this.writeback.get(element.id)

                                element.busy = false;
                                element.A = undefined;
                                element.cyclesNeeded = undefined;
                                element.instrid = undefined;
                            }

                        }

                    }
                }

            })




            this.AddTable.forEach(element => {

                if (element.Qj != null) {
                    if (this.writeback.has(element.Qj)) {
                        console.log("Hereeeee")
                        console.log(this.writeback.get(element.Qj))
                        element.Vj = this.writeback.get(element.Qj);
                        element.Qj = undefined;
                    }
                }
                if (element.Qk != null) {
                    if (this.writeback.has(element.Qk)) {
                        console.log("Hereeeee")
                        console.log(this.writeback.get(element.Qk))
                        element.Vk = this.writeback.get(element.Qk);
                        element.Qk = undefined;
                    }
                }
            })

            this.MulTable.forEach(element => {
                if (element.Qj != null) {
                    if (this.writeback.has(element.Qj)) {
                        console.log("Mulllll")
                        console.log(this.writeback.get(element.Qj))
                        element.Vj = this.writeback.get(element.Qj);
                        element.Qj = undefined;
                    }
                }
                if (element.Qk != null) {
                    if (this.writeback.has(element.Qk)) {
                        console.log("Mulllll")
                        console.log(this.writeback.get(element.Qk))
                        element.Vk = this.writeback.get(element.Qk);
                        element.Qk = undefined;
                    }
                }
            })

            this.StoreTable.forEach(element => {
                if (element.Q != null) {
                    console.log("Storeeee")
                    console.log(this.writeback.get(element.Q))
                    if (this.writeback.has(element.Q)) {
                        element.V = this.writeback.get(element.Q);
                        element.Q = undefined;
                    }
                }
            })

            this.writeback.clear();


            var inn = false;
            this.AddTable.forEach(element => {
                if (!this.instrleft)
                    if (element.busy) inn = true;
            })
            if (!inn) this.Addtableempty = true;


            inn = false;
            this.MulTable.forEach(element => {
                if (!this.instrleft)
                    if (element.busy) inn = true;
            })
            if (!inn) this.Multableempty = true;


            inn = false;
            this.LoadTable.forEach(element => {
                if (!this.instrleft)
                    if (element.busy) inn = true;
            })
            if (!inn) this.Loadtableempty = true;


            inn = false;
            this.StoreTable.forEach(element => {
                if (!this.instrleft)
                    if (element.busy) inn = true;
            })
            if (!inn) this.Storetableempty = true;



            if ((!this.instrleft) && this.Addtableempty && this.Multableempty && this.Loadtableempty && this.Storetableempty) this.End = true;


            this.i++;
            // const input = prompt("Next Cycle");
            console.log("Cycle" + this.i);

        // }

        // console.log(this.Register)
        // console.log(this.InstrArray)
        // console.log(this.LoadTable)
        // console.log(StoreTable)
        // console.log(MulTable)
        // console.log(this.AddTable)

    }
}


export { Main };


// AddSlots = AddSlots.filter(function(value, index, arr){ 
//     return value > 5;
// });
// console.log(AddSlots)
// myReservationStation.op = 99;
// console.log(AddSlots)



