import * as React from "react";

export const UserProfileContext = React.createContext<profileContext>({
  count: true,
  update: () => {},
});

export const Main = ({ children }: { children: React.ReactNode }) => {
  const [count, setCount] = React.useState(true);

  const update = () => {
    console.log("update b4", count);
    setCount(!count);
    console.log("update aft", count);
  };

  return (
    <UserProfileContext.Provider value={{ count, update }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export interface profileContext {
  count: boolean;
  update: () => void;
}
