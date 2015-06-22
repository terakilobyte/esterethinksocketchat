import express from 'express';
import rethink from '../rethink/rethink';

const router = express.Router();

router.route('/messages')
  .get((req, res, next) => {
    rethink.get('messages', (err, result) => {
      if (err) return next(err);
      return res.json(result);
    });
  });

export default router;
