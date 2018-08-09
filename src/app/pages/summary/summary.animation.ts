import { trigger, transition } from '@angular/animations';

export const pageSwitchTransition = trigger('pageSwitchTransition', [
  transition(':enter')
]);
