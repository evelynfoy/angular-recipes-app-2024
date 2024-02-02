import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { LoggingService } from './logging.service';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
	],
	imports: [ 
		BrowserModule, 
		AppRoutingModule, 
		HttpClientModule, 
		SharedModule,
		CoreModule,
	],
	// providers: [
	// 	LoggingService
	// ],
	
	bootstrap: [ AppComponent ]
})
export class AppModule {}
