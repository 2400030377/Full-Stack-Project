import { createBrowserRouter } from 'react-router';
import { MainLayout } from './components/main-layout';
import { HomePage } from './components/home-page';
import { ReadPage } from './components/read-page';
import { ExplorePage } from './components/explore-page';
import { HistoryPage } from './components/history-page';
import { PreamblePage } from './components/preamble-page';
import { NotFoundPage } from './components/not-found-page';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      { index: true, Component: HomePage },
      { path: 'read', Component: ReadPage },
      { path: 'explore', Component: ExplorePage },
      { path: 'history', Component: HistoryPage },
      { path: 'preamble', Component: PreamblePage },
      { path: '*', Component: NotFoundPage },
    ],
  },
]);
