import { Router } from 'express';
import passport from '../config/passport.js';

const router = Router();

// Login
router.get('/login', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback', (req, res, next) => {
  passport.authenticate('github', { 
    successRedirect: '/', 
    failureRedirect: '/login' 
  })
  (req, res, next);
});

// Logout
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
});

export default router;