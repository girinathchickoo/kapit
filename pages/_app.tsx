import "../styles/globals.css";
import type { AppProps } from "next/app";
import * as Api from "api";
import * as Layouts from "layouts";
import * as Themes from "themes";
import * as Context from "context";

function MyApp({ Component, pageProps }: ComponentWithLayout) {
  const Layout = Component.Layout || EmptyLayout;
  return (
    <Api.Server.Main>
      <Themes.Main>
        <Layouts.Mainlayouts.Main>
          <Context.UserProfile.Main>
            <Context.SnackBar.Main>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </Context.SnackBar.Main>
          </Context.UserProfile.Main>
        </Layouts.Mainlayouts.Main>
      </Themes.Main>
    </Api.Server.Main>
  );
}

const EmptyLayout = ({ children }: EmptyLayouts) => {
  return <>{children}</>;
};

type ComponentWithLayout = AppProps & {
  Component: AppProps["Component"] & {
    Layout?: React.ComponentType;
  };
};

interface EmptyLayouts {
  children: React.ReactNode;
}

export default MyApp;
