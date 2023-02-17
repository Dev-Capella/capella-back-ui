import { NavLink } from 'react-router-dom'
import { classNames } from 'primereact/utils'
import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
} from 'react'
import { LayoutContext } from '../../Components/LayoutContext'
import { Button } from 'primereact/button'
import { useSelector, useDispatch } from 'react-redux'
import loadingReducer from '../../Manager/Reducers/loadingReducer'
const AppTopbar = forwardRef((props, ref) => {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.loading.isActive)
  const {
    layoutConfig,
    layoutState,
    onMenuToggle,
    showProfileSidebar,
    setLayoutConfig,
  } = useContext(LayoutContext)
  const menubuttonRef = useRef(null)
  const topbarmenuRef = useRef(null)
  const topbarmenubuttonRef = useRef(null)

  useImperativeHandle(ref, () => ({
    menubutton: menubuttonRef.current,
    topbarmenu: topbarmenuRef.current,
    topbarmenubutton: topbarmenubuttonRef.current,
  }))

  return (
    <div style={{ zIndex: '1004' }}>
      <div className="layout-topbar">
        <NavLink to="/" className="layout-topbar-logo">
          <img
            src={require('../../Assets/img/logo.png')}
            width="160.22px"
            height={'110px'}
            widt={'true'}
          />
        </NavLink>

        <button
          ref={menubuttonRef}
          onClick={onMenuToggle}
          style={{ border: 0, backgroundColor: 'white' }}
          type="button"
          className="p-link layout-topbar-button"
        >
          <i className="pi pi-bars" />
        </button>

        <button
          ref={topbarmenubuttonRef}
          style={{ border: 0, backgroundColor: 'white' }}
          type="button"
          className="p-link layout-topbar-menu-button layout-topbar-button"
          onClick={showProfileSidebar}
        >
          <i className="pi pi-ellipsis-v" />
        </button>

        <div
          ref={topbarmenuRef}
          className={classNames('layout-topbar-menu', {
            'layout-topbar-menu-mobile-active':
              layoutState.profileSidebarVisible,
          })}
        >
          <button
            type="button"
            style={{ border: 0, backgroundColor: 'white' }}
            className="p-link layout-topbar-button"
          >
            <i className="pi pi-calendar"></i>
            <span>Calendar</span>
          </button>
          <button
            type="button"
            style={{ border: 0, backgroundColor: 'white' }}
            className="p-link layout-topbar-button"
          >
            <i className="pi pi-user"></i>
            <span>Profile</span>
          </button>
          <NavLink>
            <button
              type="button"
              style={{ border: 0, backgroundColor: 'white' }}
              className="p-link layout-topbar-button"
            >
              <i className="pi pi-cog"></i>
              <span>Settings</span>
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  )
})

export default AppTopbar
