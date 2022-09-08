import { AvailableLanguagesComponent, LanguagesComponent } from './components';
import { RegexFilterPipe } from './pipes';

export * from './language.module';
export * from './components';

export const Components = [
  AvailableLanguagesComponent,
  LanguagesComponent,
];

export const Pipes = [
  RegexFilterPipe,
];
