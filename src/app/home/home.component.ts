import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

import { StatsService } from './../stats/_services/stats.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isInitialized = false;
  statsCharts = [
    {
      id: 'supply_progress',
      title: '',
      subTitle: 'Circulating supply',
      percent: 0,
    },
    {
      id: 'mine_diff_progress',
      title: '75,443.0647',
      subTitle: 'Mining difficulty',
      percent: 0,
    },
    {
      id: 'masternodes_progress',
      title: '1,690,000 ZER',
      subTitle: 'Locked for masternodes',
      percent: 0,
    },
  ];
  stats;

  transactionsColumns = ['Hash', 'Block', 'Datetime', 'Value'];
  transactionsRows = [];

  constructor(
    private statsService: StatsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const _self = this;
    this.stats = this.route.snapshot.data['stats'];
    if (
      typeof this.stats['chainStats'] !== 'undefined' &&
      typeof this.stats['nodeCount'] !== 'undefined'
    ) {
      const supply = this.stats['chainStats']['supply'];
      const nodeCount = this.stats['nodeCount']['total'];
      let supplyObj = _self.statsCharts.find((e) => e.id === 'supply_progress');
      let masternodeObj = _self.statsCharts.find(
        (e) => e.id === 'masternodes_progress'
      );
      supplyObj['title'] =
        parseFloat(supply).toLocaleString('en') + ' ' + environment.coin.ticker;
      supplyObj['percent'] = supply / environment.coin.maxSupply;

      masternodeObj['title'] =
        parseFloat(
          (nodeCount * environment.coin.masternodeColateral).toString()
        ).toLocaleString('en') +
        ' ' +
        environment.coin.ticker;
      masternodeObj['percent'] =
        (nodeCount * environment.coin.masternodeColateral) / supply;
    }
  }
}
