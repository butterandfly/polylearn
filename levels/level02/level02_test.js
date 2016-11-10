(function() {
  suite('Level 02', function() {
    test('已使用"star-bar"元素', function() {
      let el = document.querySelector('star-bar');

      assert.ok(el);
      assert.equal(el.is, 'star-bar');
    });

    test('span里的文字改为"Bar Bar Star"', function() {
      let el = document.querySelector('star-bar');
      assert.ok(el);

      let spanEl = el.$$('#header>span');
      assert.ok(spanEl);
      assert.equal(spanEl.textContent, 'Bar Bar Star');
    });
  });
})();
