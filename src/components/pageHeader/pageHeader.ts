import { Component } from '@angular/core';
import { ViewChild, Directive, ElementRef, OnDestroy, OnInit, Input } from '@angular/core';
//import { NavController } from 'ionic-angular';
declare var $: any


@Component({
  selector: 'page-header',
  templateUrl: 'pageHeader.html',
  styles: [
    `body {
      background-color: #FFFFFF;
    }`,

    `.ui.menu .item img.logo {
      margin-right: 1.5em;
    }`,

    `.main.container {
      margin-top: 7em;
    }`,

    ` .wireframe {
      margin-top: 2em;
    }`,

    `.ui.footer.segment {
      margin: 5em 0em 0em;
      padding: 0em 0em;`,
  ]
})
export class PageHeader implements OnInit {




  constructor() { }


  ngOnInit() {
   



  }

}
