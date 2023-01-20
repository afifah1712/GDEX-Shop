import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },
  {
    path: 'user',
    loadChildren: () => import('./pages/userhome/userhome.module').then(m => m.UserhomePageModule),
    canActivate: [AuthGuard],
    data: {
      role: ['USER', 'EMPLOYEE', 'UNVERIFIED' ]
    }
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/adminhome/adminhome.module').then(m => m.AdminhomePageModule),
    canActivate: [AuthGuard],
    data: {
      role: 'ADMIN'
    }
  },
  {
    path: 'unverified',
    loadChildren: () => import('./pages/unverified/unverified.module').then(m => m.UnverifiedPageModule),

    // loadChildren:'./pages/unverified/unverified.module#UnverifiedPageModule',
    canActivate: [AuthGuard],
    data: {
      role: 'unverified'
    }
  },
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  {
    path: 'item-details/:productid',
    loadChildren: () => import('./pages/item-details/item-details.module').then( m => m.ItemDetailsPageModule)
  },
  {
    path: 'manageproducts',
    loadChildren: () => import('./pages/manageproducts/manageproducts.module').then( m => m.ManageproductsPageModule)
  },
  {
    path: 'manageproducts-details/:productid',
    loadChildren: () => import('./pages/manageproducts-details/manageproducts-details.module').then( m => m.ManageproductsDetailsPageModule)
  },
  {
    path: 'user/cart',
    loadChildren: () => import('./pages/cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./pages/checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
  {
    path: 'mypurchase',
    loadChildren: () => import('./pages/mypurchase/mypurchase.module').then( m => m.MypurchasePageModule)
  },
  {
    path: 'manageproduct-details-edit/:productid',
    loadChildren: () => import('./pages/manageproduct-details-edit/manageproduct-details-edit.module').then( m => m.ManageproductDetailsEditPageModule)
  },
  {
    path: 'productlist/:category',
    loadChildren: () => import('./pages/productlist/productlist.module').then( m => m.ProductlistPageModule)
  },
  {
    path: 'allorders',
    loadChildren: () => import('./pages/allorders/allorders.module').then( m => m.AllordersPageModule)
  },
  {
    path: 'rolemanager',
    loadChildren: () => import('./pages/rolemanager/rolemanager.module').then( m => m.RolemanagerPageModule)
  },
  // {
  //   path: 'login',
  //   loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  // },
  // {
  //   path: 'register',
  //   loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  // },
  // {
  //   path: 'userhome',
  //   loadChildren: () => import('./pages/userhome/userhome.module').then( m => m.UserhomePageModule)
  // },
  // {
  //   path: 'adminhome',
  //   loadChildren: () => import('./pages/adminhome/adminhome.module').then( m => m.AdminhomePageModule)
  // },
  // {
  //   path: 'unverified',
  //   loadChildren: () => import('./pages/unverified/unverified.module').then( m => m.UnverifiedPageModule)
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
