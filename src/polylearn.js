(function() {
  let testTemplate = `
  <head>
      <base href="http://localhost:8001/">
      <link rel="stylesheet" href="./bower_components/mocha/mocha.css" />
  </head>
  <body>
      {{{preview}}}
      <h2>测试结果</h2>
      <div id="mocha"></div> <!-- 1 -->
      <script src="./bower_components/mocha/mocha.js"></script>
      <script src="./bower_components/chai/chai.js"></script>
      <script>
          mocha.ui('tdd'); // 2
          mocha.reporter('html'); // 3
          window.assert = chai.assert; // 4
      </script>
      <script src="/levels/{{{level}}}/{{{level}}}_test.js"></script>
  </body>
  `;

  let previewTemplate = `
  <head>
    <base href="http://localhost:8001/">
  </head>
  <body>
      {{{preview}}}
  </body>
  `;

  /**
   * 创建预览并运行测试的iFrame。
   * @param {string} previewHtml 预览内容
   * @param {string} level 关卡
   * @return {IFrameElement} iframe
   */
  function createTestIframe(previewHtml, level) {
    let iframe = document.createElement('iframe');
    let html = testTemplate.replace('{{{preview}}}', previewHtml);
    html = html.replace(new RegExp('{{{level}}}', 'g'), level);
    iframe.src = 'data:text/html;charset=utf-8,' + encodeURI(html);
    return iframe;
  }

  /**
   * 创建预览iFrame。
   * @param {string} previewHtml 预览内容
   * @return {IFrameElement} iframe
   */
  function createPreviewIframe(previewHtml) {
    let iframe = document.createElement('iframe');
    let html = previewTemplate.replace('{{{preview}}}', previewHtml);
    iframe.src = 'data:text/html;charset=utf-8,' + encodeURI(html);
    return iframe;
  }

  window.Polylearn = {
    createTestIframe: createTestIframe,
    createPreviewIframe: createPreviewIframe
  };
})();
