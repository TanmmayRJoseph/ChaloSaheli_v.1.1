import axios from "axios";
import Saarthi from "@/models/saarthi";



export async function getAddressCoordinates(
  address: string
): Promise<{ lat: number; lng: number } | null> {
  const apiKey = process.env.GOOGLE_MAP_API;
  const encodedAddress = encodeURIComponent(address);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.status === "OK") {
      const location = data.results[0].geometry.location;
      return { lat: location.lat, lng: location.lng };
    } else {
      console.warn(`Geocoding error for '${address}': ${data.status}`);
      return null; // Return null instead of throwing an error
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return null; // Ensure null is returned on failure
  }
}


export async function getDistanceTime(origin: string, destination: string) {
  const apiKey = process.env.GOOGLE_MAP_API;

  if (!apiKey) {
    throw new Error("Missing Google Maps API Key");
  }

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
    origin
  )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    console.log("Google API Response:", JSON.stringify(data, null, 2)); // Debugging

    if (!data || data.status !== "OK") {
      throw new Error("Invalid response from Google Distance Matrix API");
    }

    const element = data.rows[0]?.elements[0];

    if (!element || element.status !== "OK") {
      console.warn("No valid route found. Using default values.");
      return { distance: 5000, duration: 600 }; // Fallback: 5km, 10 minutes
    }

    return {
      distance: element.distance?.value || 5000, // Default 5km if missing
      duration: element.duration?.value || 600, // Default 10min if missing
    };
  } catch (error) {
    console.error("Error fetching distance/time:", error);
    return { distance: 5000, duration: 600 }; // Return fallback instead of failing
  }
}

export async function getAutoCompleteSuggestions(address: string) {
  if (!address) {
    throw new Error("Address is required");
  }

  const apiKey = process.env.GOOGLE_MAP_API;
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      return response.data.predictions;
    } else {
      throw new Error(`Autocomplete error: ${response.data.status}`);
    }
  } catch (error) {
    console.error("Error fetching autocomplete suggestions:", error);
    throw error;
  }
}

export async function getSaarthiInRadius(
  ltd: number,
  lng: number,
  radius: number
) {
  //radius in km
  const saarthi = await Saarthi.find({
    location: {
      $geoWithin: {
        $centerSphere: [[ltd,lng], radius / 6371],//2km
      },
    },
  });
  return saarthi;
}
