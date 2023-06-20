import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { authInterceptorProviders } from './security.interceptor';
import { JwtInterceptor, JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CardModule} from 'primeng/card';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    TooltipModule,
    DropdownModule,
    InputMaskModule,
    CurrencyMaskModule,
    MessagesModule,
    MessageModule,
    AppRoutingModule,
    ToastModule,
    ConfirmDialogModule,
    CardModule,
    NgxSpinnerModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [authInterceptorProviders,
             JwtInterceptor,
             AuthGuard,
             JwtHelperService]

})
export class SecurityModule { }
