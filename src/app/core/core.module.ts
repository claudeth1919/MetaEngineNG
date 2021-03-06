import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoadingComponent } from './loading/loading.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RatingModule } from 'ng-starrating';

@NgModule({
  declarations: [LoadingComponent],
  imports: [
    CommonModule,
    MatSliderModule,
    HttpClientModule,
    MatToolbarModule, 
    MatButtonModule, 
    MatSidenavModule, 
    MatIconModule, 
    MatListModule, 
    MatCardModule, 
    MatExpansionModule, 
    MatMenuModule, 
    MatTabsModule, 
    MatSelectModule, 
    MatStepperModule, 
    MatInputModule, 
    MatFormFieldModule, 
    MatDialogModule, 
    MatRadioModule, 
    MatTableModule, 
    MatDatepickerModule, 
    MatCheckboxModule, 
    MatProgressSpinnerModule, 
    MatBadgeModule, 
    MatPaginatorModule, 
    MatTooltipModule, 
    MatChipsModule, 
    MatGridListModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FlexLayoutModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    RatingModule,
  ],
  exports: [
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatExpansionModule,
    MatMenuModule,
    MatTabsModule,
    MatSelectModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatTableModule,
    MatDialogModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatChipsModule,
    MatGridListModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FlexLayoutModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    RatingModule,
  ],
  entryComponents: [
    LoadingComponent,
  ]
})
export class CoreModule { }
