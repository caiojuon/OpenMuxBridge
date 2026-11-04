// OpenMux Probe: so testa se o Nuvio consegue chamar o Bridge local.
// Sem async/await (o sandbox do Nuvio so aceita Promises).
function getStreams(tmdbId, mediaType, seasonNum, episodeNum) {
  return fetch('http://127.0.0.1:8765/health')
    .then(function (r) { return r.json(); })
    .then(function (j) {
      return [{
        name: 'OpenMux',
        title: 'TESTE OK - Bridge alcancado (v' + j.version + ')',
        url: 'http://127.0.0.1:8765/health',
        quality: 'Teste',
        provider: 'openmux-probe'
      }];
    })
    .catch(function (e) {
      return [{
        name: 'OpenMux',
        title: 'TESTE FALHOU - ' + String((e && e.message) ? e.message : e),
        url: 'http://127.0.0.1:8765/falhou',
        quality: 'Teste',
        provider: 'openmux-probe'
      }];
    });
}
module.exports = { getStreams };
