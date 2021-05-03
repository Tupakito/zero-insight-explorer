import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  constructor(private http: HttpClient) {}

  getZeroNodeStats(): Observable<any> {
    return this.http.get(environment.apiUrl + 'zeronodestats');
  }

  getSyncStatus(): Observable<any> {
    return this.http.get(environment.apiUrl + 'sync');
  }

  getBlocks(limit: number): Observable<any> {
    return this.http.get(environment.apiUrl + 'blocks?limit=' + limit);
  }

  getBlockByHash(hash: string): Observable<any> {
    return this.http.get(environment.apiUrl + 'block/' + hash);
  }

  getTransactionByTx(tx: string): Observable<any> {
    return this.http.get(environment.apiUrl + 'tx/' + tx);
  }

  getTransactionsByAddress(
    address: string,
    from: number = 0,
    to: number = 20
  ): Observable<any> {
    return this.http.get(
      environment.apiUrl +
        'addrs/' +
        address +
        '/txs?from=' +
        from +
        '&to=' +
        to
    );
  }

  getAddress(address: string): Observable<any> {
    return this.http.get(environment.apiUrl + 'addr/' + address);
  }

  getCurrencyPrice(): Observable<any> {
    return this.http.get(environment.apiUrl + 'currency');
  }

  async getTransactions(limit: number): Promise<any> {
    const _self = this;
    let transactions = [];
    /*this.getBlocks(10).subscribe((data) => {
      data['blocks'].forEach((block) => {
        _self.getBlockByHash(block['hash']).subscribe((blockData) => {
          blockData['tx'].forEach((tx) => {
            transactions.push(tx);
          });
        });
      });
    });*/
    const blocks = await this.getBlocks(10).subscribe((blocks) => {
      return blocks['blocks'];
    });
    /*blocks.forEach((block) => {
      const tx = await _self
        .getBlockByHash(block['hash'])
        .subscribe((blockData) => {
          return blockData['tx'];
        });
      transactions.push(tx);
    });*/

    return blocks;
  }
}
