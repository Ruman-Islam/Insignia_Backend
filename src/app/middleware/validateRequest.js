const validateRequest = (schema) => async (req, res, next) => {
  const { ...data } = req.body;

  try {
    await schema.parseAsync({
      body: data, // Passing for validations if body & body's schema exists
      query: req.query, // Passing for validations if query & query's schema exists
      params: req.params, // Passing for validations if params & params's schema exists
      cookies: req.cookies, // Passing for validations if cookies & cookies's schema exists
    });

    // If validation succeeds, proceed to the next middleware or route handler
    return next();
  } catch (error) {
    // If validation fails, pass the error to the error handling middleware
    return next(error);
  }
};

export default validateRequest;
