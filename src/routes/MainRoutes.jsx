import { Routes, Route } from 'react-router-dom';
import { Layouts } from '../layouts';
import  { Views } from '../views';

export function MainRoutes() {
    return (
        <Layouts.MainLayout>
            <Routes>
                <Route path='' element={<Views.DashboardView />}/>
                <Route path='orders' element={<Views.OrderListView />}/>
                <Route path='orders/:id/edit' element={<Views.OrderEditView />}/>
                <Route path='users' element={<Views.UserListView />}/>
                <Route path='users/create' element={<Views.UserCreateView />}/>
                <Route path='users/:id/edit' element={<Views.UserEditView />}/>
                <Route path='products' element={<Views.ProductListView />}/>
                <Route path='products/create' element={<Views.ProductCreateView />}/>
                <Route path='products/:id/edit' element={<Views.ProductEditView />}/>
                <Route path='categories' element={<Views.CategoryListView />}/>
                <Route path='categories/create' element={<Views.CategoryCreateView />}/>
                <Route path='categories/:id/edit' element={<Views.CategoryEditView />}/>
                <Route path='countries' element={<Views.CountryListView />}/>
                <Route path='countries/create' element={<Views.CountryCreateView />}/>
                <Route path='countries/:id/edit' element={<Views.CountryEditView />}/>
                <Route path='admins' element={<Views.AdminListView />}/>
                <Route path='admins/create' element={<Views.AdminCreateView />}/>
                <Route path='admins/:id/edit' element={<Views.AdminEditView />}/>
                <Route path='subscription-plans' element={<Views.SubscriptionPlanListView />}/>
                <Route path='subscription-plans/create' element={<Views.SubscriptionPlanCreateView />}/>
                <Route path='subscription-plans/:id/edit' element={<Views.SubscriptionPlanEditView />}/>
            </Routes>
        </Layouts.MainLayout>
    )
}