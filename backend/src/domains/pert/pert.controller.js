import { calculatePERT } from "./pert.service.js";

export const getPERTResults = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    console.log(`PERT request for project: ${projectId}`);

    const results = await calculatePERT(projectId);

    res.json({
      success: true,
      data: results,
    });
  } catch (error) {
    console.error("PERT Error:", error.message);
    next(error);
  }
};
