import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { filter, reduce } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators';

export interface IStockPrice {
  value: number;
  change?: 'UP' | 'DOWN' | 'NONE';
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'liveStock';
  subject = webSocket('ws://stocks.hulqmedia.com');
  stocks: Map<string, IStockPrice>;

  constructor(private cd: ChangeDetectorRef) {
    this.stocks = new Map();
  }

  ngOnInit(): void {
    this.subject.subscribe((x: [any]) => {
      //this.stocks = x[0];
      // this.stocks = x;
      for (const stock of x) {
        const key = stock[0];
        const value = stock[1];
        if (this.stocks.has(key)) {
          const oldValue = this.stocks.get(key).value;
          const vchange = value - oldValue;
          let change: 'UP' | 'DOWN' | 'NONE';
          if (vchange < 0) {
            change = 'DOWN';
          } else if (vchange > 0) {
            change = 'UP';
          } else {
            change = 'NONE';
          }
          this.stocks.set(key, { value: value, change: change });
          this.cd.detectChanges();
        } else {
          this.stocks.set(key, { value: value, change: 'NONE' });
          this.cd.detectChanges();
        }
      }
      // console.log('x----------------------', x);
      // console.log('------------y', this.stocks);
    });
    // distinct value
    // this.subject.pipe(distinctUntilChanged()).subscribe(x=>{
    //   this.stocks = x;
    //   console.log('--------------->',this.stocks);
    // })

    // this.subject.startWith(null) // emitting first empty value to fill-in the buffer
    // .pairwise()
    // .subscribe([previousValue, currentValue] => {
    //     if (null === previousValue) {
    //         console.log('Probably first emission...');
    //     }
    // })
  }
  // getColor(stock){
  //   switch(stock){
  //     case 'stock<60':
  //       return 'red';
  //     case 'stock>60':
  //       return 'green';
  //   }
}
