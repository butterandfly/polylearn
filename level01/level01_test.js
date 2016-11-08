(function() {
  suite('Level 01', function() {
    test('已创建"fish-fire"元素', function() {
      assert.ok(document.querySelector('fish-fire'));
    });

    test('"fish-fire"是由polymer创建的自定义元素', function() {
      let el = document.querySelector('fish-fire');
      assert.ok(el);
      assert.equal(el.is, 'fish-fire');
    });
  });

  mocha.run();
})();
