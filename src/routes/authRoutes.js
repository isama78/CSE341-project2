import { Router } from 'express';
import passport from '../config/passport.js';

const router = Router();

router.get('/login', (req, res, next) => {
    /* #swagger.ignore = true */
    passport.authenticate('github', { scope: ['user:email'] })(req, res, next);
});


router.get('/github/callback', (req, res, next) => {
  // #swagger.ignore = true
  passport.authenticate('github', { 
    successRedirect: '/', 
    failureRedirect: '/login' 
  })
  (req, res, next);
});

router.get('/logout', (req, res, next) => {
  // #swagger.ignore = true
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
});

export default router;