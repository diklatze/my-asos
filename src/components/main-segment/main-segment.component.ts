import { Component} from '@angular/core';
import { Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { ProductInformation } from '../../classes/productInformation';
import { SearchParameters } from '../../classes/searchParameters';
import { SearchParametersList } from '../../classes/searchParametersList';
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
  chosenCurrency:String;
  chosenScheme:String;

  asosInfosList: ProductInformation[] = [];
  searchParametersList: SearchParameters[] = SearchParametersList;
  index: number;
  error: number = 0;
  @ViewChild('currencyDropdown') currencyDropdownElementRef: ElementRef;
  @ViewChild('schemeDropdown') schemeDropdownElementRef: ElementRef;


 

  constructor(private http: HttpClient) {
    this.asosInfosList = new Array<ProductInformation>();
    // this.asosInfosList[0]= new ProductInformation();
 
   
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


  callEveryAsos(index: number, store: String, lang: String, sizeSchema: String, currency: String, country: String) {
    this.http.get('http://api.asos.com/product/catalogue/v2/products/' + this.productNumber + '?store=' + store + '&lang=' + lang + '&sizeSchema=' + sizeSchema + '&currency=' + currency)
      // .map(res => {
      //   // If request fails, throw an Error that will be caught
      //   // if (res.status < 200 || res.status >= 300) {
      //   //   throw new Error('This request has failed ' + res.status);
      //   // }
      //   // // If everything went fine, return the response
      //   // else {
      //   //   return res.json();
      //   }
      // })
      .subscribe(
        // err => {
        //   this.error = 1;
        // },
      data => {


        this.asosInfo = data;
        this.asosInfosList[index] = this.asosInfo;
        this.asosInfosList[index].country = country;




      },

      );

  }

  SubmitUrl() {
    this.asosInfosList = new Array;
    this.indexOfPrd = this.inputUrl.indexOf("prd/");
    this.productNumber = this.inputUrl.slice(this.indexOfPrd + 4, this.indexOfPrd + 11);
    this.index = -1;
    this.searchParametersList.forEach(element => {
      this.index = this.index + 1;
      this.callEveryAsos(this.index, element.store, element.lang, element.sizeSchema, element.currency, element.country);
    });


  }



}
