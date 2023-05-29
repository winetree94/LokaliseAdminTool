import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/index/index.component').then((m) => m.IndexComponent),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./pages/settings/settings.component').then(
        (m) => m.SettingsComponent
      ),
  },
  {
    path: 'keys',
    loadComponent: () =>
      import('./pages/keys/keys.component').then((m) => m.KeysComponent),
  },
  {
    path: 'translation',
    loadComponent: () =>
      import('./pages/translation/translation.component').then(
        (m) => m.TranslationComponent
      ),
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./pages/projects/projects.component').then(
        (m) => m.ProjectsComponent
      ),
  },
  {
    path: 'languages',
    loadComponent: () =>
      import('./pages/languages/languages.component').then(
        (m) => m.LanguagesComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
