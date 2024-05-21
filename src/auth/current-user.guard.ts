import { AuthGuard } from '@nestjs/passport';

export class CurrentUserGuard extends AuthGuard('jwt') {
  handleRequest(error: any, user: any) {
    if (user) return user;
    return null;
  }
}
