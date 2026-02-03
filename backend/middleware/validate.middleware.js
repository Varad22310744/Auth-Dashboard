const validate = (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({ message: 'Invalid request body' });
  }
  next();
};

module.exports = validate;
