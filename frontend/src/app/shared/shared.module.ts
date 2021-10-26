import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
const MODULES = [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
];
@NgModule({
    imports: [
        ...MODULES
    ],
    exports: [
        ...MODULES
    ]
})
export class SharedModule { }
