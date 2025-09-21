
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 611, hash: 'cfed4c769dffe208bcb2a1260ae11fdbd9133a93522a04351438fb9d6d25e69f', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1013, hash: 'debb924af63f749aab2222f5722a15a9257ff82691955a6cedb1f7e6d54b5257', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 21751, hash: 'ef2328985d7ed31adf6512b30635c0b9efe56a900cc99ace2a4c14cd42aa98c6', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-CLAWD6U6.css': {size: 319, hash: 'CrDNxkHN460', text: () => import('./assets-chunks/styles-CLAWD6U6_css.mjs').then(m => m.default)}
  },
};
