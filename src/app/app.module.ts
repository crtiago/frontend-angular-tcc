import { ConfirmacaoDialogoService } from './views/utils/caixa-dialogo/confirmacao-dialogo.service';
import { DeactivateGuardService } from './_servicos/rota/deactivate-guard.service';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CountdownModule } from 'ngx-countdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { KatexModule } from 'ng-katex';
import { LazyLoadImageModule } from 'ng-lazyload-image';


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
    NgxMaskModule.forRoot(maskConfig),
    SidebarModule.forRoot(),
    BrowserAnimationsModule,
    CountdownModule,
    NgbModule,
    KatexModule,
    LazyLoadImageModule
  ],
  providers: [
    MetodosEnuns,
    TratamentoImagem,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptadorErros, multi: true },
    UtilMetodos,
    DeactivateGuardService,
    ConfirmacaoDialogoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
