import AddTaskForm from './components/AddTaskForm';
import UpdateForm from './components/UpdateForm';
import ToDo from './components/ToDo';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState } from 'react';

function App() {

const [toDO, setToDo] = useState([
  {"id": 1, "title": "Work on my Project", "status": false},
  {"id": 2, "title": "Pick the Kids", "status": false},
  {"id": 3, "title": "Make Dinner and Family time", "status": false}
]);

const [newTask, setNewTask] = useState('');
const [updateData, setUpdateData] = useState(''); 

const addTask = () => {
  if (newTask) {
    let num = toDO.length + 1;
    let newEntry = { id: num, title: newTask, status: false }
    setToDo([...toDO, newEntry])
    setNewTask('');
  }
};

const deleteTask = (id) => {
  let newTasks = toDO.filter( task => task.id !== id)
  setToDo(newTasks);
};

const markDone = (id) => {
  let newTask = toDO.map( task => {
    if ( task.id === id ) {
      return ({ ...task, status: !task.status})
  }
  return task;
})
  setToDo(newTask);
};

const cancelUpdate = () => {
setUpdateData('');
};

const changeTask = (e) => {
let newEntry = {
  id: updateData.id, title: e.target.value, status: updateData.status ? true : false
}
setUpdateData(newEntry);
};

const updateTask = () => {
  let filterRecords = [...toDO].filter( task => task.id !== updateData.id );
  let updatedObject = [...filterRecords, updateData]
  setToDo(updatedObject);
  setUpdateData('');
};

  return (
    <div className="App">
      <br />
      <h2>Titilayo To-Do List Using React</h2>
      <br />

      {/* update task */}
      {updateData  && updateData ? (
        <UpdateForm 
        updateData={updateData}
        changeTask={changeTask}
        updateTask={updateTask} 
        cancelUpdate={cancelUpdate}
        />
      ) : (
        <AddTaskForm 
        newTask={newTask}
        setNewTask={setNewTask}
        addTask={addTask}
        />
       )}

      {toDO && toDO.length ? '' : 'No Tasks....'}

      <ToDo
      toDO={toDO} 
      markDone={markDone}
      setUpdateData={setUpdateData}
      deleteTask={deleteTask}
      />
    </div>
  );
}

export default App;
