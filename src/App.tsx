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
          <Route path="/assam-pond-tank-sample-survey-ledger" element={<Dashboard />} />
          <Route path="/survey-simulator" element={<Simulator />} />
          <Route path="/stratified-sampling-confidence-interval-simulator" element={<Simulator />} />
          <Route path="/district-estimates" element={<Analytics />} />
          <Route path="/assam-aquaculture-production-estimates-audit" element={<Analytics />} />
          <Route path="/proposal" element={<Proposal />} />
          <Route path="/nesfic-d32-aquaculture-survey-proposal" element={<Proposal />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/matsyasample-assam-tutorial" element={<Tutorial />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
