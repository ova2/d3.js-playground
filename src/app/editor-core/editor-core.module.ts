import { NgModule } from '@angular/core';
import { EditorCoreComponent } from './editor-core.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    EditorCoreComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EditorCoreComponent
  ]
})
export class EditorCoreModule {
}
