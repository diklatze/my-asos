import { Component, OnInit } from '@angular/core';
import { Input,Output } from '@angular/core';


@Component({
  selector: 'asos-price-segmant',
  templateUrl: './asos-price-segmant.component.html',
  styleUrls: ['./asos-price-segmant.component.css']
})
export class AsosPriceSegmantComponent implements OnInit {

  @Input() bestPrice:String;

  constructor() { }

  ngOnInit() {
  }

}
