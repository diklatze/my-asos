import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {ProductInformation} from '../../classes/productInformation';



@Component({
  selector: 'main-segment',
  templateUrl: './main-segment.component.html',
  styleUrls: ['./main-segment.component.css']
})
export class MainSegmentComponent implements OnInit {

  inputUrl: String;
  indexOfPrd: number;
  productNumber: String;
  name:String;
  asosPrice:ProductInformation = new ProductInformation;
  asosPrice0:ProductInformation = new ProductInformation;

  asosPricesList: ProductInformation[] = [this.asosPrice0];


  constructor(private http: Http) {
    
   


   }

  ngOnInit() {
  }

  SubmitUrl() {
    this.indexOfPrd = this.inputUrl.indexOf("prd/");
    this.productNumber = this.inputUrl.slice(this.indexOfPrd + 4, this.indexOfPrd + 11);

    this.http.get('http://api.asos.com/product/catalogue/v2/products/'+this.productNumber+'?store=COM&lang=en-GB&sizeSchema=EU&currency=EUR')
      .map(res => {
        // If request fails, throw an Error that will be caught
        if (res.status < 200 || res.status >= 300) {
          throw new Error('This request has failed ' + res.status);
        }
        // If everything went fine, return the response
        else {
          return res.json();
        }
      })
      .subscribe(
      data => {
        if (data) {
          this.asosPrice=data;
          this.asosPricesList[0]=this.asosPrice;
         
        }

      },
    );
  }

}
