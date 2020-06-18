(function(exports) {
  var enabled;
  var value;
  function enable(enbled) {
    enabled = enbled;
  }

  function isEnabled() {
    return enabled;
  }
  // value must be a decimal between 0 - 1 (inclusive)
  function setValue(val) {
    if (val >= 0 && val <= 1) {
      value = val;
    } else {
      throw new Error('value must be a decimal between 0 - 1 (inclusive)');
    }
  }

  function getValue() {
    return value;
  }

  function getDisabledCSSStyle() {
    if (!enabled) {
      return 'opacity: 0.5; cursor: not-allowed;';
    }
    return '';
  }

  exports.DiffOverlaySlider = {
    getDisabledCSSStyle: getDisabledCSSStyle,
    enable: enable,
    isEnabled: isEnabled,
    setValue: setValue,
    getValue: getValue,
  };
})(window);
