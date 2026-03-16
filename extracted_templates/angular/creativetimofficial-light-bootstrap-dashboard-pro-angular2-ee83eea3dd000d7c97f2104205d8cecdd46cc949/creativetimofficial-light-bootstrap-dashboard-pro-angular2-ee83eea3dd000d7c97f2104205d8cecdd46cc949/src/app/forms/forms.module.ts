import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EqualValidator } from './equal-validator.directive';
import { LbdModule } from '../lbd/lbd.module';
import { FormsRoutes } from './forms.routing';
import { NouisliderModule } from 'ng2-nouislider';
import { JwBootstrapSwitchNg2Module } from '@servoy/jw-bootstrap-switch-ng2';

import { ExtendedFormsComponent } from './extendedforms/extendedforms.component';
import { RegularFormsComponent } from './regularforms/regularforms.component';
import { ValidationFormsComponent } from './validationforms/validationforms.component';
import { WizardComponent } from './wizard/wizard.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(FormsRoutes),
        FormsModule,
        ReactiveFormsModule,
        NouisliderModule,
        JwBootstrapSwitchNg2Module,
        LbdModule
    ],
    declarations: [
          ExtendedFormsComponent,
          RegularFormsComponent,
          ValidationFormsComponent,
          WizardComponent,
          EqualValidator
    ]
})

export class Forms {}
