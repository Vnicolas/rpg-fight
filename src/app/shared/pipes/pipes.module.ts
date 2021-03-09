import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { SafeHtmlPipe } from './safeHtml.pipe';

@NgModule({
  declarations: [SafeHtmlPipe],
  imports: [ CommonModule ],
  exports: [ SafeHtmlPipe ]
})

export class PipesModule {}
