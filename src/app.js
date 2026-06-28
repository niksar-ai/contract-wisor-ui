import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import * as AppUrlConstant from './constants/app_url';

import AppLayout from './components/layout/app_layout';
import LoginPage from './pages/auth/login_page';
import RegisterPage from './pages/auth/register_page';
import DashboardPage from './pages/dashboard_page';
import UploadPage from './pages/upload_page';
import AnalysesPage from './pages/analyses_page';
import WorkflowPage from './pages/workflow_page';
import ContractTypePage from './pages/contract_type_page';
import ContractListPage from './pages/contract/contract_list_page';
import ContractTreePage from './pages/contract/contract_tree_page';
import ContractDetailPage from './pages/contract/contract_detail_page';
import ContractTablePage from './pages/contract/contract_table_page';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');
  return (
    <Router>
      {isAuthenticated ? (
        <Routes>
          <Route path={AppUrlConstant.HOME_PAGE_URL} element={<AppLayout><DashboardPage /></AppLayout>} />
          <Route path={AppUrlConstant.UPLOAD_PAGE_URL} element={<AppLayout><UploadPage /></AppLayout>} />
          <Route path={AppUrlConstant.ANALYSES_PAGE_URL} element={<AppLayout><AnalysesPage /></AppLayout>} />
          <Route path={AppUrlConstant.WORKFLOW_PAGE_URL} element={<AppLayout><WorkflowPage /></AppLayout>} />
          <Route path={AppUrlConstant.CONTRACT_TYPE_PAGE_URL} element={<AppLayout><ContractTypePage /></AppLayout>} />
          <Route path={AppUrlConstant.CONTRACT_PAGE_URL} element={<AppLayout><ContractDetailPage /></AppLayout>} />
          <Route path={AppUrlConstant.CONTRACT_LIST_PAGE_URL} element={<AppLayout><ContractListPage /></AppLayout>} />
          <Route path={AppUrlConstant.CONTRACT_TREE_PAGE_URL} element={<AppLayout><ContractTreePage /></AppLayout>} />
          <Route path={AppUrlConstant.CONTRACT_TABLE_PAGE_URL} element={<AppLayout><ContractTablePage /></AppLayout>} />
          <Route path="*" element={<Navigate to={AppUrlConstant.HOME_PAGE_URL} />} />
        </Routes>
      ) : (
        <Routes>
          <Route path={AppUrlConstant.LOGIN_PAGE_URL} element={<LoginPage />} />
          <Route path={AppUrlConstant.REGISTER_PAGE_URL} element={<RegisterPage />} />
          <Route path="*" element={<Navigate to={AppUrlConstant.LOGIN_PAGE_URL} />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
