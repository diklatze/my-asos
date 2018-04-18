import { Component } from '@angular/core';
import { Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { ProductInformation } from '../../classes/productInformation';
import { SearchParameters } from '../../classes/searchParameters';
import { SearchParametersList } from '../../classes/searchParametersList';
import { PriceCheck } from '../../classes/PriceCheck';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ViewChild, Directive, ElementRef, OnDestroy, OnInit, Input } from '@angular/core';

declare var $: any





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
  // asosInfo: ProductInformation = new ProductInformation;
  asosInfo: any;
  rateInfo:any;
  chosenCurrency: String;
  chosenScheme: String;

  asosInfosList: ProductInformation[] = [];
  pricesList: PriceCheck[] = [];

  searchParametersList: SearchParameters[] = SearchParametersList;
  index: number;
  pricesIndex:number;
  error: number = 0;
  @ViewChild('currencyDropdown') currencyDropdownElementRef: ElementRef;
  @ViewChild('schemeDropdown') schemeDropdownElementRef: ElementRef;




  constructor(private http: HttpClient) {
    this.asosInfosList = new Array<ProductInformation>();
    this.pricesList = new Array<PriceCheck>();


    ;


  }

  ngOnInit() {

    $(this.currencyDropdownElementRef.nativeElement)
      .dropdown({
        setFluidWidth: false,
        direction: false,
        overflow: true

      })
      ;
      
      $(this.schemeDropdownElementRef.nativeElement)
      .dropdown({
        setFluidWidth: false,
        direction: false,
        overflow: true
        
      })
      ;
    }
    
    callPriceRate(chosenCurrency : String) {
      this.http.get('http://www.floatrates.com/daily/'+chosenCurrency+'.json')
      .subscribe(

      data => {
        this.rateInfo = data;
        this.pricesList.forEach(element => {
          let local = element.localCurrency;
          element.rate = this.rateInfo.local.rate;
          
        });

        





      },

    );

  
  
  
    }

  callEveryAsos(index: number, store: String, lang: String, sizeSchema: String, currency: String, country: String) {
    if (this.chosenScheme == "EU") {
      if (store == "DE" || store == "ES" || store == "FR") {
        this.http.get('http://api.asos.com/product/catalogue/v2/products/' + this.productNumber + '?store=' + store + '&lang=' + lang + '&sizeSchema=' + sizeSchema + '&currency=' + currency)
          .subscribe(

          data => {


            this.asosInfo = data;
            this.asosInfosList[index] = this.asosInfo;
            this.asosInfosList[index].country = country;
            this.pricesList[index].localPrice = this.asosInfosList[index].price.current.text;
            this.pricesList[index].localCurrency = currency;





          },

        );

      }

      else {
        this.http.get('http://api.asos.com/product/catalogue/v2/products/' + this.productNumber + '?store=' + store + '&lang=' + lang + '&sizeSchema=' + this.chosenScheme + '&currency=' + currency)

          .subscribe(

          data => {


            this.asosInfo = data;
            this.asosInfosList[index] = this.asosInfo;
            this.asosInfosList[index].country = country;
            this.pricesList[index].localPrice = this.asosInfosList[index].price.current.text;
            this.pricesList[index].localCurrency = currency;






          },

        );


      }
    }

    else if (this.chosenScheme && this.chosenScheme != "By Local") {
      this.http.get('http://api.asos.com/product/catalogue/v2/products/' + this.productNumber + '?store=' + store + '&lang=' + lang + '&sizeSchema=' + this.chosenScheme + '&currency=' + currency)
        .subscribe(

        data => {


          this.asosInfo = data;
          this.asosInfosList[index] = this.asosInfo;
          this.asosInfosList[index].country = country;
          this.pricesList[index].localPrice = this.asosInfosList[index].price.current.text;
          this.pricesList[index].localCurrency = currency;





        },

      );


    }
    else if (!this.chosenScheme || this.chosenScheme == "By Local") {
      this.http.get('http://api.asos.com/product/catalogue/v2/products/' + this.productNumber + '?store=' + store + '&lang=' + lang + '&sizeSchema=' + sizeSchema + '&currency=' + currency)

        .subscribe(

        data => {


          this.asosInfo = data;
          this.asosInfosList[index] = this.asosInfo;
          this.asosInfosList[index].country = country;
          this.pricesList[index].localPrice = this.asosInfosList[index].price.current.text;
          this.pricesList[index].localCurrency = currency;





        },

      );
    }

  }

  SubmitUrl() {
    this.asosInfosList = new Array;
    this.indexOfPrd = this.inputUrl.indexOf("prd/");
    this.productNumber = this.inputUrl.slice(this.indexOfPrd + 4, this.indexOfPrd + 11);
    this.index = -1;
    this.pricesIndex=-1;
    this.searchParametersList.forEach(element => {
      this.index = this.index + 1;
      this.callEveryAsos(this.index, element.store, element.lang, element.sizeSchema, element.currency, element.country);

    });

    
      if (this.chosenCurrency) {
        this.chosenCurrency = this.chosenCurrency;
      }
      else {
        this.chosenCurrency = "gbp";
      }
this.callPriceRate(this.chosenCurrency);

     

  }





}
