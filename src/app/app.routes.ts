import { Routes } from '@angular/router';
import { UserLayoutComponent } from './Layouts/user-layout/user-layout.component';
import { CustomerLayoutComponent } from './Layouts/customer-layout/customer-layout.component';
import { AdimLoginComponent } from './Components/admin/adim-login/adim-login.component';
import { adminAuthGuard } from './guards/admin-auth.guard';
import { AdminComponent } from './Layouts/admin-layout/admin.component';
import { customerAuthGuard } from './guards/customer-auth.guard';
import { FarmerLoginComponent } from './Components/user/farmer-login/farmer-login.component';
import { FarmerComponent } from './Layouts/farmer/farmer.component';

export const routes: Routes = [
    {

        path :"",
        component:UserLayoutComponent,
        children:[
            {path:"",loadComponent:()=>import('./Components/user/home/home.component').then(a=>a.HomeComponent)},
            {path:"enquiry",loadComponent:()=>import('./Components/user/enquiry/enquiry.component').then(b=>b.EnquiryComponent)},
            {path:"signUp",loadComponent:()=>import('./Components/user/customer/customer.component').then(c=>c.CustomerComponent)},
            {path:"login",loadComponent:()=>import('./Components/user/login/login.component').then(d=>d.LoginComponent)},
            {path:"farmer-login",loadComponent:()=>import('./Components/user/farmer-login/farmer-login.component').then(a=>a.FarmerLoginComponent)},
            {path :"farmer-register",loadComponent:()=>import('./Components/user/farmer-regsitration/farmer-regsitration.component').then(c=>c.FarmerRegsitrationComponent)},
            {path :"products",loadComponent:()=>import('./Components/user/product-list/product-list.component').then(m=>m.ProductListComponent)}


        ]
    },
    {
        path :"customer",
        component:CustomerLayoutComponent,
        canActivate:[customerAuthGuard],
        children:[
            {path:"home",loadComponent:()=>import('./Components/customer/home/home.component').then(c=>c.HomeComponent)},
             {path:'feedback',loadComponent:()=>import('./Components/customer/feedback/feedback.component').then(a=>a.FeedbackComponent)}
            
            ]
    },
        {
      path:'admin/login',
      component:AdimLoginComponent
    },
    {
      path:'admin',
       component:AdminComponent,
      canActivate:[adminAuthGuard],
      children:[
        {path:'dashboard',loadComponent:()=>import('./Components/admin/dashboard/dashboard.component').then(m=>m.DashboardComponent)},
        {path:'categories',loadComponent:()=>import('./Components/admin/category/category.component').then(m=>m.CategoryComponent)}
      ]
    },

    {path: 'farmer/login',
    component:FarmerLoginComponent

    },
    {
        path:'farmer',
        component:FarmerComponent,
        children:[
        {path:'f-dashboard',loadComponent:()=>import('./Components/farmer/f-dashboard/f-dashboard.component').then(m=>m.FDashboardComponent)},
        {path:'manage-product',loadComponent:()=>import('./Components/farmer/manage-product/manage-product.component').then(m=>m.ManageProductComponent)}
        ]

    }

];
