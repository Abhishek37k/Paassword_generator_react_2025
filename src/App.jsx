import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [Password, setPassword] = useState("");
// useRef hook 
const passwordRef  = useRef(null);

  const PasswordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+-=";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char)

    }
    setPassword(pass);

  }, [length, charAllowed, numberAllowed, setPassword]);


const copyPasswordToClipboard = useCallback(()=>{
  passwordRef.current?.select()
  passwordRef.current?.setSelectionRange(0,3)
window.navigator.clipboard.writeText(Password)
},[Password])

  useEffect(()=>{ PasswordGenerator()}, [length, charAllowed, numberAllowed])
  return (
    <>
      <h1 className="text-4xl text-center text-white">Password Generator</h1>


      <div className="w-full max-w-lg mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700" >

        <div className="flex shadow-rounded-lg overflow-hidden mb-4">

          <input type="text" value={Password}   ref={passwordRef} className="outline-none w-full py-1 px-3 rounded" placeholder="Password" readOnly />
          <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 rounded" onClick={copyPasswordToClipboard}  >Copy</button>
        </div>

        <div className="flex gap-x-2 text-sm">
          <div className="flex item-center gap-x-1">
            <input type="range" min={6} max={50} value={length} onChange={(e) =>
              setLength(e.target.value)} className="cursor-pointer" />
            <label >Length : {length}</label>
          </div>

          <div className="flex item-center gap-x-1">
            <input type="checkbox" defaultChecked={numberAllowed} id='numberInput' onChange={() => setNumberAllowed(prev => !prev)} />
            <label htmlFor="">NumberAllowed</label>
          </div>

          <div className="flex item-center gap-x-1">
            <input type="checkbox" defaultChecked={charAllowed} id='charInput' onChange={() => setCharAllowed(prev => !prev)} />
            <label htmlFor="">charAllowed</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
