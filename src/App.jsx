import './App.css';
import { useEffect, useState } from 'react';


function Todolist() {

  const [todos, setTodos] = useState([]);
  const [valueTodo,setValuetodo] = useState('')


  const addTask= () =>{
    setValuetodo(valueTodo)
    setTodos([...todos, {text:valueTodo,completed:false}])
    setValuetodo("")
    
  }
  const removeTask= (index) =>{
    const array = [...todos]
    array.splice(index,1);
    setTodos(array)
  }

  const togglecomplited= (index) =>{
    let array = todos.map((todo,i)=>{
      if(i === index){
        return {...todo,completed:!todo.completed}
      }else{return todo }
    })
    setTodos(array)
  }


 
  

  return(
    <div>
      <input type="text" value={valueTodo} onChange={(e) => setValuetodo(e.target.value)}/>
      <button onClick={addTask}>Добавить</button>
      <div >
        <ol style={{display:'flex',flexDirection:'column',alignItems:"center",justifyContent:'center',gap:'30px'}} >
          {todos.map((todo, i) => (
            <li key={i} className={todo.completed ? 'textzacherk' : ''}>
              <input type="checkbox" name="" id="" checked={todo.completed} onChange={(e) => togglecomplited(i)}/>
              {todo.text}
              <button onClick={()=> removeTask(i) }>Удалить</button>
            </li>
          ))}
      </ol>
</div>
    </div>
  )
}
function App() {
  return(
    <div className='App'>
      <Todolist/>
    </div>
  )
}

export default App;