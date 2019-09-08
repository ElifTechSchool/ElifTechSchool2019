import express from 'express';
import achievementService from '../businessLogic/achievementsService.js';

const router = express.Router();

router.get('/', function (req, res) {
  achievementService.getAchievements()
    .then((res) => res.send(res))
    .catch((err) => res.send(err))
})

export default router;
