const keyStr =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

const triplet = (e1: number, e2: number, e3: number) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63);

export const rgbDataURL = (r: number, g: number, b: number) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

export function getFirstImage(images: { url: string }[]) {
  if (images.length >= 1 && images[0]?.url) {
    return images[0].url;
  }

  return "/images/def_thumb.png";
}

export function getHighestBid(offers: { price: number }[]) {
  if (offers.length >= 1 && offers[0]?.price) {
    return offers[0].price;
  }

  return 0;
}
