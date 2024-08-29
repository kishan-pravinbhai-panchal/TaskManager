import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [showfinished, setshowfinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  const toggleFinished = () => {
   setshowfinished(!showfinished)
  }



  const saveToLs = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }



  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let index = todos.findIndex(item => {
      return item.id == id;
    })
    let newTodos = todos.filter(
      item => {
        return item.id !== id
      }
    );
    setTodos(newTodos)
    saveToLs()

  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(
      item => {
        return item.id !== id
      }
    );
    setTodos(newTodos)
    saveToLs()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo('')
    saveToLs()
  }
  const handlechange = (e) => {
    setTodo(e.target.value)
  }
  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id == id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLs()
  }


  return (
    <>
     <Navbar/>
     <div className=" inset-0 -z-10  w-full   min-h-screen items-center [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#ff7800f2_100%)] "> 
      <div className="container mx-auto rounded-xl bg-transparent h-full w-3/4 p-5 max-sm:w-full">
       <h1 className='text-center text-white text-2xl font-semibold max-sm:text-lg'> &lt;i<span className='text-orange-300'>Task/&gt;: Take Control of</span> Your Daily Goals</h1>
        <div className="addtodo my-5 text-center">
          <h1 className='text-2xl text-white font-bold my-5 '>Add Task</h1>
          <div className='flex justify-center h-full '>
          <input onChange={handlechange} value={todo} type="text" className='w-1/2 rounded-lg text-orange-900 text-lg font-semibold' />
            <button onClick={handleAdd} disabled={todo.length<=3} className='bg-orange-600 py-1 rounded-lg mx-2 font-bold disabled:bg-orange-400 px-1  flex items-center hover:bg-orange-500'><lord-icon
              src="https://cdn.lordicon.com/zrkkrrpl.json"
              trigger="loop"
              stroke="bold"
              colors="primary:#242424,secondary:#ffffff"
            >
            </lord-icon><span className='mx-1'>Save</span></button>
          </div>
        </div>
        <label className='text-lg mx-6 text-orange-600 flex justify-center'>
          <input onChange={toggleFinished} className='accent-orange-600 mr-2' type="checkbox" checked={showfinished} />
          Show Finished
        </label>


        <h1 className='font-bold text-2xl my-4  text-white text-center'>Your Todos</h1>
        <div className='todos my-5 flex items-center flex-col justify-center'>
          {todos.length === 0 && <div className='my-10 text-center text-lg font-semibold text-orange-600'>No Todos to Today</div>}
          {todos.map(item => {


            return (showfinished || !item.isCompleted) && <div key={item.id} className="todo w-1/2 my-2 flex items-center justify-between text-white">
              <input name={item.id} onChange={handleCheckbox} className='text-xl mx-6 accent-orange-600' type="checkbox" checked={item.isCompleted} id='' />
              <div className={item.isCompleted ? "line-through decoration-orange-950" : ""}>{item.todo}
              </div>
              <div className="buttons flex mx-4">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='mx-2'><lord-icon
                  src="https://cdn.lordicon.com/wuvorxbv.json"
                  trigger="loop"
                  stroke="bold"
                  colors="primary:#ffffff,secondary:#ff7800">
                </lord-icon></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='mx-2'>
                  <lord-icon
                    src="https://cdn.lordicon.com/drxwpfop.json"
                    trigger="hover"
                    stroke="bold"
                    state="morph-trash-in"
                    colors="primary:#ffffff,secondary:#ff7800">
                  </lord-icon>
                </button>
              </div>
            </div>
          })}
        </div>

      </div>
      </div>
    
    </>
  )
}

export default App
