// Self-hosted out of /public. These used to load from a CloudFront distribution
// (d2xsxph8kpxj0f) that now returns 403 AccessDenied on every object, which is
// how the logo and the hero art disappeared. Keep new imagery in /public.
export const IMAGES = {
  // Studio Dorion — Park Slope brownstone
  studioDorionBrownstone: "/studio-dorion-park-slope-brownstone-email.jpg",
  // Alison Rose NY — kitchen detail (photo by Reid Rolls)
  alisonRoseKitchen:      "/alison-rose-kitchen.jpg",
  // Nick Olsen — colorful living room (photo by Reid Rolls)
  nickOlsonReidRolls:     "/nick-olsen-reid-rolls.webp",
  // Sarah Bartholomew — living room (photo by Melanie Acevedo)
  sarahBartholomewLivingRoom: "/sarah-bartholomew-living-room.jpg",
};
