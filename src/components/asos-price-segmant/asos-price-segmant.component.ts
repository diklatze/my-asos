import { Component, OnInit } from '@angular/core';
import { Input,Output } from '@angular/core';
import {ProductInformation} from '../../classes/productInformation';



@Component({
  selector: 'asos-price-segmant',
  templateUrl: './asos-price-segmant.component.html',
  styleUrls: ['./asos-price-segmant.component.css']
})
export class AsosPriceSegmantComponent implements OnInit {

  @Input() bestPrice:boolean;
  @Input() productInformation: ProductInformation; 
  @Input () country: String;

  constructor() {
    
   }

  ngOnInit() {
  }

}
