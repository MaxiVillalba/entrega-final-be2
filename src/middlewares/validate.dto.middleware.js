// filepath: src/middlewares/validate.dto.middleware.js
export function validateDto(dto) {
  return (req, res, next) => {
      const { error } = dto.validate(req.body, { abortEarly: false });

      if (error) {
          return res.status(400).json({
              error: "Validation Error",
              details: error.details.map((err) => err.message),
          });
      }

      next();
  };
}