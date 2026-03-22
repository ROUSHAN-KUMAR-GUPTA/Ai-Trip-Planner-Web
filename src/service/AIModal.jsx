const API_KEY = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;

export const generateTravelPlan = async (prompt, saveTripCallback) => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!data?.candidates) {
      throw new Error("Failed to get valid AI response");
    }

    const output = data.candidates[0].content.parts[0].text;

    // Extract JSON safely
    const jsonStart = output.indexOf('{');
    const jsonEnd = output.lastIndexOf('}');
    const jsonString = output.slice(jsonStart, jsonEnd + 1);

    const parsed = JSON.parse(jsonString);

    const transformed = {
      hotels: parsed.hotels.map(hotel => ({
        hotelName: hotel.hotelName,
        geoCoordinates: hotel.geoCoordinates,
        rating: hotel.rating,
        description: hotel.description,
        hotelImageUrl: hotel.hotelImageUrl,
        hotelAddress: hotel.hotelAddress,
        price: hotel.price,
      })),

      itinerary: parsed.itinerary.map(day => ({
        day: day.day,
        plan: day.plan.map(plans => ({
          placeName: plans.placeName,
          placeDetails: plans.placeDetails,
          coordinates: plans.coordinates,
          imageUrl: plans.imageUrl,
          time: plans.time,
          timeToTravel: plans.timeToTravel,
          ticketPricing: plans.ticketPricing,
        })),
      })),

      bestTimeToVisitOverall: parsed.bestTimeToVisitOverall,
    };

    console.log("✅ Transformed Output:", JSON.stringify(transformed, null, 2));

    saveTripCallback(JSON.stringify(transformed, null, 2));

  } catch (err) {
    console.error("❌ Error:", err);
    console.warn("🪵 Raw AI response:\n", err);
  }
};
