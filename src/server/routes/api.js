const {Router} = require(`express`);
const multer = require(`multer`);

const {standardHandler} = require(`../middleware`);
const offerController = require(`../controllers/offers`);

const upload = multer({storage: multer.memoryStorage()});

const router = new Router();

router.get(`/offers`, standardHandler(offerController.getOffers));
router.get(`/offers/:date`, standardHandler(offerController.getOfferByDate));
router.post(`/offers`, upload.single(`avatar`), standardHandler(offerController.addOffer));

module.exports = {router};
