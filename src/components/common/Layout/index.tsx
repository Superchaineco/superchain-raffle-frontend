import type { ReactNode } from "react";
import css from "./styles.module.css";
import Footer from "../Footer";

const PageLayout = ({ children }: { children: ReactNode }): ReactNode => {
  return (
    <>
      <main className={css.main}>
        {children}

        <Footer />
      </main>
    </>
  );
};

export default PageLayout;
