import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { GeneralState } from './state/general.state';
import { environment } from './environments/environment';
import { TodoViewComponent } from './components/todo-view/todo-view.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { ru_RU } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import ru from '@angular/common/locales/ru';
import { FormsModule } from '@angular/forms';
import { TodoPipe } from './pipes/todo.pipe';

registerLocaleData(ru);

@NgModule({
  declarations: [
    AppComponent,
    TodoViewComponent,
    TodoPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([GeneralState], {
      developmentMode: !environment.production,
    }),
    NzSelectModule,
    NzSpinModule,
    FormsModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: ru_RU }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
