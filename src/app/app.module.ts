import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import enLocale from '@angular/common/locales/en';
import ruLocale from '@angular/common/locales/ru';
import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PostPageComponent } from './post-page/post-page.component';
import { AuthInterceptor } from './shared/auth.interseptor';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { PostComponent } from './shared/components/post/post.component';
import { SharedModule } from './shared/shared.module';

registerLocaleData(enLocale, 'en');

const INTERSEPTOR_PROVIDER: Provider = {
	provide: HTTP_INTERCEPTORS,
	multi: true,
	useClass: AuthInterceptor,
};

@NgModule({
	declarations: [AppComponent, MainLayoutComponent, HomePageComponent, PostPageComponent, PostComponent],
	imports: [BrowserModule, AppRoutingModule, SharedModule, ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })],
	providers: [INTERSEPTOR_PROVIDER],
	bootstrap: [AppComponent],
})
export class AppModule {}
