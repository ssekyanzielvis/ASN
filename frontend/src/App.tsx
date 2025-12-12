import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/layout/Layout';
import HomePage from './pages/Home/HomePage';
import ProjectsPage from './pages/Projects/ProjectsPage';
import ProjectDetailPage from './pages/Projects/ProjectDetailPage';
import NewsPage from './pages/News/NewsPage';
import NewsDetailPage from './pages/News/NewsDetailPage';
import CollaboratePage from './pages/Collaborate/CollaboratePage';
import ContactPage from './pages/Contact/ContactPage';
import WorksPage from './pages/Works/WorksPage';
import WorkDetailPage from './pages/Works/WorkDetailPage';
import WorksByCategoryPage from './pages/Works/WorksByCategoryPage';
import TeamPage from './pages/Team/TeamPage';
import TeamMemberDetailPage from './pages/Team/TeamMemberDetailPage';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="works" element={<WorksPage />} />
            <Route path="works/:slug" element={<WorkDetailPage />} />
            <Route path="works/category/:category" element={<WorksByCategoryPage />} />
            <Route path="team" element={<TeamPage />} />
            <Route path="team/:id" element={<TeamMemberDetailPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="projects/:slug" element={<ProjectDetailPage />} />
            <Route path="news" element={<NewsPage />} />
            <Route path="news/:slug" element={<NewsDetailPage />} />
            <Route path="collaborate" element={<CollaboratePage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
