import { InterceptadorErros } from './_helpers/interceptador-erros';
import { LoginComponent } from './views/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxMaskModule, IConfig } from 'ngx-mask'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CadastroComponent } from './views/cadastro/cadastro.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(maskConfig)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptadorErros, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
