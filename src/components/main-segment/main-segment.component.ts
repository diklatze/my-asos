import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'main-segment',
  templateUrl: './main-segment.component.html',
  styleUrls: ['./main-segment.component.css']
})
export class MainSegmentComponent implements OnInit {
 
  inputUrl : String;
  indexOfPrd : number;
  productNumber : String;


  constructor() { }

  ngOnInit() {
  }

  SubmitUrl(){
    this.indexOfPrd = this.inputUrl.indexOf("prd/");
    this.productNumber = this.inputUrl.slice(this.indexOfPrd+4,this.indexOfPrd+11);

  }

}
