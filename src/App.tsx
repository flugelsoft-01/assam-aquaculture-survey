import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Simulator } from './pages/Simulator';
import { Analytics } from './pages/Analytics';
import { Proposal } from './pages/Proposal';
import { Tutorial } from './pages/Tutorial';

export function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/sample-frame-ledger" element={<Dashboard />} />
          <Route path="/sampling-simulator" element={<Simulator />} />
          <Route path="/trace-simulator" element={<Simulator />} />
          <Route path="/estimates-audit" element={<Analytics />} />
          <Route path="/compliance-audit" element={<Analytics />} />
          <Route path="/proposal" element={<Proposal />} />
          <Route path="/nesfic-d32-proposal" element={<Proposal />} />
          <Route path="/tutorial" element={<Tutorial />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
