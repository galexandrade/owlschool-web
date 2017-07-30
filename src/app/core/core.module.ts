import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { provideAuth, AuthHttp, AuthConfig } from 'angular2-jwt';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { PublicAccountService } from './public-account.service';
import { ApiHttpService } from './api-http.service';
import { ParameterService } from './parameter.service';

import { SchoolService } from '../services/school.service';
import { StudentService } from '../services/student.service';
import { StaffService } from '../services/staff.service';
import { ParentService } from '../services/parent.service';
import { MatterService } from '../services/matter.service';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp( new AuthConfig({}), http, options);
}

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [ Http, RequestOptions ]
    },
    AuthService,
    AuthGuard,
    PublicAccountService,
    ApiHttpService,
    ParameterService,
    SchoolService,
    StudentService,
    StaffService,
    ParentService,
    MatterService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if(parentModule){
      throw new Error("CoreModule is already loaded. Import it in the AppModule only");
    }
  }
}
