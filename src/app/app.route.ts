import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('./page/user/component/login-provider/login-provider.module').then(m => m.LoginProviderModule) 
  },
  {
    path: 'login',
    loadChildren: () => import('./page/user/component/login-provider/login-provider.module').then(m => m.LoginProviderModule) 
  },
  {
    path: 'home',
    loadChildren: () => import('./page/user/component/_home/home.module').then(m => m.HomeModule) 
  }, 
  {
    path: 'client-home',
    loadChildren: () => import('./page/client/component/_home/home.module').then(m => m.HomeModule) 
  },
  {
    path: 'store-home',
    loadChildren: () => import('./page/store/component/_home/home.module').then(m => m.HomeModule) 
  },
  {
    path: 'loginTest',
    loadChildren: () => import('./page/user/component/login/login.module').then(m => m.LoginModule) 
  },
  {
    path: 'registerTest',
    loadChildren: () => import('./page/user/component/register/register.module').then(m => m.RegisterModule) 
  },
  {
    path: 'warehouse',
    loadChildren: () => import('./page/admin/component/warehouse/warehouse.module').then(m => m.WarehouseModule) 
  },
  {
    path: 'welcome-for-open-your-store',
    loadChildren: () => import('./page/client/component/welcome-for-open-your-store/welcome-for-open-your-store.module').then(m => m.WelcomeForOpenYourStoreModule) 
  },
  {
    path: 'open-my-store',
    loadChildren: () => import('./page/client/component/open-my-store/open-my-store.module').then(m => m.OpenMyStoreModule) 
  },
  {
    path: 'new-product',
    loadChildren: () => import('./page/store/component/new-product/new-product.module').then(m => m.NewProductModule) 
  },
  {
    path: 'user-create-order',
    loadChildren: () => import('./page/user/component/_create-order/create-order.module').then(m => m.CreateOrderModule) 
  },
  {
    path: 'user-page-of-store/:id',
    loadChildren: () => import('./page/user/component/_page-of-store/page-of-store.module').then(m => m.PageOfStoreModule) 
  },
  {
    path: 'client-page-of-store/:id',
    loadChildren: () => import('./page/client/component/_page-of-store/page-of-store.module').then(m => m.PageOfStoreModule) 
  },
  {
    path: 'client-create-order',
    loadChildren: () => import('./page/client/component/_create-order/create-order.module').then(m => m.CreateOrderModule) 
  },
  {
    path: 'order-send-sucess',
    loadChildren: () => import('./page/client/component/order-send-sucess/order-send-sucess.module').then(m => m.OrderSendSucessModule) 
  },
  {
    path: 'client-order-list',
    loadChildren: () => import('./page/client/component/_order-list/order-list.module').then(m => m.OrderListModule) 
  },
  {
    path: 'client-order-detail/:id',
    loadChildren: () => import('./page/client/component/_order-detail/order-detail.module').then(m => m.OrderDetailModule) 
  },
  {
    path: 'client-order-detail-alter/:id',
    loadChildren: () => import('./page/client/component/_order-detail-alter/order-detail-alter.module').then(m => m.OrderDetailAlterModule) 
  }, 
  {
    path: 'store-order-list',
    loadChildren: () => import('./page/store/component/_order-list/order-list.module').then(m => m.OrderListModule) 
  },
  {
    path: 'store-order-detail/:id',
    loadChildren: () => import('./page/store/component/_order-detail/order-detail.module').then(m => m.OrderDetailModule) 
  },
  {
    path: 'store-order-detail-alter/:id',
    loadChildren: () => import('./page/store/component/_order-detail-alter/order-detail-alter.module').then(m => m.OrderDetailAlterModule) 
  }, 
  {
    path: 'alter-perfil-of-client',
    loadChildren: () => import('./page/client/component/_alter-perfil-of-client/alter-perfil-of-client.module').then(m => m.AlterPerfilOfClientModule) 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoute {}
