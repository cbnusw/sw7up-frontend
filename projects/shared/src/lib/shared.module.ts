import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { SharedConfig } from './shared-config';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
  ],
  exports: [],
  providers: [
    { provide: COMPOSITION_BUFFER_MODE, useValue: false },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ]
})
export class SharedModule {

  constructor(@Optional() @SkipSelf() parentModule: SharedModule) {
    if (parentModule) {
      throw new Error('Import only in AppModule');
    }
  }

  static forRoot(config: SharedConfig): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        { provide: SharedConfig, useValue: config }
      ]
    };
  }
}
