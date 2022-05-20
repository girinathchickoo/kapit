import * as Axios from "axios";
import * as ReactQuery from "react-query";
import * as React from "react";
import * as Hooks from 'hooks';

export const Main = ({ children }: MainServer) => {
  const user = Hooks.useUserId()
  user?.getIdToken(true).then((token: string) => {
    localStorage.setItem('Mktoken', token);
  });
  const queryClient = new ReactQuery.QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } });
  return (
    <ReactQuery.QueryClientProvider client={queryClient}>
      {children}
    </ReactQuery.QueryClientProvider>
  );
};

export const Client = () => {
  return Axios.default.create({
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('Mktoken') as string,
    },
    baseURL: process.env.NEXT_PUBLIC_BASE_URL
  })
}

interface MainServer {
  children: React.ReactNode;
}
