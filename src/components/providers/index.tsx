import { PropsWithChildren } from "react";
import { ThemeProvider } from "./theme-provider";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {children}
    </ThemeProvider>
  );
};

export default Providers;
