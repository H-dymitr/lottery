import React from 'react';
import './App.css';
import * as XLSX from "xlsx";
import {Start} from "./pages/Start";
import {Winners} from "./pages/Winners";
import {Loading} from "./pages/Loading";

enum State {
    START,
    LOADING,
    LOADED,
    ERROR,
}


function App() {
    const [state, setState] = React.useState(State.START);
    const [names, setNames] = React.useState([]);
  const onGenerate = (namess: string[]) => {
      setState(State.LOADING);
      setTimeout(() => {
          setState(State.LOADED);
          namess
              .forEach((value, i) => {
                  setTimeout(() => {
                      // @ts-ignore
                      setNames(nms => [...nms, value]);
                      window.scrollTo(0, document.body.scrollHeight);

                  }, 500 * i);
              });
      }, 8000);
  }

  const onReset = () => {
        setNames([]);
        setState(State.START);
  }
  return (
      <div className="min-h-screen bg-secondary text-white overflow-hidden p-6">
          <div className="mx-auto max-w-md p-4 min-h-screen relative">
              <h1 className="text-center font-bold text-lg my-4">Lottery game</h1>
              {state === State.START && <Start onGenerate={(names) => onGenerate(names)} />}
              {state === State.LOADING && <Loading />}
              {state === State.LOADED && <Winners names={names} reset={onReset} />}

          </div>
      </div>
  );
}

export default App;
