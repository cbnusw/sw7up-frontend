import { AvailableLanguagesComponent, ProjectLanguagesComponent } from './components';
import { RegexFilterPipe } from './pipes';

export * from './language.module';
export * from './components';

export const Components = [
  AvailableLanguagesComponent,
  ProjectLanguagesComponent,
];

export const Pipes = [
  RegexFilterPipe,
];
