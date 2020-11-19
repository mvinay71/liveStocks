import { Component,OnInit} from '@angular/core';
import{webSocket,WebSocketSubject} from 'rxjs/webSocket';
import{filter, reduce} from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'liveStock';
  subject = webSocket('ws://stocks.hulqmedia.com');
  stocks:any;

 
  
  ngOnInit():void{
    this.subject.subscribe(x=>{
      //this.stocks = x[0];
      this.stocks = x;
      
      //console.log('x----------------------',x);
      console.log('------------y',this.stocks);
      
      
    })
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
  


  

