import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { EditorCoreModule } from './editor-core/editor-core.module';
import { SettingsModule } from './settings/settings.module';
import { EditorElementsModule } from './editor-elements/editor-elements.module';
import { GleisbildModule } from './gleisbild/gleisbild.module';
import { EditorFeaturesModule } from './editor-features/editor-features.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    EditorCoreModule,
    GleisbildModule,
    EditorElementsModule,
    EditorFeaturesModule,
    SettingsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
