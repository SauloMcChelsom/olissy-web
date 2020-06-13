import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    loadChildren: './components/product/product.module#ProductModule'
  },
  {
    path: 'product',
    loadChildren: './components/product/product.module#ProductModule'
  },
  {
    path: 'store',
    loadChildren: './components/store/store.module#StoreModule'
  },
  {
    path: 'product-page/:id',
    loadChildren:'./components/product-page/product-page.module#ProductPageModule'
  },
  {
    path: 'store-page/:id',
    loadChildren: './components/store-page/store-page.module#StorePageModule'
  },
  {
    path: 'complete-orders/:id',
    loadChildren:'./components/complete-orders/complete-orders.module#CompleteOrdersModule'
  },
  {
    path: 'evaluate-store/:id',
    loadChildren:'./components/evaluate-store/evaluate-store.module#EvaluateStoreModule'
  },
  {
    path: 'login',
    loadChildren: './components/login/login.module#LoginModule'
  },
  {
    path: 'register',
    loadChildren: './components/register/register.module#RegisterModule'
  },
  {
    path: 'about-store/:id',
    loadChildren: './components/about-store/about-store.module#AboutStoreModule'
  },
  {
    path: 'invoice-list',
    loadChildren:'./components/invoice-list/invoice-list.module#InvoiceListModule'
  },
  {
    path: 'invoice-detail/:id',
    loadChildren:'./components/invoice-detail/invoice-detail.module#InvoiceDetailModule'
  },
  {
    path: 'store-order',
    loadChildren: './components/store-order/store-order.module#StoreOrderModule'
  },
  {
    path: 'store-product-registration',
    loadChildren:'./components/store-product-registration/store-product-registration.module#StoreProductRegistrationModule'
  },
  {
    path: 'store-panel',
    loadChildren:'./components/store-panel/store-panel.module#StorePanelModuleModule'
  },
  {
    path: 'store-user-change-registration',
    loadChildren:'./components/store-user-change-registration/store-user-change-registration.module#StoreUserChangeRegistrationModule'
  },
  {
    path: 'store-about',
    loadChildren: './components/store-about/store-about.module#StoreAboutModule'
  },
  {
    path: 'client-panel',
    loadChildren:'./components/client-panel/client-panel.module#ClientPanelModule'
  },
  {
    path: 'client-open-your-store',
    loadChildren:'./components/client-open-your-store/client-open-your-store.module#ClientOpenYourStoreModule'
  },
  {
    path: 'client-order',
    loadChildren:'./components/client-order/client-order.module#ClientOrderModule'
  },
  {
    path: 'client-user-change-registration',
    loadChildren:'./components/client-user-change-registration/client-user-change-registration.module#ClientUserChangeRegistrationModule'
  },

  {
    path: 'terms-of-accession',
    loadChildren:'./components/terms-of-accession/terms-of-accession.module#TermsOfAccessionModule'
  },
  {
    path: 'privacy-policy',
    loadChildren:'./components/privacy-policy/privacy-policy.module#PrivacyPolicyModule'
  },
  {
    path: 'exchange-devolution',
    loadChildren:'./components/exchange-devolution/exchange-devolution.module#ExchangeDevolutionModule'
  },
  {
    path: 'terms-of-use',
    loadChildren:'./components/terms-of-use/terms-of-use.module#TermsOfUseModule'
  },
  {
    path: 'adhesion-contract',
    loadChildren:'./components/adhesion-contract/adhesion-contract.module#AdhesionContractModule'
  },
  {
    path: 'about-developer',
    loadChildren:'./components/about-developer/about-developer.module#AboutDeveloperModule'
  },
  {
    path: 'platform',
    loadChildren:'./components/platform/platform.module#PlatformModule'
  },
  {
    path: 'about',
    loadChildren:'./components/about/about.module#AboutModule'
  },
  {
    path: 'product-crud-database',
    loadChildren:'./components/product-crud-database/product-crud-database.module#ProductCrudDatabaseModule'
  },
  {
    path: 'store-product-record',
    loadChildren:'./components/store-product-record/store-product-record.module#StoreProductRecordModule'
  },
  {
    path: 'order-detail/:id',
    loadChildren:'./components/order-detail/order-detail.module#OrderDetailModule'
  },
  {
    path: 'client-order-detail/:id',
    loadChildren:'./components/client-order-detail/client-order-detail.module#ClientOrderDetailModule'
  },
  {
    path: 'client-order-detail-alter/:id',
    loadChildren:'./components/client-order-detail-alter/client-order-detail-alter.module#ClientOrderDetailAlterModule'
  },
  {
    path: 'store-order-detail/:id',
    loadChildren:'./components/store-order-detail/store-order-detail.module#StoreOrderDetailModule'
  },
  {
    path: 'store-message-contact',
    loadChildren:'./components/store-message-contact/store-message-contact.module#StoreMessageContactModule'
  },
  {
    path: 'store-message-text/:id',
    loadChildren:'./components/store-message-text/store-message-text.module#StoreMessageTextModule'
  },
  {
    path: 'client-message-contact',
    loadChildren:'./components/client-message-contact/client-message-contact.module#ClientMessageContactModule'
  },
  {
    path: 'client-message-text/:id',
    loadChildren:'./components/client-message-text/client-message-text.module#ClientMessageTextModule'
  },
  {
    path: 'prohibited-products',
    loadChildren:'./components/prohibited-products/prohibited-products.module#ProhibitedProductsModule'
  },
  {
    path: 'business-rule',
    loadChildren:'./components/business-rule/business-rule.module#BusinessRuleModule'
  },
  {
    path: 'payment-list',
    loadChildren:'./components/payment-list/payment-list.module#PaymentListModule'
  },
  {
    path: 'payment-detail/:id',
    loadChildren:'./components/payment-detail/payment-detail.module#PaymentDetailModule'
  },
  {
    path: 'admin-payment',
    loadChildren:'./components/admin-payment/admin-payment.module#AdminPaymentModule'
  },
  {
    path: 'admin-payment-list/:id',
    loadChildren:'./components/admin-payment-list/admin-payment-list.module#AdminPaymentListModule'
  },
  {
    path: 'admin-payment-list-detail/:id',
    loadChildren:'./components/admin-payment-list-detail/admin-payment-list-detail.module#AdminPaymentListDetailModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoute {}
