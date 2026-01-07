import { Routes } from '@angular/router';
import { UserList } from './user-list/user-list';
import { UserDetails } from './user-details/user-details';
import { UserContacts } from './user-contacts/user-contacts';

export const routes: Routes = [
  {
    path: '',
    component: UserList,
  },
  {
    path: 'details',
    component: UserDetails,
  },
  {
    path: 'contacts',
    component: UserContacts,
  },
];
