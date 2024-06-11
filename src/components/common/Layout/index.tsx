import { ReactNode } from "react";
import css from "./styles.module.css";
import Footer from "../Footer";
import Header from "../Header";

const PageLayout = ({ children }: { children: ReactNode }): ReactNode => {
  return (
    <>
      <header className={css.header}>
        <Header onMenuToggle={undefined} onBatchToggle={undefined} />
      </header>

      <main className={css.main}>
        {children}

        <Footer />
      </main>
    </>
  );
};

export default PageLayout;
