// GitHub Pages SPA basename fix
// Patches window.history to strip /egp-website prefix for React Router
(function() {
  var base = '/egp-website';
  var originalPushState = history.pushState;
  var originalReplaceState = history.replaceState;
  
  // If we're at /egp-website/ or /egp-website, the React app sees /
  // React Router routes are still /, /platform, /pricing etc.
  // We just need the initial load to work
  
  // Override fetch for any relative API calls
  if (window.location.pathname.indexOf(base) === 0) {
    // We're good - assets load via <base> tag
    // React Router needs to see the path WITHOUT the base prefix
    
    // Create a proxy for location that strips the base
    var realPathname = window.location.pathname.replace(base, '') || '/';
    
    // Patch pushState/replaceState to add base back for the browser
    history.pushState = function(state, title, url) {
      if (url && url.charAt(0) === '/' && url.indexOf(base) !== 0) {
        url = base + url;
      }
      return originalPushState.call(this, state, title, url);
    };
    history.replaceState = function(state, title, url) {
      if (url && url.charAt(0) === '/' && url.indexOf(base) !== 0) {
        url = base + url;
      }
      return originalReplaceState.call(this, state, title, url);
    };
  }
})();
