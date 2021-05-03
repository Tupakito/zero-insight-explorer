import { Component, OnInit } from '@angular/core';

import { StatsService } from './../../stats/_services/stats.service';

import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-latest-transactions',
  templateUrl: './latest-transactions.component.html',
  styleUrls: ['./latest-transactions.component.scss'],
})
export class LatestTransactionsComponent implements OnInit {
  transactions: object[] = [];
  transactions$: Observable<any[]>;
  transactionsColumns = ['Tx', 'Datetime', 'Value'];
  transactionsRows = [];

  constructor(private statsService: StatsService) {}

  ngOnInit(): void {
    const _self = this;
    this.getTransactions();
    /*this.statsService.getTransactions(10).subscribe((data) => {
      _self.blocks = data['blocks'];
      _self.blocks.forEach((block) => {
        const timestamp = block['time'];
        _self.blocksRows.push({
          cells: [
            {
              id: 'Hash',
              value:
                block['hash'].substr(0, 15) + '...' + block['hash'].substr(-15),
              type: 'link',
            },
            {
              id: 'Datetime',
              value: moment.unix(timestamp).format('MM/DD/YYYY HH:mm:ss'),
              type: 'text',
            },
            {
              id: 'Value',
              value: block['value'],
              type: 'text',
            },
          ],
        });
      });
    });*/
  }

  getTransactions() {
    const _self = this;
    this.statsService.getBlocks(10).subscribe((data) => {
      const blocks = data['blocks'];
      blocks.forEach((block) => {
        _self.statsService
          .getBlockByHash(block['hash'])
          .subscribe((blockData) => {
            // return blockData['tx'];
            blockData['tx'].forEach((tx) => {
              /*console.log(
                _self.statsService.getTransactionsByTx(tx).pipe(
                  map((tx) => {
                    return {
                      id: tx['txid'],
                      date: tx['time'],
                      value: tx['valueOut'],
                    };
                  })
                )
              );*/

              _self.transactions$ = _self.statsService.getTransactionByTx(tx);

              /*_self.statsService.getTransactionsByTx(tx).subscribe((dataTx) => {
                console.log(dataTx);
                _self.transactions.push(dataTx);
              });*/
            });
          });
      });
    });
  }
}
