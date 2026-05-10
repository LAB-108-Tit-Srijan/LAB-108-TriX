// TriPOV AI Service — Uses Gemini 2.0 Flash (FREE, no login)
// Get your free API key from: https://aistudio.google.com/apikey

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM_PROMPT = `You are TriPOV AI — a premium travel concierge for India. You know EVERYTHING about:
- Navigation, Google Maps directions, distances, travel times
- Currency conversion (1 USD ≈ 85 INR, 1 EUR ≈ 92 INR)
- Costs: hotels, food, transport in every Indian city
- Local dishes, street food, best restaurants
- Hidden gems, trekking, heritage sites, beaches, hill stations
- Weather-based packing lists
- Safety tips, monsoon warnings, altitude sickness, women safety
- Day-by-day itinerary planning with costs
- Trains (IRCTC), buses, flights, cabs, bike rentals
- Budget hostels to luxury resorts

RULES:
- Be concise (under 200 words unless detailed itinerary asked).
- Use a few emojis for visual appeal.
- Always mention costs in ₹ (INR).
- For maps, say: "Search on Google Maps: [place name]"
- Be warm and friendly like a local friend.
- If non-travel question, politely redirect to travel.`;

let conversationHistory = [];

export async function sendMessage(userMessage) {
  // Add user message to history
  conversationHistory.push({
    role: 'user',
    parts: [{ text: userMessage }]
  });

  // Try Gemini API
  if (GEMINI_API_KEY && GEMINI_API_KEY !== 'undefined') {
    try {
      const response = await fetch(GEMINI_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_PROMPT }]
          },
          contents: conversationHistory,
          generationConfig: {
            maxOutputTokens: 600,
            temperature: 0.85,
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (aiText) {
          conversationHistory.push({
            role: 'model',
            parts: [{ text: aiText }]
          });
          return aiText;
        }
      }
      // If response not ok, fall through to fallback
      console.warn('[aiService] Gemini response error:', response.status);
    } catch (err) {
      console.warn('[aiService] Gemini fetch error:', err.message);
    }
  } else {
    console.warn('[aiService] No VITE_GEMINI_API_KEY found. Add it to .env file.');
  }

  // Fallback: smart built-in responses
  const fallback = getFallbackResponse(userMessage);
  conversationHistory.push({ role: 'model', parts: [{ text: fallback }] });
  return fallback;
}

export function resetChat() {
  conversationHistory = [];
}

