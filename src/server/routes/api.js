const {Router} = require(`express`);
const multer = require(`multer`);

const schemas = require(`../validation/schemas/offersSchema`);

const {standardHandler, validateReqQueryParams, validateReqBodyParams, imageHandler} = require(`../middleware`);
const offerController = require(`../controllers/offers`);

const upload = multer({storage: multer.memoryStorage()});
const router = new Router();

router.use((req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Headers`, `Origin, X-Requested-With, Content-Type, Accept`);
  next();
});

router.get(`/offers`, validateReqQueryParams(schemas.getOffersSchema), standardHandler(offerController.getOffers));
router.get(`/offers/:date`, standardHandler(offerController.getOfferByDate));
router.get(`/offers/:date/avatar`, imageHandler(offerController.getAvatar));
router.post(`/offers`, upload.single(`avatar`), validateReqBodyParams(schemas.postOfferSchema), standardHandler(offerController.addOffer));

module.exports = {router};
