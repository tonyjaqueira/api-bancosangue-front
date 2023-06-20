import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuLeftComponent } from './menu-left/menu-left.component';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [HeaderComponent,
                 FooterComponent,
                 MenuLeftComponent],
  imports: [
    CommonModule,
    DialogModule,
    ConfirmDialogModule,
    ButtonModule,
    RouterModule,
    NgxSpinnerModule,
  ],
  exports: [HeaderComponent,
            FooterComponent,
            MenuLeftComponent],
  providers: []
})
export class LayoutModule { }
