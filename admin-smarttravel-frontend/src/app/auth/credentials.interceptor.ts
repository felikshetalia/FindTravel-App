import { HttpInterceptorFn } from '@angular/common/http';

export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
  const authedRequest = req.clone({
    withCredentials: true,
  });

  return next(authedRequest);
};
