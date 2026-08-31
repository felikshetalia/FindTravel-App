import { Component, OnInit, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

interface SelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-entity-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './entity-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './entity-form.scss',
})
export class EntityFormComponent implements OnInit {
  private _formBuilder = inject(FormBuilder);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _apiService = inject(ApiService);

  form!: FormGroup;
  entityName = signal<string>('');
  isEditMode = signal<boolean>(false);
  itemId: string | null = null;

  // Dropdown options storage
  dropdownOptions: { [key: string]: SelectOption[] } = {
    airports: [],
    locations: [],
    // addresses: [],
    flights: [],
    accommodations: [],
  };

  // Field configuration for each entity type
  fieldConfigs: { [key: string]: FieldConfig[] } = {
    accommodations: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'costPerNight', label: 'Cost Per Night', type: 'number', required: true },
      { name: 'currency', label: 'Currency', type: 'text', required: true },
      { name: 'nights', label: 'Number of Nights', type: 'number', required: true },
      { name: 'street', label: 'Street', type: 'text', required: true },
      { name: 'houseNumber', label: 'House Number', type: 'text', required: true },
      { name: 'postalCode', label: 'Postal Code', type: 'text', required: true },
      {
        name: 'locationId',
        label: 'Location',
        type: 'select',
        required: true,
        optionSource: 'locations',
      },
    ],
    flights: [
      { name: 'airlineName', label: 'Airline Name', type: 'text', required: true },
      { name: 'flightNumber', label: 'Flight Number', type: 'text', required: true },
      {
        name: 'fromIataCode',
        label: 'From Airport',
        type: 'select',
        required: true,
        optionSource: 'airports',
      },
      {
        name: 'toIataCode',
        label: 'To Airport',
        type: 'select',
        required: true,
        optionSource: 'airports',
      },
      { name: 'departureTime', label: 'Departure Time', type: 'datetime-local', required: true },
      { name: 'arrivalTime', label: 'Arrival Time', type: 'datetime-local', required: true },
      { name: 'price', label: 'Price', type: 'number', required: true },
      { name: 'currency', label: 'Currency', type: 'text', required: true },
    ],
    offers: [
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'fee', label: 'Price', type: 'number', required: true },
      { name: 'currency', label: 'Currency', type: 'text', required: true },
      {
        name: 'locationId',
        label: 'Location',
        type: 'select',
        required: true,
        optionSource: 'locations',
      },
      {
        name: 'outboundFlightId',
        label: 'Outbound Flight',
        type: 'select',
        required: true,
        optionSource: 'flights',
      },
      {
        name: 'returnFlightId',
        label: 'Return Flight',
        type: 'select',
        required: true,
        optionSource: 'flights',
      },
      {
        name: 'accommodationId',
        label: 'Accommodation',
        type: 'select',
        required: true,
        optionSource: 'accommodations',
      },
      { name: 'tags', label: 'Tags (comma separated)', type: 'tags', required: false },
    ],
    locations: [
      { name: 'city', label: 'City', type: 'text', required: true },
      { name: 'state', label: 'State', type: 'text', required: false },
      { name: 'country', label: 'Country', type: 'text', required: true },
    ],
    airports: [
      { name: 'iataCode', label: 'IATA Code', type: 'text', required: true },
      { name: 'name', label: 'Airport Name', type: 'text', required: true },
      {
        name: 'locationId',
        label: 'Location',
        type: 'select',
        required: true,
        optionSource: 'locations',
      },
    ],
    addresses: [
      { name: 'street', label: 'Street', type: 'text', required: true },
      { name: 'houseNumber', label: 'House Number', type: 'text', required: true },
      { name: 'postalCode', label: 'Postal Code', type: 'text', required: true },
      {
        name: 'locationId',
        label: 'Location',
        type: 'select',
        required: true,
        optionSource: 'locations',
      },
    ],
  };

  ngOnInit() {
    this._route.paramMap.subscribe((params) => {
      this.itemId = params.get('id');
      this.isEditMode.set(!!this.itemId);

      // Extract entity name from URL (e.g., 'offers' from '/admin/database/offers/add')
      const urlSegments = this._router.url.split('/');
      this.entityName.set(urlSegments[3]); // 'offers', 'flights', 'accommodations', etc.

      this.initializeForm();
      this.loadDropdownData();
    });
  }

  private initializeForm() {
    const fields = this.fieldConfigs[this.entityName()] || [];
    const formControls: { [key: string]: any } = {};

    fields.forEach((field) => {
      const validators = field.required ? [Validators.required] : [];
      if (field.type === 'number') {
        validators.push(Validators.pattern(/^\d+(\.\d+)?$/));
      }
      formControls[field.name] = ['', validators];
    });

    this.form = this._formBuilder.group(formControls);

    if (this.isEditMode()) {
      const entity = this._route.snapshot.data['entity'];

      if (entity) {
        this.populateForm(entity);
      }
    }
  }

  private populateForm(entity: any) {
    let formData = { ...entity };

    if (this.entityName() === 'accommodations') {
      formData = {
        ...entity,

        street: entity.address?.street,
        houseNumber: entity.address?.houseNumber,
        postalCode: entity.address?.postalCode,

        locationId: entity.address?.locationId ?? entity.location?.id,
      };
    }

    if (this.entityName() === 'airports') {
      formData = {
        ...entity,
        locationId: entity.locationId ?? entity.location?.id,
      };
    }

    if (this.entityName() === 'offers') {
      formData = {
        ...entity,

        locationId: entity.locationId ?? entity.location?.id,

        outboundFlightId: entity.outboundFlightId ?? entity.outboundFlight?.id,

        returnFlightId: entity.returnFlightId ?? entity.returnFlight?.id,

        accommodationId: entity.accommodationId ?? entity.accommodation?.id,

        tags: Array.isArray(entity.tags) ? entity.tags.join(', ') : entity.tags,
      };
    }

    if (this.entityName() === 'flights') {
      formData = {
        ...entity,

        departureTime: this.toDateTimeLocal(entity.departureTime),

        arrivalTime: this.toDateTimeLocal(entity.arrivalTime),
      };
    }

    this.form.patchValue(formData);
  }

  private toDateTimeLocal(value: string | null | undefined): string {
    if (!value) {
      return '';
    }

    const date = new Date(value);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  private loadDropdownData() {
    // Load locations
    this._apiService.getLocations().subscribe((locations) => {
      this.dropdownOptions['locations'] = locations.map((loc) => ({
        value: loc.id,
        label: `${loc.city}, ${loc.state || ''} ${loc.country}`.trim(),
      }));
    });

    // Load airports
    this._apiService.getAirports().subscribe((airports) => {
      this.dropdownOptions['airports'] = airports.map((airport) => ({
        value: airport.iataCode,
        label: `${airport.iataCode} - ${airport.name}`,
      }));
    });

    // Load addresses
    this._apiService.getAddresses().subscribe((addresses) => {
      this.dropdownOptions['addresses'] = addresses.map((addr) => ({
        value: addr.id,
        label: `${addr.street} ${addr.houseNumber}, ${addr.postalCode}`,
      }));
    });

    // Load flights
    this._apiService.getFlights().subscribe((flights) => {
      this.dropdownOptions['flights'] = flights.map((flight) => ({
        value: flight.id,
        label: `${flight.airlineName} ${flight.flightNumber} (${flight.fromIataCode} → ${flight.toIataCode})`,
      }));
    });

    // Load accommodations
    this._apiService.getAccommodations().subscribe((accommodations) => {
      this.dropdownOptions['accommodations'] = accommodations.map((acc) => ({
        value: acc.id,
        label: `${acc.name} - €${acc.costPerNight}/night (${acc.nights} nights)`,
      }));
    });
  }

  get fields(): FieldConfig[] {
    return this.fieldConfigs[this.entityName()] || [];
  }

  get formattedTitle(): string {
    const action = this.isEditMode() ? 'Edit' : 'Add new';
    const singular = this.entityName().slice(0, -1); // Remove 's' for singular form
    return `${action} {{ ${singular} }}`;
  }

  getDropdownOptions(field: FieldConfig): SelectOption[] {
    const optionSource = field.optionSource;
    return this.dropdownOptions[optionSource || ''] || [];
  }

  onSubmit() {
    if (this.form.valid) {
      let formData = { ...this.form.value };
      if ('departureTime' in formData) {
        formData.departureTime = new Date(formData.departureTime).toISOString();
      }

      if ('arrivalTime' in formData) {
        formData.arrivalTime = new Date(formData.arrivalTime).toISOString();
      }

      if ('price' in formData) {
        formData.price = Number(formData.price);
      }
      if ('fee' in formData) {
        formData.fee = Number(formData.fee);
      }
      console.log(formData);
      if ('costPerNight' in formData) {
        formData.costPerNight = Number(formData.costPerNight);
      }

      if ('nights' in formData) {
        formData.nights = Number(formData.nights);
      }
      // Handle tags conversion for offers
      if (this.entityName() === 'offers' && formData.tags) {
        formData.tags = formData.tags
          .split(',')
          .map((tag: string) => tag.trim())
          .filter((tag: string) => tag.length > 0);
      }

      if (this.entityName() === 'accommodations') {
        const addressBody = {
          street: formData.street,
          houseNumber: formData.houseNumber,
          postalCode: formData.postalCode,
          locationId: formData.locationId,
        };
        this._apiService.createEntity<any>('addresses', addressBody).subscribe({
          next: (createdAddress) => {
            const accommodationBody = {
              name: formData.name,
              costPerNight: Number(formData.costPerNight),
              currency: formData.currency,
              nights: Number(formData.nights),
              addressId: createdAddress.id,
            };
            this._apiService.createEntity(this.entityName(), accommodationBody).subscribe({
              next: () => {
                this._router.navigate([`/admin/database/${this.entityName()}`]);
              },
              error: (err) => {
                console.error('Error creating accommodation:', err);
              },
            });
          },
          error: (err) => console.error('Error creating address:', err),
        });
        return;
      }

      // TODO: Call API to save the entity
      this._apiService.createEntity(this.entityName(), formData).subscribe({
        next: () => {
          this._router.navigate([`/admin/database/${this.entityName()}`]);
        },
        error: (err) => {
          console.error(`Error creating ${this.entityName()}`, err);
        },
      });
      console.log('Form submitted:', formData);

      // Redirect back to the table
    }
  }

  onCancel() {
    // Redirect back to the table
    this._router.navigate([`/admin/database/${this.entityName()}`]);
  }
}

interface FieldConfig {
  name: string;
  label: string;
  type: string;
  required: boolean;
  optionSource?: string;
}
