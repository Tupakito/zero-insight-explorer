import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { StatsService } from './../stats/_services/stats.service';
import { environment } from 'src/environments/environment';

import * as moment from 'moment';
import tippy from 'tippy.js';
import 'tippy.js/animations/scale.css';
import 'tippy.js/themes/light.css';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {
  address: string;
  balance: string;
  balanceInFiat: string;
  totalReceived: string;
  totalSent: string;
  transactionCount: number = 0;
  txColumns = ['Tx', 'Datetime', 'Value'];
  txRows: any = [];
  @ViewChild('addressref', { static: false }) addressElem: ElementRef;

  constructor(
    private statsService: StatsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.address = this.route.snapshot.params['address'];
  }

  ngOnInit(): void {
    const _self = this;
    this.statsService.getAddress(this.address).subscribe((data) => {
      _self.balance = data['balance'] + ' ' + environment.coin.ticker;
      _self.statsService.getCurrencyPrice().subscribe((currencyData) => {
        _self.balanceInFiat =
          '$' + data['balance'] * currencyData['data']['usd'];
      });
      _self.totalReceived =
        data['totalReceived'] + ' ' + environment.coin.ticker;
      _self.totalSent = data['totalSent'] + ' ' + environment.coin.ticker;
      _self.transactionCount = data['transactions'].length;

      // get transactions data

      _self.statsService
        .getTransactionsByAddress(_self.address)
        .subscribe((txData) => {
          txData['items'].forEach((tx) => {
            _self.txRows.push({
              cells: [
                {
                  id: 'Tx',
                  value: tx['txid'],
                  type: 'link',
                },
                {
                  id: 'Datetime',
                  value: moment.unix(tx['time']).format('MM/DD/YYYY HH:mm:ss'),
                  type: 'text',
                },
                {
                  id: 'Value',
                  value: tx['valueOut'] + ' ' + environment.coin.ticker,
                  type: 'text',
                },
              ],
            });
          });
        });
    });

    tippy('#address', {
      content: 'Copied!',
      theme: 'light',
      trigger: 'click',
      animateFill: true,
      animation: 'fade',
      arrow: false,
      duration: 1500,
      inertia: true,
      onShow(instance) {
        setTimeout(() => {
          instance.hide();
        }, 1500);
      },
    });

    document
      .querySelector('mat-icon')
      .addEventListener('click', async (event) => {
        if (!navigator.clipboard) {
          // Clipboard API not available
          return;
        }
        const input = event.target as HTMLElement;
        const text = this.addressElem.nativeElement.innerText;
        try {
          await navigator.clipboard.writeText(text);
          console.log(text);
        } catch (err) {
          console.error('Failed to copy!', err);
        }
      });
  }

  onClick(txId) {
    this.router.navigate(['/tx', txId], {});
  }
}
