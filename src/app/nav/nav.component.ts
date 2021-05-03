import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

import { StatsService } from './../stats/_services/stats.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  height: string;
  status: string;

  constructor(private statsService: StatsService) {}

  ngOnInit(): void {
    const _self = this;
    this.statsService.getSyncStatus().subscribe((data) => {
      if (
        typeof data['height'] !== 'undefined' &&
        typeof data['status'] !== 'undefined'
      ) {
        _self.height = data['height'];
        _self.status = data['status'];
      }
    });

    /**
     * Sticky nav bar when scrolling
     **/
    window.onscroll = function () {
      onStickNavbar();
    };
    var navbar = $('header');
    var sticky = navbar.offset().top;
    function onStickNavbar() {
      if (window.pageYOffset >= sticky) {
        $(navbar).addClass('sticky');
      } else {
        $(navbar).removeClass('sticky');
      }
    }
  }
}
