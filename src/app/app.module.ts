import { CadastroComponent } from './views/utils/cadastro/cadastro.component';
import { UtilMetodos } from './_helpers/util-metodos';
import { TratamentoImagem } from './_helpers/tratamento-imagem';
import { MetodosEnuns } from './_helpers/metodos-enuns';
import { InterceptadorErros } from './_helpers/interceptador-erros';
import { LoginComponent } from './views/utils/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxMaskModule, IConfig } from 'ngx-mask'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SidebarModule } from 'ng-sidebar';


const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(maskConfig),
    SidebarModule.forRoot()
  ],
  providers: [
    MetodosEnuns,
    TratamentoImagem,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptadorErros, multi: true },
    UtilMetodos
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
