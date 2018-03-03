const {Router} = require(`express`);
const bodyParser = require(`body-parser`);

const {standardHandler} = require(`../middleware`);
const offerController = require(`../controllers/offers`);

const router = new Router();

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.get(`/offers`, standardHandler(offerController.getOffers));
router.get(`/offers/:date`, standardHandler(offerController.getOfferByDate));

module.exports = {router};
