import { Component } from '@angular/core';
import { Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { ProductInformation } from '../../classes/productInformation';
import { SearchParameters } from '../../classes/searchParameters';
import { SearchParametersList } from '../../classes/searchParametersList';
import { PriceCheck } from '../../classes/PriceCheck';
import { CurrencyRates } from '../../classes/CurrencyRates';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ViewChild, Directive, ElementRef, OnDestroy, OnInit, Input } from '@angular/core';
import { element } from 'protractor';

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
  rateInfo: any;
  chosenCurrency: String;
  chosenScheme: String;
  currencyRates: CurrencyRates;

  asosInfosList: ProductInformation[] = [];
  pricesList: PriceCheck[] = [];

  searchParametersList: SearchParameters[] = SearchParametersList;
  index: number;
  pricesIndex: number;
  error: number = 0;
  @ViewChild('currencyDropdown') currencyDropdownElementRef: ElementRef;
  @ViewChild('schemeDropdown') schemeDropdownElementRef: ElementRef;




  constructor(private http: HttpClient) {
    this.asosInfosList = new Array<ProductInformation>();
    this.pricesList = new Array<PriceCheck>();
    this.currencyRates = new CurrencyRates();


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
  calcThePrice(currencyRates : CurrencyRates, localPrice: number, localCurrency:String) {
    
    let priceByChosenCurrency:number;

    if (localCurrency.toUpperCase()=="USD"){
      priceByChosenCurrency = (localPrice / currencyRates.usd.rate);

    }

    else if (localCurrency.toUpperCase()=="GBP"){
      priceByChosenCurrency = (localPrice / currencyRates.gbp.rate);

    }

    else if (localCurrency.toUpperCase()=="EUR"){
      priceByChosenCurrency = (localPrice / currencyRates.eur.rate);

    }

    else if (localCurrency.toUpperCase()=="AUD"){
      priceByChosenCurrency = (localPrice / currencyRates.aud.rate);

    }

    else if (localCurrency.toUpperCase()=="RUB"){
      priceByChosenCurrency = (localPrice / currencyRates.rub.rate);

    }

    else if (localCurrency.toUpperCase()=="ILS"){
      priceByChosenCurrency = (localPrice / currencyRates.ils.rate);

    }

    return priceByChosenCurrency;
    
  }

  callPriceRate(chosenCurrency: String) {
    this.http.get('http://www.floatrates.com/daily/' + chosenCurrency + '.json')
      .subscribe(
      data => {
        this.rateInfo = data;
        this.currencyRates = this.rateInfo;
      },
    );
  }

  callEveryAsos(index: number, store: String, lang: String, sizeSchema: String, currency: String, country: String,chosenCurrency:String) {
    if (this.chosenScheme == "EU") {
      if (store == "DE" || store == "ES" || store == "FR") {
        this.http.get('http://api.asos.com/product/catalogue/v2/products/' + this.productNumber + '?store=' + store + '&lang=' + lang + '&sizeSchema=' + sizeSchema + '&currency=' + currency)
          .subscribe(
          data => {
            this.asosInfo = data;
            this.asosInfosList[index] = this.asosInfo;
            if(chosenCurrency == currency){
              this.asosInfosList[index].priceByChosenCurrency = this.asosInfosList[index].price.current.value;
              }
            this.asosInfosList[index].country = country;
            this.pricesList[index].localPrice = this.asosInfosList[index].price.current.text;
            this.pricesList[index].localCurrency = currency;
            if (this.asosInfosList[index].price.currency == this.chosenCurrency) {
              this.asosInfosList[index].priceByChosenCurrency = this.asosInfosList[index].price.current.value;

            }
          },
        );
      }
      else {
        this.http.get('http://api.asos.com/product/catalogue/v2/products/' + this.productNumber + '?store=' + store + '&lang=' + lang + '&sizeSchema=' + this.chosenScheme + '&currency=' + currency)
          .subscribe(
          data => {
            this.asosInfo = data;
            this.asosInfosList[index] = this.asosInfo;
            if(chosenCurrency == currency){
              this.asosInfosList[index].priceByChosenCurrency = this.asosInfosList[index].price.current.value;
              }

              else {
                this.asosInfosList[index].priceByChosenCurrency=this.calcThePrice(this.currencyRates, this.asosInfosList[index].price.current.value, currency)
              }
              
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
          if(this.chosenCurrency == currency){
            this.asosInfosList[index].priceByChosenCurrency = this.asosInfosList[index].price.current.value;
            }
            else {
              this.asosInfosList[index].priceByChosenCurrency=this.calcThePrice(this.currencyRates, this.asosInfosList[index].price.current.value, currency)
            }
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
          if(this.chosenCurrency == currency){
          this.asosInfosList[index].priceByChosenCurrency = this.asosInfosList[index].price.current.value;
          }
          else {
            this.asosInfosList[index].priceByChosenCurrency=this.calcThePrice(this.currencyRates, this.asosInfosList[index].price.current.value, currency)
          }
          this.asosInfosList[index].country = country;
          this.pricesList[index].localPrice = this.asosInfosList[index].price.current.text;
          this.pricesList[index].localCurrency = currency;

          
        },

      );
    }
    return this.pricesList;

  }

  SubmitUrl() {
    if (!this.chosenCurrency) {
      this.chosenCurrency = "GBP";
    }
    this.callPriceRate(this.chosenCurrency);
    this.asosInfosList = new Array;
    this.indexOfPrd = this.inputUrl.indexOf("prd/");
    this.productNumber = this.inputUrl.slice(this.indexOfPrd + 4, this.indexOfPrd + 11);
    this.index = -1;
    this.pricesIndex = -1;
    this.searchParametersList.forEach(element => {
      this.index = this.index + 1;
      this.callEveryAsos(this.index, element.store, element.lang, element.sizeSchema, element.currency, element.country,this.chosenCurrency);

    });
  }


  
}
