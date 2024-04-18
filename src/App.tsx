import { useState,useCallback, useEffect,useRef } from "react"
import { AppType } from "./DataTypes/App";

function App() {
const[length,setLength]=useState<AppType['length']>(8);
const [numberAll,setNumberAll]=useState<AppType['numberAll']>(false);
const[charAllowed,setCharAllowed]=useState<AppType['charAllowed']>(false);

const [password,setPassword]=useState<AppType['password']>(""); 

const passwordRef=useRef<HTMLInputElement>(null)

const PasswordGenerator=useCallback(()=>{
  let pass:string="";
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  numberAll&& (str+="0123456789");
  charAllowed&&(str+="!@#$%^&*{}[]~");

  for(let index=1;index<=length;index++)
    {
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char);
    }
    setPassword(pass); 


},[length,numberAll,charAllowed,setPassword])

const copyToClipboard = useCallback(()=>{
  if(passwordRef?.current){
    console.log(passwordRef.current);
    passwordRef.current?.select()  
    window.navigator.clipboard.writeText(password)
  }
  // alert('copied to clipboard')
},[password])



useEffect(()=>{PasswordGenerator()},[length,numberAll,charAllowed,PasswordGenerator])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rouded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">
        <h1 className="text-white text-center my-3">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type="text"
        value={password}
        className="outline-none w-full py-1 px-3"
        placeholder="password"
        readOnly
        ref={passwordRef}
        />
        <button 
        onClick={copyToClipboard}
        className="outline-none bg-yellow-700 text-white px-3 py-0.5">copy</button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input type="range"
          min={6}
          max={100}
          value={length}
          className="cursor-pointer"
           onChange={(e)=>{
            setLength(+e.target.value)
           }}/>
           <label>Length:{length}</label>
        </div>
        <div className="flex items-center gap-x-1">
        <input type="checkbox"
          defaultChecked={numberAll}
          id="numberInput"
          onChange={()=>{
            setNumberAll((prev)=>!prev)
          }}
           />
           <label htmlFor="numberInput">Numbers</label>
        </div>

        <div className="flex items-center gap-x-1">
        <input type="checkbox"
          defaultChecked={charAllowed}
          id="charInput"
          onChange={()=>{
            setCharAllowed((prev)=>!prev)
          }}
           />
           <label htmlFor="charInput">characters</label>
        </div>
      </div>
      </div>
      
    </>
  )
}

export default App
