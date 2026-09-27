import ReactDOM from "react-dom/client";
import "./index.css";
import router from './components/router'
import { RouterProvider } from 'react-router-dom';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { App } from "./App";
const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById("root")!).render(

      <QueryClientProvider client={queryClient}>
       <App/>
    <RouterProvider router={router} />
      </QueryClientProvider>

);

