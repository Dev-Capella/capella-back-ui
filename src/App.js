import React, { useEffect, useContext, useRef } from 'react'
import { useEventListener, useUnmountEffect } from 'primereact/hooks'
import AppRouter from './Routes/AppRouter'
import Sidebar from './Layouts/Sidebar/Sidebar'
import AppTopbar from './Layouts/Header/Header'
import { useLocation } from 'react-router-dom'
import AppFooter from './Layouts/Footer/Footer'
import { classNames, DomHandler } from 'primereact/utils'
import { LayoutContext } from './Components/LayoutContext'
import loadingReducer from './Manager/Reducers/loadingReducer'
import { useSelector, useDispatch } from 'react-redux'

//styles
import './App.css'
import './styles/layout/layout.scss'
import Loading from './Components/Loading/Loading'
export const loadingActions = loadingReducer.actions
function Index() {
  const { layoutConfig, layoutState, setLayoutState } =
    useContext(LayoutContext);

  const location = useLocation();
  const topbarRef = useRef(null);
  const sidebarRef = useRef(null);

  const [bindMenuOutsideClickListener, unbindMenuOutsideClickListener] =
    useEventListener({
      type: "click",
      listener: (event) => {
        const isOutsideClicked = !(
          sidebarRef.current.isSameNode(event.target) ||
          sidebarRef.current.contains(event.target) ||
          topbarRef.current.menubutton.isSameNode(event.target) ||
          topbarRef.current.menubutton.contains(event.target)
        );

        if (isOutsideClicked) {
          hideMenu();
        }
      },
    });

  const [
    bindProfileMenuOutsideClickListener,
    unbindProfileMenuOutsideClickListener,
  ] = useEventListener({
    type: "click",
    listener: (event) => {
      const isOutsideClicked = !(
        topbarRef.current.topbarmenu.isSameNode(event.target) ||
        topbarRef.current.topbarmenu.contains(event.target) ||
        topbarRef.current.topbarmenubutton.isSameNode(event.target) ||
        topbarRef.current.topbarmenubutton.contains(event.target)
      );

      if (isOutsideClicked) {
        hideProfileMenu();
      }
    },
  });

  const hideMenu = () => {
    setLayoutState((prevLayoutState) => ({
      ...prevLayoutState,
      overlayMenuActive: false,
      staticMenuMobileActive: false,
      menuHoverActive: false,
    }));
    unbindMenuOutsideClickListener();
    unblockBodyScroll();
  };

  const hideProfileMenu = () => {
    setLayoutState((prevLayoutState) => ({
      ...prevLayoutState,
      profileSidebarVisible: false,
    }));
    unbindProfileMenuOutsideClickListener();
  };

  const blockBodyScroll = () => {
    DomHandler.addClass("blocked-scroll");
  };

  const unblockBodyScroll = () => {
    DomHandler.removeClass("blocked-scroll");
  };

  useEffect(() => {
    if (layoutState.overlayMenuActive || layoutState.staticMenuMobileActive) {
      bindMenuOutsideClickListener();
    }

    layoutState.staticMenuMobileActive && blockBodyScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layoutState.overlayMenuActive, layoutState.staticMenuMobileActive]);

  useEffect(() => {
    if (layoutState.profileSidebarVisible) {
      bindProfileMenuOutsideClickListener();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layoutState.profileSidebarVisible]);
  const dispatch = useDispatch();
  useEffect(() => {
    hideMenu();
    hideProfileMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useUnmountEffect(() => {
    unbindMenuOutsideClickListener();
    unbindProfileMenuOutsideClickListener();
  });

  const containerClass = classNames("layout-wrapper", {
    "layout-theme-light": layoutConfig.colorScheme === "light",
    "layout-theme-dark": layoutConfig.colorScheme === "dark",
    "layout-overlay": layoutConfig.menuMode === "overlay",
    "layout-static": layoutConfig.menuMode === "static",
    "layout-static-inactive":
      layoutState.staticMenuDesktopInactive &&
      layoutConfig.menuMode === "static",
    "layout-overlay-active": layoutState.overlayMenuActive,
    "layout-mobile-active": layoutState.staticMenuMobileActive,
    "p-input-filled": layoutConfig.inputStyle === "filled",
    "p-ripple-disabled": !layoutConfig.ripple,
  });

  const loading = useSelector((state) => state.loading.isActive);

  return (
    <>
      <div className={containerClass}>
        {loading ? <Loading /> : <></>}
        <AppTopbar ref={topbarRef} />
        <div ref={sidebarRef} className="layout-sidebar">
          <Sidebar />
        </div>
        <div className={loading ? "hidden" : "layout-main-container"}>
          <div className="layout-main">
            <AppRouter isAuthenticated={true} />
          </div>
          <AppFooter />
        </div>
        <div className="layout-mask"></div>
      </div>
    </>
  );
}
export default Index
