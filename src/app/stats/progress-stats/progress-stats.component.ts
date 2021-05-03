import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

declare var ProgressBar: any;

@Component({
  selector: 'app-progress-stats',
  templateUrl: './progress-stats.component.html',
  styleUrls: ['./progress-stats.component.scss'],
})
export class ProgressStatsComponent implements OnInit, AfterViewInit {
  @Input() chartId: string;
  @Input() title: string;
  @Input() subTitle: string;
  @Input() percent: number;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.generateChart();
  }

  generateChart() {
    var _self = this;
    var chart = new ProgressBar.Circle(document.getElementById(this.chartId), {
      color: '#ffd700',
      // This has to be the same size as the maximum width to
      // prevent clipping
      strokeWidth: 4,
      trailWidth: 1,
      easing: 'easeInOut',
      duration: 1400,
      text: {
        autoStyleContainer: false,
      },
      from: { color: '#ffd700', width: 1 },
      to: { color: '#ffd700', width: 2 },
      // Set default step function for all animate calls
      step: function (state, circle) {
        circle.path.setAttribute('stroke', state.color);
        circle.path.setAttribute('stroke-width', state.width);

        // var value = Math.round(circle.value * 100).toFixed(2);
        var value = (_self.percent * 100).toFixed(2) + '%';
        if (value === '') {
          circle.setText('');
        } else {
          circle.setText(value);
        }
      },
    });

    chart.text.style.fontFamily = 'Montserrat, sans-serif';
    chart.text.style.fontSize = '1.5rem';
    chart.animate(this.percent); // Number from 0.0 to 1.0
  }
}
