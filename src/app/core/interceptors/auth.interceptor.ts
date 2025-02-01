import { HttpInterceptorFn } from '@angular/common/http';
import {environment} from '../../environment/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes(environment.apiUrl)) {
    const modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${environment.apiKey}`,
        'Content-Type': 'application/json',
      }
    });
    return next(modifiedReq);
  }

  return next(req);
};
