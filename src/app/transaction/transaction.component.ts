import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { StatsService } from './../stats/_services/stats.service';
import { environment } from 'src/environments/environment';

import * as moment from 'moment';
import * as $ from 'jquery';
import tippy from 'tippy.js';
import 'tippy.js/animations/scale.css';
import 'tippy.js/themes/light.css';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit {
  txHash: string;
  hash: string;
  txTime: string;
  txDate: string;
  transactionCount: number = 0;
  txSize: number;
  confirmationCount: number = 0;
  txColumns = ['Tx', 'Datetime', 'Value'];
  txRows = [];
  @ViewChild('txhash', { static: false }) txhashElem: ElementRef;

  constructor(
    private statsService: StatsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    $(window).scrollTop(0);
    this.txHash = this.route.snapshot.params['txid'];
  }

  ngOnInit(): void {
    const _self = this;
    this.statsService.getTransactionByTx(this.txHash).subscribe((data) => {
      console.log(data);
      _self.txHash = data['txid'];
      _self.txTime = moment.unix(data['time']).fromNow();
      _self.txDate = moment.unix(data['time']).format('MM/DD/YYYY HH:mm:ss');
      _self.txSize = data['size'];
      _self.confirmationCount = data['confirmations'];
    });

    tippy('#txhash', {
      content: 'Copied!',
      theme: 'light',
      trigger: 'click',
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
        const text = this.txhashElem.nativeElement.innerText;
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
