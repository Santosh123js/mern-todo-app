
import heroImg from './assets/hero.png'
import './styles/App.css'
import Navbar from './component/Navbar'
import { Route, Routes } from 'react-router-dom'
import AddTask from './component/AddTask'
import List from './component/TaskList'
import UpdateTask from './component/UpdateTask'
import SignUp from './component/SignUp'
import Login from './component/Login'
import Protected from './component/Protected'


function App() {
 

  return (
    <>
      <Navbar/>
    <Routes>
        <Route path='/' element={<Protected><List /></Protected>} />
        <Route path='/add' element={<Protected><AddTask /></Protected>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/update/:id" element={<UpdateTask />} />
        
      </Routes>
      </>
  )
}

export default App; 
