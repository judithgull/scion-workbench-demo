import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WorkbenchModule } from '@scion/workbench';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CityProposalProviderDirective } from './proposal/city-proposal-provider.directive';
import { FriendListCardComponent } from './friend-list-card/friend-list-card.component';
import { PersonProposalProviderDirective } from './proposal/person-proposal-provider.directive';
import { PersonPhotographyCardComponent } from './person-photography-card/person-photography-card.component';
import { PersonMapComponent } from './person-map/person-map.component';
import { PersonComponent } from './person/person.component';
import { PersonMapCardComponent } from './person-map-card/person-map-card.component';
import { FormatCityPipe } from './pipe/format-city.pipe';
import { PersonResolvePipe } from './pipe/person-resolve.pipe';
import { PersonListComponent } from './person-list/person-list.component';
import { HeatmapComponent } from './heatmap/heatmap.component';
import { CityService } from './service/city.service';
import { PersonService } from './service/person.service';
import { WidgetModule } from './widget/widget.module';
import { AppRoutingModule } from './app-routing.module';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [
    AppComponent,
    PersonListComponent,
    PersonComponent,
    PersonPhotographyCardComponent,
    PersonMapCardComponent,
    FriendListCardComponent,
    PersonMapComponent,
    CityProposalProviderDirective,
    FormatCityPipe,
    PersonResolvePipe,
    PersonProposalProviderDirective,
    HeatmapComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    WidgetModule,
    WorkbenchModule.forRoot(),
    MatIconModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    OverlayModule,
  ],
  providers: [
    PersonService,
    CityService,
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule {
}
