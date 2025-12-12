import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconRegistryComponent } from './icon-registry.component';
import { IconComponent } from './icon.component';



@NgModule({
  declarations: [
    IconRegistryComponent,

  ],
  imports: [
    IconComponent,
    CommonModule
  ],
  exports: [IconRegistryComponent, IconComponent]
})
export class IconsModule { }
