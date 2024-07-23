module.exports = function loadScriptPromised (src, attrs) {
  var doc = document
  var tag = 'script'
  var firstScript
  var el
  return new Promise(function (resolve, reject) {
    el = doc.createElement(tag)
    firstScript = doc.getElementsByTagName(tag)[0]
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        if (key.startsWith('data-')) {
          el.dataset[key.slice(5)] = attrs[key]
        } else {
          el[key] = attrs[key]
        }
      })
    }
    el.async = 1
    el.src = src
    el.onload = function () { resolve() }
    el.onerror = function () {
      reject(new Error('failed to load: ' + src))
    }
    firstScript.parentNode.insertBefore(el, firstScript)
  })
}
