import "./App.scss"
import Login from "./pages/Login/Login.tsx";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Modules from "./pages/Modules/Modules.tsx";
import Module from "./pages/Modules/[id]/Module.tsx";
import Lesson from "./pages/Modules/[id]/Lessons/[id]/Lesson.tsx";
import AddLesson from "./pages/Modules/[id]/Lessons/[id]/Add/AddLesson.tsx";

function App() {
  return (
        <Router>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/modules" element={<Modules/>} />
                <Route path="/modules/:id" element={<Module/>} />
                <Route path="/modules/:id/lesson/:lessonId" element={<Lesson/>} />
                <Route path="/modules/:id/lesson/:lessonId/add" element={<AddLesson/>} />
            </Routes>
        </Router>
  )
}

export default App
