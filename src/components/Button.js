import React, { useState } from "react";
import ReactLoading from 'react-loading';

function Button(props) {
  const [hover, setHover] = useState('#54ADFF');

  return (
    <div onMouseEnter={() => setHover('#548CFF')} onMouseLeave={() => setHover('#54ADFF')} onClick={props.disabled ? null : props.onClick}style={{...props.style, background: props.disabled ? 'rgba(220,220,220,1)' : hover, cursor: props.disabled ? 'default' : 'pointer', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', boxShadow: '0px 1px 5px  0.35px #000', borderRadius: 10}}>
      {props.loading ? <ReactLoading type={"spin"} color={"#f4f4f4"} height={27} width={27}/> : <label style={{fontFamily: 'Archivo', fontSize: 20, color: 'rgba(244,244,244,1)', cursor: props.disabled ? 'default': 'pointer'}}>{props.title}</label>}
    </div>
  );
}

export default Button;
