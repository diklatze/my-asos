import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PageHeader } from '../components/pageHeader/pageHeader';
import { PageFooter } from '../components/pageFooter/pageFooter';
import { MainSegmentComponent } from '../components/main-segment/main-segment.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HomePage } from '../pages/home/home';
import { AppComponent } from './app.component';
import { AsosPriceSegmantComponent } from '../components/asos-price-segmant/asos-price-segmant.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    PageHeader,
    MainSegmentComponent,
    PageFooter,
    AsosPriceSegmantComponent,
    
  ],
  imports: [
    BrowserModule,HttpClientModule, FormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    AppComponent,
    PageHeader,
    PageFooter,
    HomePage
  ],
})
export class AppModule { }
