import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

// Custom modules
import { MaterialModule } from './_shared/modules/material.module';
import { NgxMaskModule, IConfig } from 'ngx-mask'

// interceptor for the apis
import { HttpConfigInterceptor } from './_shared/httpconfig.interceptor';

// import components
import { YearAndMakeComponent } from './dealer/year-and-make/year-and-make.component';
import { ModelAndStyleComponent } from './dealer/model-and-style/model-and-style.component';
import { EquipementComponent } from './dealer/equipement/equipment.component';
import { AboutGalvesComponent } from './_shared/modals/about-galves/about-galves.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowDetailsComponent } from './dealer/show-details/show-details.component';
import { ShowMessageComponent } from './_shared/modals/show-message/show-message.component';

const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};

@NgModule({
  declarations: [
    AppComponent,
    YearAndMakeComponent,
    ModelAndStyleComponent,
    EquipementComponent,
    AboutGalvesComponent,
    ShowDetailsComponent,
    ShowMessageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(maskConfigFunction),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
