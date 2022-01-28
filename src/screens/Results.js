import React, { useEffect, useState } from "react";
import Button from "../components/Button"



function Results(props) {

    const [render, setrender] = useState(1);
    let M = props.location.instructions.main;
    const [registerarray2, setregisterarray2] = useState([]);
    var registerarray = [];


    useEffect(() => {

        console.log(M.InstrArray[0].type)
        console.log(M.AddTable[0].busy)


        var r = 0;
        for (var prop in M.Register) {
            registerarray.push(M.Register[prop])
            r++;
        }

        setregisterarray2(registerarray)


    }, []);


    const nextcycle = () => {

        if (M.End) alert("Execution Complete!")
        else M.tick();


        var r = 0;
        for (var prop in M.Register) {
            registerarray.push(M.Register[prop])
            r++;
        }

        setregisterarray2(registerarray)

        setrender(Math.random())
    }





    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ width: '100%', height: 70, backgroundColor: '#7900FF', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <label style={{ color: '#fff', fontFamily: 'Archivo', fontWeight: 'bold', fontSize: 24 }}>Tomasulo Algorithm</label>
            </div>
            <div style={{ boxShadow: '0px 1px 5px  0.35px #000', width: '70%', alignSelf: 'center', marginTop: 20, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <label style={{ fontFamily: 'Archivo', fontSize: 17, color: '#000', marginTop: 20, marginBottom: 20, marginLeft: 10 }}>Cycle: <label style={{ fontWeight: 'bold' }}>{M.i}</label></label>
                <Button onClick={() => nextcycle()} title={"Next"} style={{ marginLeft: 'auto', marginRight: 10, width: 120, height: 35 }} />
            </div>
            <div style={{ boxShadow: '0px 1px 5px  0.35px #000', width: '70%', alignSelf: 'center', marginTop: 20, justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontFamily: 'Archivo', fontSize: 20, color: '#000', textAlign: 'center', fontWeight: 'bold', marginTop: 20, marginBottom: 20 }}>Instructions</label>
                <table style={{ width: '100%', marginBottom: 20 }}>
                    <thead>
                        <tr>
                            <th>Instruction</th>
                            <th>DST</th>
                            <th>J</th>
                            <th>K</th>
                            <th>Issue</th>
                            <th>Execution Start</th>
                            <th>Execution End</th>
                            <th>Write Back</th>
                        </tr>
                    </thead>
                    <tbody>
                        {M.InstrArray.map((instr) => (
                            <tr style={{ height: 50 }}>
                                <td style={{ textAlign: 'center' }}>{instr.type}</td>
                                <td style={{ textAlign: 'center' }}>{instr.dest}</td>
                                <td style={{ textAlign: 'center' }}>{instr.first}</td>
                                <td style={{ textAlign: 'center' }}>{instr.second}</td>
                                <td style={{ textAlign: 'center' }}>{instr.issue}</td>
                                <td style={{ textAlign: 'center' }}>{instr.executionstart}</td>
                                <td style={{ textAlign: 'center' }}>{instr.executionend}</td>
                                <td style={{ textAlign: 'center' }}>{instr.writeback}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div style={{ boxShadow: '0px 1px 5px  0.35px #000', width: '70%', alignSelf: 'center', marginTop: 20, justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontFamily: 'Archivo', fontSize: 20, color: '#000', textAlign: 'center', fontWeight: 'bold', marginTop: 20, marginBottom: 20 }}>Add/Sub Buffer</label>
                <table style={{ width: '100%', marginBottom: 20 }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Busy</th>
                            <th>OP</th>
                            <th>vj</th>
                            <th>vk</th>
                            <th>qj</th>
                            <th>qk</th>
                            <th>Cycles Remaining</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {M.InstrArray.map((instr) => ( */}
                        <tr style={{ height: 50 }}>
                            <td style={{ textAlign: 'center' }}>A1</td>
                            <td style={{ textAlign: 'center' }}>{M.AddTable[0].busy + ""}</td>
                            <td style={{ textAlign: 'center' }}>{M.AddTable[0].op}</td>
                            <td style={{ textAlign: 'center' }}>{M.AddTable[0].Vj}</td>
                            <td style={{ textAlign: 'center' }}>{M.AddTable[0].Vk}</td>
                            <td style={{ textAlign: 'center' }}>{M.AddTable[0].Qj}</td>
                            <td style={{ textAlign: 'center' }}>{M.AddTable[0].Qk}</td>
                            <td style={{ textAlign: 'center' }}>{M.AddTable[0].cyclesNeeded}</td>
                        </tr>
                        {/* ))} */}
                        <tr style={{ height: 50 }}>
                            <td style={{ textAlign: 'center' }}>A2</td>
                            <td style={{ textAlign: 'center' }}>{M.AddTable[1].busy + ""}</td>
                            <td style={{ textAlign: 'center' }}>{M.AddTable[1].op}</td>
                            <td style={{ textAlign: 'center' }}>{M.AddTable[1].Vj}</td>
                            <td style={{ textAlign: 'center' }}>{M.AddTable[1].Vk}</td>
                            <td style={{ textAlign: 'center' }}>{M.AddTable[1].Qj}</td>
                            <td style={{ textAlign: 'center' }}>{M.AddTable[1].Qk}</td>
                            <td style={{ textAlign: 'center' }}>{M.AddTable[1].cyclesNeeded}</td>
                        </tr>
                        <tr style={{ height: 50 }}>
                            <td style={{ textAlign: 'center' }}>A3</td>
                            <td style={{ textAlign: 'center' }}>{M.AddTable[2].busy + ""}</td>
                            <td style={{ textAlign: 'center' }}>{M.AddTable[2].op}</td>
                            <td style={{ textAlign: 'center' }}>{M.AddTable[2].Vj}</td>
                            <td style={{ textAlign: 'center' }}>{M.AddTable[2].Vk}</td>
                            <td style={{ textAlign: 'center' }}>{M.AddTable[2].Qj}</td>
                            <td style={{ textAlign: 'center' }}>{M.AddTable[2].Qk}</td>
                            <td style={{ textAlign: 'center' }}>{M.AddTable[2].cyclesNeeded}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div style={{ boxShadow: '0px 1px 5px  0.35px #000', width: '70%', alignSelf: 'center', marginTop: 20, justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontFamily: 'Archivo', fontSize: 20, color: '#000', textAlign: 'center', fontWeight: 'bold', marginTop: 20, marginBottom: 20 }}>Mul/Div Buffer</label>
                <table style={{ width: '100%', marginBottom: 20 }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Busy</th>
                            <th>OP</th>
                            <th>vj</th>
                            <th>vk</th>
                            <th>qj</th>
                            <th>qk</th>
                            <th>Cycles Remaining</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ height: 50 }}>
                            <td style={{ textAlign: 'center' }}>M1</td>
                            <td style={{ textAlign: 'center' }}>{M.MulTable[0].busy + ""}</td>
                            <td style={{ textAlign: 'center' }}>{M.MulTable[0].op}</td>
                            <td style={{ textAlign: 'center' }}>{M.MulTable[0].Vj}</td>
                            <td style={{ textAlign: 'center' }}>{M.MulTable[0].Vk}</td>
                            <td style={{ textAlign: 'center' }}>{M.MulTable[0].Qj}</td>
                            <td style={{ textAlign: 'center' }}>{M.MulTable[0].Qk}</td>
                            <td style={{ textAlign: 'center' }}>{M.MulTable[0].cyclesNeeded}</td>
                        </tr>
                        <tr style={{ height: 50 }}>
                            <td style={{ textAlign: 'center' }}>M2</td>
                            <td style={{ textAlign: 'center' }}>{M.MulTable[1].busy + ""}</td>
                            <td style={{ textAlign: 'center' }}>{M.MulTable[1].op}</td>
                            <td style={{ textAlign: 'center' }}>{M.MulTable[1].Vj}</td>
                            <td style={{ textAlign: 'center' }}>{M.MulTable[1].Vk}</td>
                            <td style={{ textAlign: 'center' }}>{M.MulTable[1].Qj}</td>
                            <td style={{ textAlign: 'center' }}>{M.MulTable[1].Qk}</td>
                            <td style={{ textAlign: 'center' }}>{M.MulTable[1].cyclesNeeded}</td>
                        </tr>
                    </tbody>
                </table>
            </div>


            <div style={{ boxShadow: '0px 1px 5px  0.35px #000', width: '70%', alignSelf: 'center', marginTop: 20, justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontFamily: 'Archivo', fontSize: 20, color: '#000', textAlign: 'center', fontWeight: 'bold', marginTop: 20, marginBottom: 20 }}>SD Buffer</label>
                <table style={{ width: '100%', marginBottom: 20 }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Busy</th>
                            <th>Address</th>
                            <th>v</th>
                            <th>q</th>
                            <th>Cycles Remaining</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ height: 50 }}>
                            <td style={{ textAlign: 'center' }}>S1</td>
                            <td style={{ textAlign: 'center' }}>{M.StoreTable[0].busy + ""}</td>
                            <td style={{ textAlign: 'center' }}>{M.StoreTable[0].A}</td>
                            <td style={{ textAlign: 'center' }}>{M.StoreTable[0].V}</td>
                            <td style={{ textAlign: 'center' }}>{M.StoreTable[0].Q}</td>
                            <td style={{ textAlign: 'center' }}>{M.StoreTable[0].cyclesNeeded}</td>
                        </tr>
                        <tr style={{ height: 50 }}>
                            <td style={{ textAlign: 'center' }}>S2</td>
                            <td style={{ textAlign: 'center' }}>{M.StoreTable[1].busy + ""}</td>
                            <td style={{ textAlign: 'center' }}>{M.StoreTable[1].A}</td>
                            <td style={{ textAlign: 'center' }}>{M.StoreTable[1].V}</td>
                            <td style={{ textAlign: 'center' }}>{M.StoreTable[1].Q}</td>
                            <td style={{ textAlign: 'center' }}>{M.StoreTable[1].cyclesNeeded}</td>
                        </tr>
                        <tr style={{ height: 50 }}>
                            <td style={{ textAlign: 'center' }}>S3</td>
                            <td style={{ textAlign: 'center' }}>{M.StoreTable[2].busy + ""}</td>
                            <td style={{ textAlign: 'center' }}>{M.StoreTable[2].A}</td>
                            <td style={{ textAlign: 'center' }}>{M.StoreTable[2].V}</td>
                            <td style={{ textAlign: 'center' }}>{M.StoreTable[2].Q}</td>
                            <td style={{ textAlign: 'center' }}>{M.StoreTable[2].cyclesNeeded}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div style={{ boxShadow: '0px 1px 5px  0.35px #000', width: '70%', alignSelf: 'center', marginTop: 20, justifyContent: 'center', display: 'flex', flexDirection: 'column', marginBottom: 20 }}>
                <label style={{ fontFamily: 'Archivo', fontSize: 20, color: '#000', textAlign: 'center', fontWeight: 'bold', marginTop: 20, marginBottom: 20 }}>LD Buffer</label>
                <table style={{ width: '100%', marginBottom: 20 }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Busy</th>
                            <th>Address</th>
                            <th>Cycles Remaining</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ height: 50 }}>
                            <td style={{ textAlign: 'center' }}>L1</td>
                            <td style={{ textAlign: 'center' }}>{M.LoadTable[0].busy + ""}</td>
                            <td style={{ textAlign: 'center' }}>{M.LoadTable[0].A}</td>
                            <td style={{ textAlign: 'center' }}>{M.LoadTable[0].cyclesNeeded}</td>
                        </tr>
                        <tr style={{ height: 50 }}>
                            <td style={{ textAlign: 'center' }}>L2</td>
                            <td style={{ textAlign: 'center' }}>{M.LoadTable[1].busy + ""}</td>
                            <td style={{ textAlign: 'center' }}>{M.LoadTable[1].A}</td>
                            <td style={{ textAlign: 'center' }}>{M.LoadTable[1].cyclesNeeded}</td>
                        </tr>
                        <tr style={{ height: 50 }}>
                            <td style={{ textAlign: 'center' }}>L3</td>
                            <td style={{ textAlign: 'center' }}>{M.LoadTable[2].busy + ""}</td>
                            <td style={{ textAlign: 'center' }}>{M.LoadTable[2].A}</td>
                            <td style={{ textAlign: 'center' }}>{M.LoadTable[2].cyclesNeeded}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div style={{ boxShadow: '0px 1px 5px  0.35px #000', width: '70%', alignSelf: 'center', marginTop: 20, marginBottom: 20, justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontFamily: 'Archivo', fontSize: 20, color: '#000', textAlign: 'center', fontWeight: 'bold', marginTop: 20, marginBottom: 20 }}>Registers</label>
                <table style={{ width: '100%', marginBottom: 20 }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registerarray2.map((reg, i) => (
                            <tr style={{ height: 50 }}>
                                <td style={{ textAlign: 'center' }}>{"F" + i}</td>
                                <td style={{ textAlign: 'center' }}>{reg}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>



        </div>
    );
}

export default Results;