import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { StatsService } from './../../stats/_services/stats.service';

import * as moment from 'moment';

@Component({
  selector: 'app-latest-blocks',
  templateUrl: './latest-blocks.component.html',
  styleUrls: ['./latest-blocks.component.scss'],
})
export class LatestBlocksComponent implements OnInit {
  blocks: object[];
  blocksColumns = ['Block', 'Hash', 'Datetime', 'Tx'];
  blocksRows = [];

  constructor(private statsService: StatsService, private router: Router) {}

  ngOnInit(): void {
    const _self = this;
    this.statsService.getBlocks(10).subscribe((data) => {
      _self.blocks = data['blocks'];
      _self.blocks.forEach((block) => {
        const timestamp = block['time'];
        _self.blocksRows.push({
          cells: [
            {
              id: 'Hash',
              value: block['hash'],
              // block['hash'].substr(0, 15) + '...' + block['hash'].substr(-15),
              type: 'link',
            },
            {
              id: 'Block',
              value: block['height'],
              type: 'text',
            },
            {
              id: 'Datetime',
              value: moment.unix(timestamp).format('MM/DD/YYYY HH:mm:ss'),
              type: 'text',
            },
            {
              id: 'Tx',
              value: block['txlength'],
              type: 'text',
            },
          ],
        });
      });
    });
  }

  onClick(hash) {
    this.router.navigate(['/block', hash], {});
  }
}
