import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { ProductInformation } from '../../classes/productInformation';
import { SearchParameters } from '../../classes/searchParameters';
import { SearchParametersList } from '../../classes/searchParametersList';



@Component({
  selector: 'main-segment',
  templateUrl: './main-segment.component.html',
  styleUrls: ['./main-segment.component.css']
})
export class MainSegmentComponent implements OnInit {

  inputUrl: String;
  indexOfPrd: number;
  productNumber: String;
  name: String;
  asosPrice: ProductInformation = new ProductInformation;
  asosPricesList: ProductInformation[] = [];
  searchParametersList: SearchParameters[] = SearchParametersList;
  index:number;

  constructor(private http: Http) {




  }

  ngOnInit() {
  }


  callEveryAsos(index:number,store: String, lang: String, sizeSchema: String, currency: String) {
    this.http.get('http://api.asos.com/product/catalogue/v2/products/' + this.productNumber + '?store=' + store + '&lang=' + lang + '=&sizeSchema=' + sizeSchema + '&currency=' + currency)
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
          this.asosPrice = data;
          this.asosPricesList[index] = this.asosPrice;

        }

      },
    );


  }

  SubmitUrl() {
    this.indexOfPrd = this.inputUrl.indexOf("prd/");
    this.productNumber = this.inputUrl.slice(this.indexOfPrd + 4, this.indexOfPrd + 11);

    this.http.get('http://api.asos.com/product/catalogue/v2/products/' + this.productNumber + '?store=COM&lang=en-GB&sizeSchema=EU&currency=EUR')
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
          this.asosPrice = data;
          this.asosPricesList[0] = this.asosPrice;

        }

      },
    );

    this.index = 0;
    this.searchParametersList.forEach(element => {
      this.index= this.index+1;
      this.callEveryAsos(this.index,element.store,element.lang,element.sizeSchema,element.currency);
    });
   

  }



}
