import React, {useState } from 'react';
import './App.css';
import Form from './components/Form';
import Lists from "./components/Lists";

const intialTodoData = localStorage.getItem('todoData')? JSON.parse(localStorage.getItem('todoData')) : [];

export default function App () {
  //console.log('App component is renering');
  
  const [todoData, setTodoData] = useState(intialTodoData);
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false
    };
    // 원래 할 일에 새로운 할 일 더해주기
    setTodoData([...todoData, newTodo]);
    // 새로고침해도 입력했던 것들 그대로 있도록 localstorage에 저장
    // JSON.stringify를 사용해서 텍스트로 변환해준 다음에 저장
    localStorage.setItem('todoData', JSON.stringify([...todoData, newTodo]));
    setValue("");
};

const handleRemoveClick = () => {
  setTodoData([]);
  localStorage.removeItem('todoData');
};


  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg"> 
        <div className="flex justify-between mb-3"> 
        <h1>할 일 목록</h1>
        <button onClick={handleRemoveClick}>Delete All</button>
        </div>

        <Lists todoData={todoData} setTodoData={setTodoData}/>
        <Form value={value} setValue={setValue} handleSubmit={handleSubmit}/>

      </div>
    </div>
  )
}