import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ApiService } from '../../services/api.service';

export const entityEditResolver: ResolveFn<unknown> = (route) => {
  const apiService = inject(ApiService);

  const id = route.paramMap.get('id');
  const entityType = route.data['entityType'] as string;

  if (!id) throw new Error('Entity ID is missing');

  return apiService.getEntityById(entityType, id);
};
