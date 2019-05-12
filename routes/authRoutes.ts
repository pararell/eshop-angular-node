import { Router } from 'express';
import * as passport from 'passport';

const authRoutes = Router();

authRoutes.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
authRoutes.get('/google/callback', passport.authenticate('google'), (req, res) => res.redirect('/'));
authRoutes.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});
authRoutes.get('/current_user', (req, res) => (req.user ? res.send(req.user) : res.send({})));

export { authRoutes };
