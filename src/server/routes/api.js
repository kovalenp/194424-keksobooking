const {Router} = require(`express`);
const bodyParser = require(`body-parser`);

const {handleAsyncRequest} = require(`../middleware`);
const offerController = require(`../controllers/offers`);

const router = new Router();

router.use(bodyParser.json());
router.get(`/offers`, handleAsyncRequest(async (req, res) => res.send(await offerController.getOffers())));

module.exports = {router};
