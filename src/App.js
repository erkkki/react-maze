import './App.css';


import Header from "./components/Header/Header"
import Canvas from "./components/Canvas/Canvas";
import SolverButtons from "./components/SolverButtons";


function App() {
  return (
    <div className="App">
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col-4">
            <SolverButtons />
          </div>
          <div className="col-8">
            <Canvas />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
