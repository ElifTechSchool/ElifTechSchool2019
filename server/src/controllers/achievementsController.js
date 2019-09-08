import express from 'express';
import achievementService from '../businessLogic/achievementsService.js';

const router = express.Router();

router.get('/', function (req, res) {
  achievementService.getAchievements()
    .then((res) =>  res.json(res))
    .catch((err) => res.json(err))
});


router.post('/', function (req, res) {
  const { achievement } = req.body;
  achievementService.createAchievement(achievement)
    .then((res) => res.send(res))
    .catch((err) => res.send(err))
});



export default router;
