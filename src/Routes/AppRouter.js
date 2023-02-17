import { Routes, Route, Outlet } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import { React } from 'react'
import Dashboard from '../Pages/Dashboard/Dashboard'
import NewCategory from '../Pages/Category/NewCategory'
import Category from '../Pages/Category/CategoryList'
import UserManagement from '../Pages/User/UserManagement'
import Login from '../Pages/Login/Login'
import ProductList from '../Pages/Product/ProductList'
import NewProduct from '../Pages/Product/NewProduct'
import UnitList from '../Pages/Unit/UnitList'
import ClassificationList from "../Pages/Classification/ClassificationList";
import NewClassification from "../Pages/Classification/NewClassification";
import UserUpdate from "../Pages/User/UserUpdate";
import BrandList from "../Pages/Brand/BrandList";
import DetailBrand from "../Pages/Brand/DetailBrand";
import DetailUnit from "../Pages/Unit/DetailUnit";
import RolesList from "../Pages/Role/RolesList";
import DetailRoles from "../Pages/Role/DetailRoles";
import VariantList from "../Pages/Variant/VariantList";
import SupplierList from "../Pages/Supplier/SupplierList";
import DetailSupplier from "../Pages/Supplier/DetailSupplier";
import AddSupplier from "../Pages/Supplier/AddSupplier";
import TagList from "../Pages/Tag/TagList";
import NewBrand from "../Pages/Brand/NewBrand";
import ProductDetail from '../Pages/Product/ProductDetail/ProductDetail'
import BannerList from "../Pages/Banner/BannerList";
import NewBanner from "../Pages/Banner/NewBanner";

const AppRoutes = ({ isAuthenticated }) => (
  <Routes>
    <Route path="" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
      <Route path="dashboard" element={<Dashboard />} />

      <Route path="users" element={<Outlet />}>
        <Route index element={<UserManagement />} />
        <Route path=":username" index element={<UserUpdate />} />
      </Route>
      <Route path="roles" element={<Outlet />}>
        <Route index element={<RolesList />} />
        <Route path=":roleId" index element={<DetailRoles />} />
      </Route>
      <Route path="categories" element={<Outlet />}>
        <Route index element={<Category />} />
        <Route path="new" element={<NewCategory />} />
      </Route>

      <Route path="products" element={<Outlet />}>
        <Route index element={<ProductList />} />
        <Route path=":code" index element={<ProductDetail />} />
        <Route path="new" element={<NewProduct />} />
      </Route>

      <Route path="tags" element={<Outlet />}>
        <Route index element={<TagList />} />
      </Route>

      <Route path="variants" element={<Outlet />}>
        <Route index element={<VariantList />} />
      </Route>

      <Route path="Supplier" element={<Outlet />}>
        <Route index element={<SupplierList />} />
        <Route path=":supplierId" index element={<DetailSupplier />} />
        <Route path="new" element={<AddSupplier />} />
      </Route>
      <Route path="Banners" element={<Outlet />}>
        <Route index element={<BannerList />} />
        {/* <Route path=":supplierId" index element={<DetailSupplier />} /> */}
        <Route path="new" element={<NewBanner />} />
      </Route>

      <Route path="units" element={<Outlet />}>
        <Route index element={<UnitList />} />
        <Route path=":code" element={<DetailUnit />} />
      </Route>

      <Route path="classifications" element={<Outlet />}>
        <Route index element={<ClassificationList />} />
        <Route path="new" element={<NewClassification />} />
      </Route>
      <Route path="brands" element={<Outlet />}>
        <Route index element={<BrandList />} />
        <Route path="new" element={<NewBrand />} />
        <Route path=":code" index element={<DetailBrand />} />
      </Route>
    </Route>

    <Route path="" element={<PublicRoute isAuthenticated={isAuthenticated} />}>
      <Route path="login" element={<Login />} />
    </Route>
  </Routes>
);

export default AppRoutes
