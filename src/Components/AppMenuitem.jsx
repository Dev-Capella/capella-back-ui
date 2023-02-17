import { useRoutes, useNavigate, useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Ripple } from 'primereact/ripple';
import { classNames } from 'primereact/utils';
import React, { useEffect, useContext } from 'react';
import { CSSTransition } from 'react-transition-group';
import { MenuContext } from './MenuProvider';

export const AppMenuitem = (props) => {
    const { activeMenu, setActiveMenu } = useContext(MenuContext);
    const location = useLocation();
    const pathName = location.pathname;
    const item = props.item;
    const key = props.parentKey ? props.parentKey + '-' + props.index : String(props.index);
    const isActiveRoute = item.to && location.pathname === item.to;
    const active = activeMenu === key || activeMenu.startsWith(key + '-');
    
    useEffect(()=>{
     
               if (item.to && pathName === item.to) {
               
                    setActiveMenu(key);
                }
               
    },[])
    
    // }, []);

    const itemClick = (event) => {
        //avoid processing disabled items
        if (item.disabled) {
            event.preventDefault();
            return;
        }

        //execute command
        if (item.command) {
            item.command({ originalEvent: event, item: item });
        }
        
        // toggle active state
        if (item.items)
            setActiveMenu(active ? props.parentKey : key);
        else
            setActiveMenu(key);
    };

    

    const subMenu = item.items && item.visible !== false && (
        <CSSTransition timeout={{ enter: 1000, exit: 450 }} classNames="layout-submenu" in={props.root ? true : active} key={item.label}>
            <ul>
                {item.items.map((child, i) => {
                    return <AppMenuitem item={child} index={i} className={child.badgeClass} parentKey={key} key={child.label} />;
                })}
            </ul>
        </CSSTransition>
    );

    return (
        <li className={classNames({ 'layout-root-menuitem': props.root, })}>
        {props.root && item.visible !== false && <div className="layout-menuitem-root-text">{item.label}</div>}
        {(!item.to || item.items) && item.visible !== false ? (
            <a href={item.url} onClick={(e) => itemClick(e)} className={classNames(item.class, 'p-ripple')} target={item.target} tabIndex="0">
                <i className={classNames('layout-menuitem-icon', item.icon)}></i>
                <span className="layout-menuitem-text">{item.label}</span>
                {item.items && <i className="pi pi-fw pi-angle-down layout-submenu-toggler"></i>}
                <Ripple />
            </a>
        ) : null}

        {item.to && !item.items && item.visible !== false ? (
            <NavLink to={item.to} onClick={(e) => itemClick(e)} 
            className={classNames(item.class, 'p-ripple', { 'active-route': isActiveRoute })} 
            target={item.target} tabIndex="0" replace={item.replaceUrl}
            >
               
                    <i className={classNames('layout-menuitem-icon', item.icon)}></i>
                    <span className="layout-menuitem-text">{item.label}</span>
                    {item.items && <i className="pi pi-fw pi-angle-down layout-submenu-toggler"></i>}
                    <Ripple />
            </NavLink>
        ) : null}

        {subMenu}
    </li>
    );
};


