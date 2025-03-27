export const authRole = async (req, res, next) => {
  try {
    if (req.user?.role !== "admin") {
      return res.status(req.user ? 403 : 401).json({
        success: false,
        message: req.user ? "Forbidden" : "Unauthorized",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
