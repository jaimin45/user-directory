import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { UserProvider } from './Context/User/UserContext';
import UserDetailView from './Components/UserDetailView';
import UserList from '../src/Components/UserListView';

const App = () => {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/user/:id" element={<UserDetailView />} />
        </Routes>
        </UserProvider>
    </Router>
  );
};

export default App;

