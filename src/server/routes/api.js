const {Router} = require(`express`);
const multer = require(`multer`);

const schemas = require(`../validation/schemas/offersSchema`);

const {standardHandler, validateReqQueryParams} = require(`../middleware`);
const offerController = require(`../controllers/offers`);

const upload = multer({storage: multer.memoryStorage()});
const router = new Router();

router.get(`/offers`, validateReqQueryParams(schemas.getOffersSchema), standardHandler(offerController.getOffers));
router.get(`/offers/:date`, standardHandler(offerController.getOfferByDate));
router.post(`/offers`, upload.single(`avatar`), standardHandler(offerController.addOffer));

module.exports = {router};
