import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { HomePage } from './home';
import { SwingModule } from 'angular2-swing';

@NgModule({
    declarations: [
        HomePage
    ],
    imports: [
        SwingModule,
        IonicPageModule.forChild(HomePage)
    ],
    exports: [
        HomePage
    ]
})
export class HomePageModule { }