function getFallbackResponse(q) {
  const query = q.toLowerCase();

  // Currency conversion
  const currMatch = query.match(/(\d+)\s*(usd|dollar|eur|euro|gbp|pound)/i);
  if (currMatch) {
    const amt = parseInt(currMatch[1]);
    const curr = currMatch[2].toLowerCase();
    const rates = { usd: 85, dollar: 85, eur: 92, euro: 92, gbp: 107, pound: 107 };
    const inr = amt * (rates[curr] || 85);
    return `💰 **Currency Conversion**\n\n${amt} ${curr.toUpperCase()} ≈ **₹${inr.toLocaleString()}** INR\n\nRates are approximate. Use Google for live rates!`;
  }

  // Destination-specific
  if (query.includes('manali') || query.includes('himachal'))
    return "🏔️ **Manali, Himachal Pradesh**\n\n• **Best Time:** March-June, Dec-Feb (snow)\n• **Budget:** ₹1,500-3,000/day\n• **Must Visit:** Solang Valley, Old Manali, Jogini Falls, Rohtang Pass\n• **Food:** Siddu, Trout fish, Tibetan momos at Old Manali cafes\n• **Getting There:** Delhi → Manali bus (₹800-1500, 12hrs) or fly to Kullu\n\n📍 Search on Google Maps: Manali, Himachal Pradesh";

  if (query.includes('goa'))
    return "🏖️ **Goa**\n\n• **Best Time:** Nov-Feb\n• **Budget:** ₹2,000-5,000/day\n• **North Goa:** Baga, Anjuna (parties & nightlife)\n• **South Goa:** Palolem, Agonda (peaceful beaches)\n• **Food:** Fish Curry Rice, Bebinca, Prawn Balchão\n• **Transport:** Rent a scooter ₹300-500/day\n\n📍 Search on Google Maps: Palolem Beach, Goa";

  if (query.includes('jaipur') || query.includes('rajasthan'))
    return "🏰 **Jaipur, Rajasthan**\n\n• **Best Time:** Oct-March\n• **Budget:** ₹1,500-4,000/day\n• **Must Visit:** Amber Fort, Hawa Mahal, City Palace, Nahargarh\n• **Food:** Dal Baati Churma, Laal Maas, Pyaaz Kachori at Rawat\n• **Shopping:** Johari Bazaar for gems & textiles\n\n📍 Search on Google Maps: Amber Fort, Jaipur";

  if (query.includes('kerala') || query.includes('munnar') || query.includes('alleppey'))
    return "🌴 **Kerala — God's Own Country**\n\n• **Best Time:** Sep-March\n• **Budget:** ₹2,000-5,000/day\n• **Munnar:** Tea plantations, Eravikulam Park\n• **Alleppey:** Houseboat on backwaters (₹6,000-15,000/night)\n• **Food:** Appam & Stew, Fish Curry, Puttu & Kadala\n• **Tip:** Book houseboat directly for better rates\n\n📍 Search on Google Maps: Alleppey Backwaters";

  if (query.includes('delhi'))
    return "🕌 **Delhi**\n\n• **Must Visit:** Red Fort, Qutub Minar, Humayun's Tomb, Chandni Chowk\n• **Street Food:** Paranthe Wali Gali, Karim's kebabs, Dilli Haat chaat\n• **Budget:** ₹1,500-3,500/day\n• **Transport:** Metro is best (₹20-60), Uber/Ola available\n• **Shopping:** Sarojini Nagar, Janpath Market\n\n📍 Search on Google Maps: Chandni Chowk, Delhi";

  // Category-based
  if (query.includes('budget') || query.includes('cost') || query.includes('price') || query.includes('money') || query.includes('cheap'))
    return "💰 **India Travel Budget Guide**\n\n• **Budget:** ₹1,000-2,000/day (hostels, street food, buses)\n• **Mid-range:** ₹3,000-6,000/day (hotels, restaurants, trains)\n• **Luxury:** ₹10,000+/day (resorts, flights, fine dining)\n\n**Quick Costs:**\n• Hostel bed: ₹400-800\n• Budget hotel: ₹1,000-2,000\n• Street food meal: ₹50-150\n• Restaurant meal: ₹300-800\n• Train (Sleeper): ₹300-700\n• Local auto: ₹30-100\n\nTell me your destination for specific costs!";

  if (query.includes('food') || query.includes('eat') || query.includes('restaurant') || query.includes('dish'))
    return "🍽️ **India's Must-Try Foods**\n\n• **Delhi:** Chole Bhature, Paranthas, Butter Chicken\n• **Mumbai:** Vada Pav, Pav Bhaji, TBSE Rolls\n• **Kolkata:** Kathi Rolls, Rosogolla, Fish Curry\n• **Jaipur:** Dal Baati Churma, Laal Maas\n• **Kerala:** Appam-Stew, Fish Curry, Puttu\n• **Goa:** Vindaloo, Bebinca, Xacuti\n• **Lucknow:** Tunday Kebab, Biryani\n\nWhich city? I'll give detailed food spots! 🤤";

  if (query.includes('safe') || query.includes('danger') || query.includes('emergency') || query.includes('warning'))
    return "⚠️ **India Travel Safety**\n\n**Emergency Numbers:**\n• Police: **112**\n• Ambulance: **108**\n• Women Helpline: **181**\n\n**Tips:**\n• Use Uber/Ola over random taxis\n• Carry digital copies of documents\n• Stay hydrated, carry water purifier\n• Avoid isolated areas at night\n• Bargain at markets (start at 50%)\n• Use Google Maps for navigation\n\nAsk about safety for any specific region!";

  if (query.includes('pack') || query.includes('carry') || query.includes('luggage') || query.includes('clothes'))
    return "🎒 **Packing Essentials for India**\n\n• Comfortable walking shoes\n• Sunscreen SPF 50+ & sunglasses\n• Reusable water bottle + purifier\n• Power bank & universal adaptor\n• Light cotton clothes (India is warm)\n• Rain jacket (if monsoon: Jun-Sep)\n• Warm layers (if mountains)\n• First aid kit + basic medicines\n• Copies of passport & documents\n• Cash + UPI payment app\n\nTell me your destination & month for a custom list!";

  if (query.includes('itinerary') || query.includes('plan') || query.includes('trip') || query.includes('days'))
    return "📅 **Tell me your trip details & I'll plan it!**\n\nI need:\n1. 📍 **Destination** (or region)\n2. 📅 **Number of days**\n3. 💰 **Budget level** (budget/mid/luxury)\n4. 🎯 **Interests** (adventure, culture, food, relaxing)\n\nExample: *\"Plan 5 days in Rajasthan, mid-budget, culture + food\"*\n\nI'll give you a day-by-day plan with costs! 🗺️";

  if (query.includes('train') || query.includes('bus') || query.includes('flight') || query.includes('transport') || query.includes('reach') || query.includes('travel'))
    return "🚆 **India Transport Guide**\n\n• **Trains:** Book on IRCTC (irctc.co.in). Classes: Sleeper (₹300-700), 3AC (₹700-1500), 2AC (₹1200-2500)\n• **Flights:** Use MakeMyTrip, ixigo. Budget airlines: IndiGo, SpiceJet\n• **Buses:** RedBus, KSRTC, HRTC. ₹200-1500 depending on route\n• **Local:** Uber/Ola in cities. Auto-rickshaws for short trips\n• **Bike Rental:** ₹300-800/day in tourist towns\n\nWhere are you going? I'll suggest the best route! 🗺️";

  if (query.includes('map') || query.includes('direction') || query.includes('where') || query.includes('location') || query.includes('near'))
    return "🗺️ **I can help with directions!**\n\nTell me:\n1. Where you **are** (or starting city)\n2. Where you **want to go**\n\nI'll suggest:\n• Best transport option\n• Approximate time & cost\n• Nearby attractions\n\nOr search directly on Google Maps for any place I mention! 📍";

  if (query.includes('hello') || query.includes('hi') || query.includes('hey') || query.includes('namaste'))
    return "Namaste! 🙏\n\nI'm your **TriPOV AI** travel concierge! I can help with:\n\n• 🗺️ Places to visit & directions\n• 💰 Budget planning & currency\n• 🍽️ Food & restaurants\n• 📅 Trip itineraries\n• ⚠️ Safety tips\n• 🚆 Transport options\n\nJust ask me anything about travel in India!";

  // Default
  return "🌏 Great question! I'm your **TriPOV travel concierge**. I can help with:\n\n• 🗺️ **Places:** Hidden gems, must-visit spots\n• 💰 **Budget:** Cost breakdown, currency conversion\n• 🍽️ **Food:** Local dishes, best restaurants\n• 📅 **Itinerary:** Day-by-day travel plans\n• ⚠️ **Safety:** Tips, emergency numbers\n• 🚆 **Transport:** Trains, flights, local cabs\n\nTry asking: *\"Best places in Goa under ₹5000/day\"* or *\"3-day Manali itinerary\"* 🎒";
}
