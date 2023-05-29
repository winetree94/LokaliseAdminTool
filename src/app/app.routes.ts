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
    path: '**',
    redirectTo: '',
  },
];
