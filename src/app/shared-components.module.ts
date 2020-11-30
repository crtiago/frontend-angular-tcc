import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConfiguracoesComponent } from "./views/utils/configuracoes/configuracoes.component";
import { SuporteComponent } from "./views/utils/suporte/suporte.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

const maskConfig: Partial<IConfig> = {
  validation: false,
};


@NgModule({
  imports: [NgxMaskModule.forRoot(maskConfig), FormsModule, ReactiveFormsModule, CommonModule],
  declarations: [ConfiguracoesComponent, SuporteComponent],
  exports: [ConfiguracoesComponent, SuporteComponent]
})
export class SharedComponentsModule { }
