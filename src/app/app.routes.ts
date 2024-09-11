import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { PageLayoutComponent } from './common-ui/page-layout/page-layout.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { canActivateAuth } from "./data/services/access.guard";

export const routes: Routes = [
    {
        path: '', component: PageLayoutComponent, children: [
            { path: '', component: ListPageComponent, title: 'Главная' },
            { path: 'users', component: UsersPageComponent, canActivate: [canActivateAuth], title: 'Пользователи' },
            { path: 'user/:id', component: UserPageComponent, canActivate: [canActivateAuth], title: 'Профиль пользователя' },
            { path: 'login', component: LoginPageComponent, title: 'Login' },
            { path: '**', redirectTo: '' }
        ]
    },
]

