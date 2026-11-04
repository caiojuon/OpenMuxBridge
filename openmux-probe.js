// OpenMux Probe v2. Sem async/await (sandbox do Nuvio so aceita Promises).
// Sempre devolve 2 fontes: (1) fixa, prova que o plugin RODOU; (2) resultado do teste com o Bridge.
function getStreams(tmdbId, mediaType, seasonNum, episodeNum) {
  var base = {
    name: 'OpenMux',
    quality: '1080p',
    provider: 'openmux-probe',
    headers: {}
  };
  var fixed = {
    name: base.name,
    title: '[1/2] PLUGIN RODOU (tmdb ' + tmdbId + ')',
    url: 'https://example.com/openmux-teste.mp4',
    quality: base.quality,
    provider: base.provider,
    headers: {}
  };
  var timeout = new Promise(function (resolve, reject) {
    setTimeout(function () { reject(new Error('timeout 5s')); }, 5000);
  });
  var call = fetch('http://127.0.0.1:8765/health')
    .then(function (r) { return r.json(); })
    .then(function (j) { return 'BRIDGE ALCANCADO v' + j.version; });
  return Promise.race([call, timeout])
    .catch(function (e) { return 'BRIDGE FALHOU: ' + String((e && e.message) ? e.message : e); })
    .then(function (msg) {
      return [fixed, {
        name: base.name,
        title: '[2/2] ' + msg,
        url: 'https://example.com/openmux-teste2.mp4',
        quality: base.quality,
        provider: base.provider,
        headers: {}
      }];
    });
}
module.exports = { getStreams };
