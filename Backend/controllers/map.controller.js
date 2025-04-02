import {
  getAddressCoordinate,
  getDistanceTime,
  getAutoCompleteSuggestions,
} from "../services/maps.service.js";

export const getCoordinate = async (req, res, next) => {
  const { address } = req.body;
  try {
    const coordinates = await getAddressCoordinate(address);
    res.status(200).json({ coordinates });
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: error.message });
  }
};

export const getDistanceTimes = async (req, res, next) => {
  const { origin, destination } = req.body;
  try {
    const distanceTime = await getDistanceTime(origin, destination);
    res.status(200).json({ distanceTime });
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: error.message });
  }
};

export const getAutoCompleteSuggestionss = async (req, res, next) => {
  try {
    const { address } = req.query;

    const suggestions = await getAutoCompleteSuggestions(address);

    res.status(200).json({suggestions});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
