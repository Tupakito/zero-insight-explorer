import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { StatsService } from '../_services/stats.service';

@Injectable()
export class StatsResolver implements Resolve<Observable<any>> {
  constructor(private statsService: StatsService) {}

  resolve() {
    return this.statsService.getZeroNodeStats();
  }
}
