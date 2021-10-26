import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CoreRoutingModule } from './core-routing.module';
import { AppComponent } from './containers/app/app.component';
import { SharedModule } from '../shared/shared.module';
import { JwtModule, JwtInterceptor } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TokenService } from './services/token.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomepageComponent } from './containers/homepage/homepage.component';
import { ContactpageComponent } from './containers/contactpage/contactpage.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, HomepageComponent, ContactpageComponent],
  imports: [
    SharedModule,
    CoreRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: TokenService.getToken,
        whitelistedDomains: [environment.host]
      }
    }),
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
  ]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('Moduł core jest wczytany');
    }
  }
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule
    };
  }

}
