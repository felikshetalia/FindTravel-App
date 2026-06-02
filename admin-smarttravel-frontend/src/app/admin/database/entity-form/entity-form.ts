import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-entity-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './entity-form.html',
  styleUrl: './entity-form.scss',
})
export class EntityFormComponent implements OnInit {
  private _formBuilder = inject(FormBuilder);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);

  form!: FormGroup;
  entityName = '';
  isEditMode = false;
  itemId: string | null = null;

  // Field configuration for each entity type
  fieldConfigs: { [key: string]: FieldConfig[] } = {
    accommodations: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'costPerNight', label: 'Cost Per Night', type: 'number', required: true },
      { name: 'currency', label: 'Currency', type: 'text', required: true },
      { name: 'nights', label: 'Number of Nights', type: 'number', required: true },
      { name: 'addressId', label: 'Address ID', type: 'text', required: true },
    ],
    flights: [
      { name: 'airlineName', label: 'Airline Name', type: 'text', required: true },
      { name: 'flightNumber', label: 'Flight Number', type: 'text', required: true },
      { name: 'fromIataCode', label: 'From Airport (IATA)', type: 'text', required: true },
      { name: 'toIataCode', label: 'To Airport (IATA)', type: 'text', required: true },
      { name: 'departureTime', label: 'Departure Time', type: 'datetime-local', required: true },
      { name: 'arrivalTime', label: 'Arrival Time', type: 'datetime-local', required: true },
      { name: 'price', label: 'Price', type: 'number', required: true },
      { name: 'currency', label: 'Currency', type: 'text', required: true },
    ],
    offers: [
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'price', label: 'Price', type: 'number', required: true },
      { name: 'currency', label: 'Currency', type: 'text', required: true },
    ],
    locations: [
      { name: 'city', label: 'City', type: 'text', required: true },
      { name: 'state', label: 'State', type: 'text', required: false },
      { name: 'country', label: 'Country', type: 'text', required: true },
    ],
    airports: [
      { name: 'iataCode', label: 'IATA Code', type: 'text', required: true },
      { name: 'name', label: 'Airport Name', type: 'text', required: true },
    ],
  };

  ngOnInit() {
    this._route.paramMap.subscribe((params) => {
      this.itemId = params.get('id');
      this.isEditMode = !!this.itemId;

      // Extract entity name from URL (e.g., 'offers' from '/admin/database/offers/add')
      const urlSegments = this._router.url.split('/');
      this.entityName = urlSegments[3]; // 'offers', 'flights', 'accommodations', etc.

      this.initializeForm();
    });
  }

  private initializeForm() {
    const fields = this.fieldConfigs[this.entityName] || [];
    const formControls: { [key: string]: any } = {};

    fields.forEach((field) => {
      const validators = field.required ? [Validators.required] : [];
      if (field.type === 'number') {
        validators.push(Validators.pattern(/^\d+(\.\d+)?$/));
      }
      formControls[field.name] = ['', validators];
    });

    this.form = this._formBuilder.group(formControls);

    // TODO: If in edit mode, load the entity data and populate the form
    // this.loadEntityData(this.itemId);
  }

  get fields(): FieldConfig[] {
    return this.fieldConfigs[this.entityName] || [];
  }

  get formattedTitle(): string {
    const action = this.isEditMode ? 'Edit' : 'Add new';
    const singular = this.entityName.slice(0, -1); // Remove 's' for singular form
    return `${action} {{ ${singular} }}`;
  }

  onSubmit() {
    if (this.form.valid) {
      // TODO: Call API to save the entity
      console.log('Form submitted:', this.form.value);

      // Redirect back to the table
      this._router.navigate([`/admin/database/${this.entityName}`]);
    }
  }

  onCancel() {
    // Redirect back to the table
    this._router.navigate([`/admin/database/${this.entityName}`]);
  }
}

interface FieldConfig {
  name: string;
  label: string;
  type: string;
  required: boolean;
}
