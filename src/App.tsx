import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axiosInstance from "./api/axiosInstance";
import { ENDPOINTS } from "./constants/api";
function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    axiosInstance.get("/api/user/skills").then((res: any) => {
      console.log(res.data);
    });
  }, []);
  return (
    <>
      
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
