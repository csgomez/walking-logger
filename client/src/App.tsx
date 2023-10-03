import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import WalkingForm from './pages/WalkingForm';
import History from './pages/History';
import Graph from './pages/Graph';
import Options from './pages/Options';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<WalkingForm />} />
        <Route path="/history" element={<History />} />
        <Route path="/graph" element={<Graph />} />
        <Route path="/options" element={<Options />} />
      </Route>
    </Routes>
  );
}

export default App;
