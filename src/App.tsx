import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });
  
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
