import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PageHeader } from '../components/pageHeader/pageHeader';
import { PageFooter } from '../components/pageFooter/pageFooter';
import { HomePage } from '../pages/home/home';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    PageHeader,
    PageFooter
  ],
  imports: [
    BrowserModule
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
