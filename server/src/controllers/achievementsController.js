import express from 'express';
import achievementService from '../businessLogic/achievementsService.js';

const router = express.Router();

router.get('/', function (req, res) {
  achievementService.getAchievements()
    .then(data => res.json({ data }))
    .catch(err => res.send({ data }))
});

router.get('/:id', function (req, res) {
  achievementService.getAchievementById(req.params.id)
    .then(data => res.json({ data }))
    .catch(err => res.send({ data }))
});

router.post('/', function (req, res) {
  const { achievement } = req.body;
  achievementService.createAchievement(achievement)
    .then((res) => res.send(res))
    .catch((err) => res.send(err))
});

router.delete('/:id', (req, res, next) => {
  achievementService.deleteAchievement(req.params.id)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});

router.put('/:id', (req, res, next) => {
  achievementService.updateAchievement(req.params.id, req.body)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});

export default router;
