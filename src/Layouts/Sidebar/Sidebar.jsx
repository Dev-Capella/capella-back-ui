import { useEffect } from 'react'
import { MenuProvider } from '../../Components/MenuProvider'
import { NavLink, useLocation } from 'react-router-dom'
import { AppMenuitem } from '../../Components/AppMenuitem'

function Sidebar(props) {
  const model = [
    {
      label: "Dashboard",
      items: [{ label: "Dashboard", icon: "pi pi-fw pi-home", to: "/" }],
    },
    {
      label: "Kullanıcı Yönetimi",
      items: [
        {
          label: "Kullanıcı Listesi",
          icon: "pi pi-fw pi-check-square",
          to: "/users",
          badge: "Kullanıcı",
        },
        {
          label: "Roller",
          icon: "pi pi-fw pi-check-square",
          to: "/roles",
          badge: "Roller",
        },
        {
          label: "Tedarikçi",
          icon: "pi pi-fw pi-check-square",
          to: "/Supplier",
          badge: "Tedarikçi",
        },
      ],
    },
    {
      label: "Kategori Yönetimi",
      items: [
        {
          label: "Kategori Listesi",
          icon: "pi pi-fw pi-eye",
          to: "/categories",
          badge: "Kategori",
        },
      ],
    },
    {
      label: "Ürün Yönetimi",
      items: [
        {
          label: "Ürün Listesi",
          icon: "pi pi-fw pi-eye",
          to: "/products",
          badge: "Ürün",
        },
        {
          label: "Varyantlar",
          icon: "pi pi-fw pi-eye",
          to: "/variants",
          badge: "Varyant",
        },
        {
          label: "Etiketler",
          icon: "pi pi-fw pi-eye",
          to: "/tags",
          badge: "Etiket",
        },
      ],
    },
    {
      label: "Sınıflandırma Verileri",
      items: [
        {
          label: "Sınıflandırma Verileri",
          icon: "pi pi-fw pi-eye",
          to: "/classifications",
          badge: "Sınıflandırma Verileri",
        },
        {
          label: "Birimler",
          icon: "pi pi-fw pi-eye",
          to: "/units",
          badge: "Birim",
        },
      ],
    },
    {
      label: "Katalog",
      items: [
        {
          label: "Markalar",
          icon: "pi pi-fw pi-eye",
          to: "/brands",
          badge: "Marka",
        },
      ],
    },
    {
      label: "Banner",
      items: [
        {
          label: "Banner",
          icon: "pi pi-fw pi-eye",
          to: "/banners",
          badge: "Banner",
        },
      ],
    },
  ];

  return (
    <MenuProvider>
      <ul className="layout-menu">
        {model.map((item, i) => {
          return !item.seperator ? (
            <AppMenuitem item={item} root={true} index={i} key={item.label} />
          ) : (
            <li className="menu-separator"></li>
          )
        })}
      </ul>
    </MenuProvider>
  )
}

export default Sidebar
