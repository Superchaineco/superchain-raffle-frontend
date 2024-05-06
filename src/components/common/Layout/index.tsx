'use client';
import { ReactNode, useState, type ReactElement } from 'react';
import classnames from 'classnames';

// import Header from '@/components/common/Header';
import css from './styles.module.css';
import Footer from '../Footer';
import Header from '../Header';
// import SafeLoadingError from '../SafeLoadingError';
// import Footer from '../Footer';
// import SideDrawer from './SideDrawer';
// import { useIsSidebarRoute } from '@/hooks/useIsSidebarRoute';
// import { TxModalContext } from '@/components/tx-flow';
// import BatchSidebar from '@/components/batch/BatchSidebar';
// import SocialLoginDeprecation from '@/components/common/SocialLoginDeprecation';

const PageLayout = ({ children }: { children: ReactNode }): ReactNode => {
  //   const [isSidebarRoute, isAnimated] = useIsSidebarRoute(pathname);
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [isBatchOpen, setBatchOpen] = useState<boolean>(false);
  //   const { setFullWidth } = useContext(TxModalContext);

  //   useEffect(() => {
  //     setFullWidth(!isSidebarOpen);
  //   }, [isSidebarOpen, setFullWidth]);

  return (
    <>
      <header className={css.header}>
        <Header onMenuToggle={undefined} onBatchToggle={setBatchOpen} />
      </header>
      {/* {isSidebarRoute && (
        <SideDrawer isOpen={isSidebarOpen} onToggle={setSidebarOpen} />
      )} */}

      <div
        className={classnames(css.main, {
          [css.mainNoSidebar]: true,
          [css.mainAnimated]: true,
        })}
      >
        <div className={css.content}>
          {/* <SocialLoginDeprecation /> */}

          {children}
        </div>

        {/* <BatchSidebar isOpen={isBatchOpen} onToggle={setBatchOpen} /> */}

        <Footer />
      </div>
    </>
  );
};

export default PageLayout;
