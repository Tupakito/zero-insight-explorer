import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { StatsService } from './../stats/_services/stats.service';
import { environment } from 'src/environments/environment';

import * as moment from 'moment';
import tippy from 'tippy.js';
import 'tippy.js/animations/scale.css';
import 'tippy.js/themes/light.css';

import * as $ from 'jquery';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss'],
})
export class BlockComponent implements OnInit {
  blockHash: string;
  blockId: string;
  hash: string;
  blockTime: string;
  blockDate: string;
  transactionCount: number = 0;
  blockSize: number;
  confirmationCount: number = 0;
  blockReward: string;
  txColumns = ['Tx', 'Datetime', 'Value'];
  txRows = [];
  @ViewChild('blockhash', { static: false }) blockhashElem: ElementRef;

  constructor(
    private statsService: StatsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    $(window).scrollTop(0);
    this.hash = this.route.snapshot.params['hash'];
  }

  ngOnInit(): void {
    const _self = this;
    this.statsService.getBlockByHash(this.hash).subscribe((data) => {
      _self.blockHash = data['hash'];
      _self.blockId = data['height'];
      _self.blockTime = moment.unix(data['time']).fromNow();
      _self.blockDate = moment.unix(data['time']).format('MM/DD/YYYY HH:mm:ss');
      _self.transactionCount = data['tx'].length;
      _self.blockSize = data['size'];
      _self.confirmationCount = data['confirmations'];
      _self.blockReward = data['reward'] + ' ' + environment.coin.ticker;

      // get transactions data
      data['tx'].forEach((tx) => {
        _self.statsService.getTransactionByTx(tx).subscribe((txData) => {
          console.log(txData);
          _self.txRows.push({
            cells: [
              {
                id: 'Tx',
                value: txData['txid'],
                type: 'link',
              },
              {
                id: 'Datetime',
                value: moment
                  .unix(txData['time'])
                  .format('MM/DD/YYYY HH:mm:ss'),
                type: 'text',
              },
              {
                id: 'Value',
                value: txData['valueOut'] + ' ' + environment.coin.ticker,
                type: 'text',
              },
            ],
          });
        });
      });
    });

    tippy('#blockhash', {
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
        const text = this.blockhashElem.nativeElement.innerText;
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
