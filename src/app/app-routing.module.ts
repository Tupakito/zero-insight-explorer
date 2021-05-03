import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { StatsResolver } from 'src/app/stats/_resolvers/stats.resolver';

import { HomeComponent } from './home/home.component';
import { BlockComponent } from './block/block.component';
import { TransactionComponent } from './transaction/transaction.component';
import { AddressComponent } from './address/address.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      stats: StatsResolver,
    },
  },
  {
    path: 'block/:hash',
    component: BlockComponent,
  },
  {
    path: 'tx/:txid',
    component: TransactionComponent,
  },
  {
    path: 'addr/:address',
    component: AddressComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule],
  providers: [StatsResolver],
})
export class AppRoutingModule {}
