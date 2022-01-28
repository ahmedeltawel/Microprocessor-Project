import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Button from "../components/Button"
import { Main } from "../Main/Main.js"
import 'antd/dist/antd.css';
import {
  Select
} from 'antd';

function Tomasulo(props) {

  const history = useHistory();

  const [instructionCount, setInstructionCount] = useState(1);
  const [memoryCount, setMemoryCount] = useState(1);

  const [addCycles, setAddCycles] = useState(2); //
  const [subCycles, setSubCycles] = useState(2); // 
  const [mulCycles, setMulCycles] = useState(10); // 
  const [divCycles, setDivCycles] = useState(40); // 
  const [loadCycles, setLoadCycles] = useState(2); // 
  const [storeCycles, setStoreCycles] = useState(2); //

  const [registerValues, setRegisterValues] = useState([]);
  const [addressValues, setAddressValues] = useState([]);
  const [memoryValues, setMemoryValues] = useState([]);

  const [instructionTypes, setInstructionTypes] = useState([]);
  const [destinationRegisters, setDestinationRegisters] = useState([]);
  const [firstRegisters, setFirstRegisters] = useState([]);
  const [secondRegisters, setSecondRegisters] = useState([]);

  useEffect(() => {
    const arr = [];
    for (let i = 0; i < 32; i++)
      arr.push(0.0)
    setRegisterValues(arr)

    const arr2 = memoryValues;
    for (let i = memoryValues.length; i < memoryCount; i++)
      arr2.push(0)
    setMemoryValues(arr2)
    console.log(memoryValues)

    const arr3 = addressValues;
    for (let i = addressValues.length; i < memoryCount; i++)
      arr3.push(0)
    setAddressValues(arr3)

    const arr4 = instructionTypes;
    for (let i = instructionTypes.length; i < instructionCount; i++)
      arr4.push('L.D')
    setInstructionTypes(arr4)

    const arr5 = destinationRegisters;
    for (let i = destinationRegisters.length; i < instructionCount; i++)
      arr5.push('')
    setDestinationRegisters(arr5)

    const arr6 = firstRegisters;
    for (let i = firstRegisters.length; i < instructionCount; i++)
      arr6.push('')
    setFirstRegisters(arr6)

    const arr7 = secondRegisters;
    for (let i = secondRegisters.length; i < instructionCount; i++)
      arr7.push('')
    setSecondRegisters(arr7)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memoryCount, instructionCount]);


  const startExecution = () => {

    let M = new Main(addCycles, subCycles, mulCycles, divCycles, loadCycles, storeCycles, instructionTypes, destinationRegisters, firstRegisters, secondRegisters, registerValues, addressValues, memoryValues);


    // while (!M.End) {
    //   M.tick();
    // }
    // M.tick();

    

    console.log(M.AddTable);

    history.push({
      pathname: '/results',
      instructions: {
        instructionTypes: instructionTypes,
        destinationRegisters: destinationRegisters,
        firstRegisters: firstRegisters,
        secondRegisters: secondRegisters,
        main: M
      }
    })
  }



  const renderInstructions = () => {
    let instructions = [];
    for (let i = 0; i < instructionCount; i++) {
      instructions.push(
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', marginBottom: 20, alignItems: 'center' }}>


          <Select style={{
            borderTopColor: "transparent",
            borderBottomColor: "transparent",
            borderLeftColor: "transparent",
            borderRightColor: "transparent",
            minWidth: "140px",
            // imageWidth:"250px",
            // marginTop: "25px", 
            marginLeft: "10px",
            minheight: "40px",
            backgroundColor: "transparent",
            Color: "white",
          }} type="text" name="Terminal" value={instructionTypes[i]} onSelect={(value) => {
            const arr = instructionTypes.slice();
            arr[i] = value;
            setInstructionTypes(arr)
          }} >
            <Select.Option value="L.D">L.D</Select.Option>
            <Select.Option value="S.D">S.D</Select.Option>
            <Select.Option value="ADD.D">ADD.D</Select.Option>
            <Select.Option value="SUB.D">SUB.D</Select.Option>
            <Select.Option value="MUL.D">MUL.D</Select.Option>
            <Select.Option value="DIV.D">DIV.D</Select.Option>
          </Select>


          <input onChange={(e) => {
            const arr = destinationRegisters.slice();
            arr[i] = e.target.value;
            setDestinationRegisters(arr)
          }} value={destinationRegisters[i]} placeholder="Destination Register" style={{ width: 140, height: 40, marginLeft: 10 }} />
          <input onChange={(e) => {
            const arr = firstRegisters.slice();
            arr[i] = e.target.value;
            setFirstRegisters(arr)
          }} value={firstRegisters[i]} placeholder="First Register" style={{ width: 140, height: 40, marginLeft: 10 }} />
          <input onChange={(e) => {
            const arr = secondRegisters.slice();
            arr[i] = e.target.value;
            setSecondRegisters(arr)
          }} value={secondRegisters[i]} placeholder="Second Register" style={{ width: 140, height: 40, marginLeft: 10 }} />
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 'auto', marginRight: 20 }}>
            {i === instructionCount - 1 && i > 0 ? <Image onClick={() => {
              setInstructionCount(instructionCount - 1);
              const arr = instructionTypes.slice();
              arr.splice(arr.length - 1, 1);
              setInstructionTypes(arr);
              const arr2 = destinationRegisters.slice();
              arr2.splice(arr2.length - 1, 1);
              setDestinationRegisters(arr2)
              const arr3 = firstRegisters.slice();
              arr3.splice(arr3.length - 1, 1);
              setFirstRegisters(arr3)
              const arr4 = secondRegisters.slice();
              arr4.splice(arr4.length - 1, 1);
              setSecondRegisters(arr4)
            }} style={{ width: 40, height: 40, cursor: 'pointer', marginRight: 10 }} src={require("../assets/images/minus.png").default} /> : null}
            {i === instructionCount - 1 ? <Image onClick={() => setInstructionCount(instructionCount + 1)} style={{ width: 40, height: 40, cursor: 'pointer' }} src={require("../assets/images/add.png").default} /> : null}
          </div>
        </div>
      )
    }
    return instructions;
  }

  const renderMemory = () => {
    let memory = [];
    for (let i = 0; i < memoryCount; i++) {
      memory.push(
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', marginBottom: 20, alignItems: 'center' }}>
          <label style={{ fontFamily: 'Archivo', fontSize: 20, marginLeft: 10 }}>Address:</label>
          <input onChange={(e) => {
            const arr = addressValues.slice();
            arr[i] = e.target.value;
            setAddressValues(arr)
          }} value={addressValues[i]} placeholder="Address Value" type="number" style={{ width: 140, height: 40, marginLeft: 10 }} />
          <label style={{ fontFamily: 'Archivo', fontSize: 20, marginLeft: 20 }}>Value:</label>
          <input onChange={(e) => {
            const arr = memoryValues.slice();
            arr[i] =  parseFloat(e.target.value)
            setMemoryValues(arr)
          }} value={memoryValues[i]} placeholder="Register Value" type="number" style={{ width: 140, height: 40, marginLeft: 10 }} />
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 'auto', marginRight: 20 }}>
            {i === memoryCount - 1 && i > 0 ? <Image onClick={() => {
              setMemoryCount(memoryCount - 1);
              const arr = memoryValues.slice();
              arr.splice(arr.length - 1, 1);
              console.log(arr)
              setMemoryValues(arr);
              const arr2 = addressValues.slice();
              arr2.splice(arr2.length - 1, 1);
              setAddressValues(arr2)
            }} style={{ width: 40, height: 40, cursor: 'pointer', marginRight: 10 }} src={require("../assets/images/minus.png").default} /> : null}
            {i === memoryCount - 1 ? <Image onClick={() => setMemoryCount(memoryCount + 1)} style={{ width: 40, height: 40, cursor: 'pointer' }} src={require("../assets/images/add.png").default} /> : null}
          </div>
        </div>
      )
    }
    return memory;
  }

  const renderRegisters = () => {

    let registers = [];
    for (let i = 0; i < 32; i += 4) {
      registers.push(
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', marginBottom: 20, alignItems: 'center', justifyContent: 'center' }}>
          <label style={{ fontFamily: 'Archivo', fontSize: 20 }}>F{i}:</label>
          <input onChange={(e) => {
            const arr = registerValues.slice();
            arr[i] = e.target.value;
            setRegisterValues(arr)
          }} value={registerValues[i]} placeholder="Register Value" type="number" style={{ width: 140, height: 40, marginLeft: 10 }} />
          <label style={{ fontFamily: 'Archivo', fontSize: 20, marginLeft: 20 }}>F{i + 1}:</label>
          <input onChange={(e) => {
            const arr = registerValues.slice();
            arr[i + 1] = e.target.value;
            setRegisterValues(arr)
          }} value={registerValues[i + 1]} placeholder="Register Value" type="number" style={{ width: 140, height: 40, marginLeft: 10 }} />
          <label style={{ fontFamily: 'Archivo', fontSize: 20, marginLeft: 20 }}>F{i + 2}:</label>
          <input onChange={(e) => {
            const arr = registerValues.slice();
            arr[i + 2] = e.target.value;
            setRegisterValues(arr)
          }} value={registerValues[i + 2]} placeholder="Register Value" type="number" style={{ width: 140, height: 40, marginLeft: 10 }} />
          <label style={{ fontFamily: 'Archivo', fontSize: 20, marginLeft: 20 }}>F{i + 3}:</label>
          <input onChange={(e) => {
            const arr = registerValues.slice();
            arr[i + 3] = e.target.value;
            setRegisterValues(arr)
          }} value={registerValues[i + 3]} placeholder="Register Value" type="number" style={{ width: 140, height: 40, marginLeft: 10 }} />
        </div>
      )
    }
    return registers;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ width: '100%', height: 70, backgroundColor: '#7900FF', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <label style={{ color: '#fff', fontFamily: 'Archivo', fontWeight: 'bold', fontSize: 24 }}>Tomasulo Algorithm</label>
      </div>
      <div style={{ boxShadow: '0px 1px 5px  0.35px #000', width: '70%', alignSelf: 'center', marginTop: 20, justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
        <label style={{ fontFamily: 'Archivo', fontSize: 20, color: '#000', textAlign: 'center', fontWeight: 'bold', marginTop: 20, marginBottom: 20 }}>Instruction Set</label>
        {renderInstructions()}
      </div>
      <div style={{ boxShadow: '0px 1px 5px  0.35px #000', width: '70%', alignSelf: 'center', marginTop: 20, justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
        <label style={{ fontFamily: 'Archivo', fontSize: 20, color: '#000', textAlign: 'center', fontWeight: 'bold', marginTop: 20, marginBottom: 20 }}>Memory</label>
        {renderMemory()}
      </div>
      <div style={{ boxShadow: '0px 1px 5px  0.35px #000', width: '70%', alignSelf: 'center', marginTop: 20, justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
        <label style={{ fontFamily: 'Archivo', fontSize: 20, color: '#000', textAlign: 'center', fontWeight: 'bold', marginTop: 20, marginBottom: 20 }}>Register File</label>
        {renderRegisters()}
      </div>
      <div style={{ boxShadow: '0px 1px 5px  0.35px #000', width: '70%', alignSelf: 'center', marginTop: 20, justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
        <label style={{ fontFamily: 'Archivo', fontSize: 20, color: '#000', textAlign: 'center', fontWeight: 'bold', marginTop: 20, marginBottom: 20 }}>Number of execution cycles (Latency)</label>
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', marginBottom: 20, alignItems: 'center', justifyContent: 'center' }}>
          <label style={{ fontFamily: 'Archivo', fontSize: 20, color: '#000' }}>ADD: </label>
          <input onChange={(e) => setAddCycles(e.target.value)} value={addCycles} placeholder="" type={'number'} style={{ width: 140, height: 40, marginLeft: 10 }} />
          <label style={{ fontFamily: 'Archivo', fontSize: 20, color: '#000', marginLeft: 30 }}>SUB: </label>
          <input onChange={(e) => setSubCycles(e.target.value)} value={subCycles} placeholder="" type={'number'} style={{ width: 140, height: 40, marginLeft: 10 }} />
          <label style={{ fontFamily: 'Archivo', fontSize: 20, color: '#000', marginLeft: 30 }}>MUL: </label>
          <input onChange={(e) => setMulCycles(e.target.value)} value={mulCycles} placeholder="" type={'number'} style={{ width: 140, height: 40, marginLeft: 10 }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', marginBottom: 20, alignItems: 'center', justifyContent: 'center' }}>
          <label style={{ fontFamily: 'Archivo', fontSize: 20, color: '#000' }}>DIV: </label>
          <input onChange={(e) => setDivCycles(e.target.value)} value={divCycles} placeholder="" type={'number'} style={{ width: 140, height: 40, marginLeft: 10 }} />
          <label style={{ fontFamily: 'Archivo', fontSize: 20, color: '#000', marginLeft: 30 }}>LD: </label>
          <input onChange={(e) => setLoadCycles(e.target.value)} value={loadCycles} placeholder="" type={'number'} style={{ width: 140, height: 40, marginLeft: 10 }} />
          <label style={{ fontFamily: 'Archivo', fontSize: 20, color: '#000', marginLeft: 30 }}>SD: </label>
          <input onChange={(e) => setStoreCycles(e.target.value)} value={storeCycles} placeholder="" type={'number'} style={{ width: 140, height: 40, marginLeft: 10 }} />
        </div>
      </div>
      <div style={{ boxShadow: '0px 1px 5px  0.35px #000', width: '70%', alignSelf: 'center', marginTop: 20, display: 'flex', flexDirection: 'row', marginBottom: 20, alignItems: 'center' }}>
        <label style={{ fontFamily: 'Archivo', fontSize: 17, color: '#000', marginTop: 20, marginBottom: 20, marginLeft: 10 }}>Number of instructions to be executed: <label style={{ fontWeight: 'bold' }}>{instructionCount}</label></label>
        <Button onClick={() => startExecution()} title={"Execute"} style={{ marginLeft: 'auto', marginRight: 10, width: 120, height: 35 }} />
      </div>
    </div>
  );
}

const Image = styled.img`
`;

export default Tomasulo;