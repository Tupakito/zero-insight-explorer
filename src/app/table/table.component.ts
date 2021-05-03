import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() columns: any[];
  @Input() rows: any[];
  @Output() clickEvent = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  click(cells: any[]) {
    const linkRow = cells.find((item) => item.type === 'link');
    const urlParam = linkRow.value;
    this.clickEvent.emit(urlParam);
  }
}
