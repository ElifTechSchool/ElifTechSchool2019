import express from 'express';
import achievementService from '../businessLogic/achievementsService.js';

const router = express.Router();

router.get('/', function (req, res) {
  achievementService.getAchievements()
    .then(data => res.json({ data }))
    .catch(error => next(error));
});

router.get('/:id', function (req, res) {
  achievementService.getAchievementById(req.params.id)
    .then(data => res.json({ data }))
    .catch(error => next(error));
});

router.post('/', function (req, res) {
  const { achievement } = req.body;
  achievementService.createAchievement(achievement)
    .then((res) => res.send(res))
    .catch((error) => next(error));
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
