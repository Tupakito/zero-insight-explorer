import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import tippy from 'tippy.js';
import { NgxTippyModule } from 'ngx-tippy-wrapper';
import 'hammerjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { TableComponent } from './table/table.component';
import { ProgressStatsComponent } from './stats/progress-stats/progress-stats.component';
import { HomeComponent } from './home/home.component';
import { LatestBlocksComponent } from './home/latest-blocks/latest-blocks.component';
import { LatestTransactionsComponent } from './home/latest-transactions/latest-transactions.component';
import { BlockComponent } from './block/block.component';
import { TransactionComponent } from './transaction/transaction.component';
import { AddressComponent } from './address/address.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    TableComponent,
    ProgressStatsComponent,
    HomeComponent,
    LatestBlocksComponent,
    LatestTransactionsComponent,
    BlockComponent,
    TransactionComponent,
    AddressComponent,
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    AppRoutingModule,
    MatIconModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    // NgxTippyModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
