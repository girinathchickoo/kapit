import { app } from "firebase-config";
import * as FirebaseAuth from "firebase/auth";
import * as React from "react";
import * as NextRouter from "next/router";

export const useUserId = () => {
  const routers = NextRouter.useRouter();
  const [users, setUsers] = React.useState<any>(undefined);
  const auth = FirebaseAuth.getAuth(app);

  const authStateChanged = async (user: any) => {
    if (user) {
      setUsers(user);
      const time = new Date(user?.stsTokenManager?.expirationTime).getTime();
      if (time === new Date().getTime()) {
        await FirebaseAuth.signOut(auth);
        localStorage.removeItem("Mktoken");
        localStorage.removeItem("uid");
        routers.push("/accounts/login");
      }
      user.getIdToken(true).then((token: string) => {
        localStorage.setItem("Mktoken", token);
      });
      localStorage.setItem("uid", user?.uid);
    } else {
      setUsers(null);
    }
  };

  React.useEffect(() => {
    const unsubscribe = FirebaseAuth.onAuthStateChanged(auth, authStateChanged);
    return () => unsubscribe();
  }, []);

  return users;
};
