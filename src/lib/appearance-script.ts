export const STORAGE_KEY = "ika-appearance";
export const DEFAULT_STYLE = "brutal";
export const DEFAULT_PALETTE = "heritage";

/**
 * Inline script for <head>: applies the saved appearance (style + palette + dark mode)
 * before first paint, so there is no flash of the default style.
 * Plain module (no "use client") so the server layout can import the string.
 */
export const appearanceScript = `(function(){try{var a=JSON.parse(localStorage.getItem(${JSON.stringify(
  STORAGE_KEY,
)})||"{}");var r=document.documentElement;r.dataset.style=a.style||"brutal";r.dataset.palette=a.palette||"heritage";if(a.mode==="dark")r.classList.add("dark");}catch(e){document.documentElement.dataset.style="brutal";document.documentElement.dataset.palette="heritage";}})();`;
