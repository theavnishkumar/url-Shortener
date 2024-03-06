
async function userRequestUrl(req, res, next) {
    if (!req.session.originalUrl && req.url !== '/login') {
        req.session.originalUrl = req.url;
      }

    next();

}

export { userRequestUrl };