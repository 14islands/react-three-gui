import React, { createContext, useState, useRef, useCallback, useEffect, useContext } from 'react';
import { Canvas as Canvas$1 } from 'react-three-fiber';
import styled from 'styled-components';
import { useSpring, animated, to } from '@react-spring/web';
import { useDrag } from 'react-use-gesture';
import useMeasure from 'react-use-measure';
import { FileLoader } from 'three';
import { ChromePicker, TwitterPicker, SwatchesPicker, SliderPicker, SketchPicker, MaterialPicker, HuePicker, GithubPicker, CompactPicker, CirclePicker, BlockPicker, AlphaPicker } from 'react-color';
import { useSpring as useSpring$1 } from '@react-spring/three';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _taggedTemplateLiteralLoose(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  strings.raw = raw;
  return strings;
}

var ControlsContext = /*#__PURE__*/createContext({
  values: {
    current: /*#__PURE__*/new Map()
  },
  gui: {
    current: /*#__PURE__*/new Map()
  },
  state: {
    current: /*#__PURE__*/new Map()
  },
  controls: [],
  addControl: function addControl(control) {
    return control;
  },
  removeControl: function removeControl() {}
});

var ControlsProvider = function ControlsProvider(_ref) {
  var children = _ref.children;

  var _useState = useState([]),
      controls = _useState[0],
      setControls = _useState[1]; // Persist values between reloads


  var values = useRef(new Map()); // GUI control state setters

  var gui = useRef(new Map()); // useControl state setters

  var state = useRef(new Map());
  var context = {
    values: values,
    gui: gui,
    state: state,
    controls: controls,
    addControl: function addControl(control) {
      var _control$id;

      control.id = (_control$id = control.id) !== null && _control$id !== void 0 ? _control$id : String(Math.random());
      setControls(function (ctrls) {
        return [].concat(ctrls, [control]);
      });
      return control;
    },
    removeControl: function removeControl(ctrl) {
      setControls(function (ctrls) {
        return ctrls.filter(function (c) {
          return c.id !== ctrl.id;
        });
      });
    }
  };
  return React.createElement(ControlsContext.Provider, {
    value: context
  }, children);
};
function withControls(CanvasEl) {
  return function (_ref2) {
    var children = _ref2.children,
        props = _objectWithoutPropertiesLoose(_ref2, ["children"]);

    return React.createElement(ControlsContext.Consumer, null, function (value) {
      return React.createElement(CanvasEl, Object.assign({}, props), React.createElement(ControlsContext.Provider, {
        value: value
      }, children));
    });
  };
}
var Canvas = /*#__PURE__*/withControls(Canvas$1);

var DEFAULT_GROUP = 'DEFAULT_GROUP';
var ControlType;

(function (ControlType) {
  ControlType["NUMBER"] = "number";
  ControlType["STRING"] = "string";
  ControlType["BUTTON"] = "button";
  ControlType["BOOLEAN"] = "boolean";
  ControlType["SELECT"] = "select";
  ControlType["COLOR"] = "color";
  ControlType["XYPAD"] = "xypad";
  ControlType["FILE"] = "file";
  ControlType["CUSTOM"] = "custom";
})(ControlType || (ControlType = {}));

var defaultOptions = {
  type: ControlType.NUMBER,
  value: 0
};
var defaultValue = function defaultValue(options) {
  if (options.hasOwnProperty('value')) {
    return options.value;
  }

  switch (options.type) {
    case ControlType.NUMBER:
      return 0;

    case ControlType.COLOR:
      return '#ff0000';

    case ControlType.STRING:
      return '';

    case ControlType.SELECT:
      return (options.items || [''])[0];

    case ControlType.BOOLEAN:
      return false;

    case ControlType.FILE:
      return new FileLoader();

    case ControlType.XYPAD:
      return {
        x: 0,
        y: 0
      };
  }

  return undefined;
};
var clamp = function clamp(num, _clamp, higher) {
  return higher !== undefined ? Math.min(Math.max(num, _clamp), higher) : Math.min(num, _clamp);
};
var map = function map(value, x1, y1, x2, y2) {
  return (value - x1) * (y2 - x2) / (y1 - x1) + x2;
};

function useLocalStorage(key, initialValue) {
  var _useState = useState(function () {
    try {
      var item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  }),
      storedValue = _useState[0],
      setStoredValue = _useState[1];

  var setValue = function setValue(value) {
    try {
      var valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

function _templateObject4() {
  var data = _taggedTemplateLiteralLoose(["\n  display: flex;\n  font-family: inherit;\n  white-space: nowrap;\n  font-size: 14px;\n  color: #000;\n  justify-content: flex-end;\n  ", "\n  ", "\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteralLoose(["\n  display: flex;\n  ", "\n  justify-content: flex-end;\n  padding: 0 8px;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteralLoose(["\n  display: flex;\n  font-family: inherit;\n  font-size: 14px;\n  width: 56px;\n  user-select: none;\n  ", "\n  ", "\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  padding: 8px 0;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
var Row = /*#__PURE__*/styled.div( /*#__PURE__*/_templateObject());
var Label = /*#__PURE__*/styled.label( /*#__PURE__*/_templateObject2(), function (props) {
  return props.flexLabel === true ? 'flex: 1;' : '';
}, function (props) {
  return props.invertedLabel === true ? 'color: #fff;' : 'color: #000';
});
var Content = /*#__PURE__*/styled.div( /*#__PURE__*/_templateObject3(), function (props) {
  return props.flexLabel !== true ? 'flex: 1;' : '';
});
var Value = /*#__PURE__*/styled.div( /*#__PURE__*/_templateObject4(), function (props) {
  return props.stack ? 'flex: 1;' : '';
}, function (props) {
  return props.stack ? '' : 'width: 42px;';
});
function BaseControl(_ref) {
  var htmlFor = _ref.htmlFor,
      label = _ref.label,
      flexLabel = _ref.flexLabel,
      value = _ref.value,
      stack = _ref.stack,
      children = _ref.children,
      invertedLabel = _ref.invertedLabel;

  if (stack) {
    return React.createElement("div", null, React.createElement(Row, null, React.createElement(Label, {
      flexLabel: flexLabel,
      invertedLabel: invertedLabel
    }, label), React.createElement(Value, {
      stack: true,
      flexLabel: flexLabel
    }, value)), children);
  }

  return React.createElement(Row, null, React.createElement(Label, {
    flexLabel: flexLabel,
    invertedLabel: invertedLabel,
    htmlFor: htmlFor
  }, label), React.createElement(Content, {
    flexLabel: flexLabel
  }, children), typeof value !== 'undefined' && React.createElement(Value, null, value));
}

function _templateObject$1() {
  var data = _taggedTemplateLiteralLoose(["\n  -webkit-appearance: none;\n  width: 100%;\n  background: transparent;\n  display: inline-block;\n\n  &:focus {\n    outline: none;\n  }\n\n  &::-webkit-slider-runnable-track {\n    width: 100%;\n    height: 12px;\n    cursor: pointer;\n    background: rgba(0, 0, 0, 0.045);\n    border-radius: 10px;\n  }\n\n  &::-webkit-slider-thumb {\n    border: none;\n    height: 20px;\n    width: 20px;\n    border-radius: 50%;\n    background: #ffffff;\n    cursor: pointer;\n    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.22);\n    -webkit-appearance: none;\n    margin-top: -4px;\n  }\n\n  &:focus::-webkit-slider-runnable-track {\n    outline: none;\n  }\n"]);

  _templateObject$1 = function _templateObject() {
    return data;
  };

  return data;
}
var InputRange = /*#__PURE__*/styled.input( /*#__PURE__*/_templateObject$1());
var PRECISION = 300;
var CENTER = PRECISION / 2;
var NumberControl = function NumberControl(_ref) {
  var _options$distance;

  var name = _ref.name,
      value = _ref.value,
      setValue = _ref.setValue,
      options = _ref.options;
  var ref = useRef(null);
  var stage = useRef(null);
  var _options$min = options.min,
      min = _options$min === void 0 ? options.scrub ? -Infinity : 0 : _options$min,
      _options$max = options.max,
      max = _options$max === void 0 ? options.scrub ? Infinity : Math.PI : _options$max;
  var distance = ((_options$distance = options.distance) !== null && _options$distance !== void 0 ? _options$distance : options.scrub) ? 2 : max - min;

  var _useState = useState(options.scrub ? CENTER : map(value, min, max, 0, PRECISION)),
      val = _useState[0],
      setVal = _useState[1];

  var handleChange = useCallback(function () {
    if (options.scrub) {
      setVal(CENTER);
      stage.current = null;
    }
  }, [options.scrub]);
  useEffect(function () {
    var el = ref.current;

    if (el) {
      el.addEventListener('change', handleChange);
    }

    return function () {
      if (el) {
        el.removeEventListener('change', handleChange);
      }
    };
  }, [handleChange, ref]);
  useEffect(function () {
    setVal(options.scrub ? CENTER : map(value, min, max, 0, PRECISION));
  }, [value]);
  return React.createElement(BaseControl, {
    label: name,
    value: (value || 0).toFixed(2)
  }, React.createElement(InputRange, {
    ref: ref,
    type: "range",
    value: val,
    min: 0,
    max: PRECISION,
    onChange: function onChange(e) {
      var num = Number(e.target.value);
      setVal(num);

      if (stage.current === null) {
        stage.current = value;
      }

      var cvalue = (options.scrub ? stage.current : 0) + map(num - (options.scrub ? CENTER : 0), 0, PRECISION, options.scrub ? 0 : min, options.scrub ? distance * 2 : max);
      setValue(clamp(cvalue, min, max));
    }
  }));
};

function _templateObject2$1() {
  var data = _taggedTemplateLiteralLoose(["\n  opacity: 0;\n  margin-right: -15px;\n  & + ", ":after {\n    position: absolute;\n    content: \"\";\n    display: inline-block;\n    height: 4px;\n    width: 8px;\n    border-left: 2px solid;\n    border-bottom: 2px solid;\n    left: 3px;\n    top: 4px;\n    opacity: 0;\n    transform: translate(0px, 2px) rotate(-45deg);\n    transition: ease-in-out 125ms;\n    transition-property: opacity, transform;\n  }\n  &:checked + ", ":after {\n    opacity: 1;\n    transform: translate(0px, 0px) rotate(-45deg);\n  }\n  &:checked + ", " {\n    background: rgba(0, 0, 0, 1.0);\n    border-color: rgba(255, 255, 255, 1);\n    \n  }\n"]);

  _templateObject2$1 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$2() {
  var data = _taggedTemplateLiteralLoose(["\n  height: 16px;\n  width: 16px;\n  border: 2px solid rgba(0, 0, 0, 0.065);\n  border-radius: 4px;\n  position: relative;\n  margin-top: -1px;\n  transition: ease-in-out 125ms;\n  transition-property: background-color, border-color;\n"]);

  _templateObject$2 = function _templateObject() {
    return data;
  };

  return data;
}
var FakeCheckbox = /*#__PURE__*/styled.label( /*#__PURE__*/_templateObject$2());
var Checkbox = /*#__PURE__*/styled.input( /*#__PURE__*/_templateObject2$1(), FakeCheckbox, FakeCheckbox, FakeCheckbox);
function BooleanControl(_ref) {
  var id = _ref.id,
      name = _ref.name,
      value = _ref.value,
      setValue = _ref.setValue;
  var htmlFor = "Control" + id;
  return React.createElement(BaseControl, {
    flexLabel: true,
    label: name,
    htmlFor: htmlFor
  }, React.createElement(Checkbox, {
    id: htmlFor,
    type: "checkbox",
    checked: value,
    onChange: function onChange(e) {
      return setValue(e.currentTarget.checked);
    }
  }), React.createElement(FakeCheckbox, {
    htmlFor: htmlFor
  }));
}

function _templateObject$3() {
  var data = _taggedTemplateLiteralLoose(["\n  display: block;\n\n  font-family: inherit;\n  font-size: 14px;\n\n  display: block;\n  position: relative;\n\n  width: 100%;\n  height: 32px;\n\n  color: currentColor;\n\n  border: 0;\n  background-color: #232323;\n  /* border-radius: 4px; */\n  padding: 0 4px;\n"]);

  _templateObject$3 = function _templateObject() {
    return data;
  };

  return data;
}
var Button = /*#__PURE__*/styled.button( /*#__PURE__*/_templateObject$3());
function ButtonControl(_ref) {
  var name = _ref.name,
      options = _ref.options;
  return React.createElement("div", {
    style: {
      paddingTop: 8,
      paddingBottom: 8
    }
  }, React.createElement(Button, {
    onClick: function onClick(e) {
      if (options.onClick) {
        options.onClick(e);
      }
    }
  }, name));
}

function _templateObject3$1() {
  var data = _taggedTemplateLiteralLoose(["\n  position: absolute;\n  top: 24px;\n  right: 0px;\n  z-index: 100;\n"]);

  _templateObject3$1 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$2() {
  var data = _taggedTemplateLiteralLoose(["\n  width: 32px;\n  height: 16px;\n  border: 2px solid white;\n  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.3);\n  cursor: pointer;\n"]);

  _templateObject2$2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$4() {
  var data = _taggedTemplateLiteralLoose(["\n  position: relative;\n\n  > div {\n    box-sizing: border-box !important;\n  }\n"]);

  _templateObject$4 = function _templateObject() {
    return data;
  };

  return data;
}
var ColorPicker = /*#__PURE__*/styled.div( /*#__PURE__*/_templateObject$4());
var ColorBox = /*#__PURE__*/styled.div( /*#__PURE__*/_templateObject2$2());
var Picker = /*#__PURE__*/styled.div( /*#__PURE__*/_templateObject3$1());
function ColorControl(_ref) {
  var name = _ref.name,
      value = _ref.value,
      setValue = _ref.setValue,
      options = _ref.options;
  var _options$inline = options.inline,
      inline = _options$inline === void 0 ? false : _options$inline,
      _options$picker = options.picker,
      picker = _options$picker === void 0 ? 'chrome' : _options$picker;

  var _useState = useState(false),
      open = _useState[0],
      setOpen = _useState[1];

  var pickerRef = useRef();

  var handleClick = function handleClick(e) {
    if (e.target.id !== 'color-picker' && pickerRef.current && !pickerRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(function () {
    document.body.addEventListener('click', handleClick);
    return function () {
      document.body.removeEventListener('click', handleClick);
    };
  }, []);
  var pickerProps = {
    color: value,
    onChange: function onChange(color) {
      return setValue(color.hex);
    },
    disableAlpha: options.disableAlpha,
    colors: options.colors
  };
  var PickerElement = ChromePicker;

  switch (picker) {
    case 'alpha':
      PickerElement = AlphaPicker;
      break;

    case 'block':
      PickerElement = BlockPicker;
      break;

    case 'circle':
      PickerElement = CirclePicker;
      break;

    case 'compact':
      PickerElement = CompactPicker;
      break;

    case 'github':
      PickerElement = GithubPicker;
      break;

    case 'hue':
      PickerElement = HuePicker;
      break;

    case 'material':
      PickerElement = MaterialPicker;
      break;

    case 'sketch':
      PickerElement = SketchPicker;
      pickerProps.presetColors = options.colors;
      break;

    case 'slider':
      PickerElement = SliderPicker;
      break;

    case 'swatches':
      PickerElement = SwatchesPicker;
      break;

    case 'twitter':
      PickerElement = TwitterPicker;
      break;
  }

  return React.createElement(BaseControl, {
    stack: inline,
    label: name,
    flexLabel: true
  }, React.createElement(ColorPicker, null, inline ? React.createElement(PickerElement, Object.assign({}, pickerProps, {
    triangle: inline ? 'hide' : undefined,
    width: 268
  })) : React.createElement(React.Fragment, null, React.createElement(ColorBox, {
    id: "color-picker",
    style: {
      backgroundColor: value
    },
    onClick: function onClick() {
      return setOpen(function (lastValue) {
        return !lastValue;
      });
    }
  }), React.createElement(Picker, {
    hidden: open !== true,
    ref: pickerRef
  }, React.createElement(PickerElement, Object.assign({}, pickerProps))))));
}

function _templateObject$5() {
  var data = _taggedTemplateLiteralLoose(["\n  display: block;\n\n  font-family: inherit;\n  font-size: 14px;\n  color: rgba(0, 0, 0, 0.4);\n\n  display: block;\n  position: relative;\n\n  width: 100%;\n  height: 32px;\n\n  color: #000;\n\n  margin-left: 8px;\n\n  border: 0;\n  background-color: rgba(0, 0, 0, 0.025);\n  border-radius: 4px;\n  padding: 0 4px;\n"]);

  _templateObject$5 = function _templateObject() {
    return data;
  };

  return data;
}
var Select = /*#__PURE__*/styled.select( /*#__PURE__*/_templateObject$5());
function SelectControl(_ref) {
  var name = _ref.name,
      setValue = _ref.setValue,
      value = _ref.value,
      options = _ref.options;
  var _options$items = options.items,
      items = _options$items === void 0 ? [] : _options$items;
  return React.createElement(BaseControl, {
    label: name
  }, React.createElement(Select, {
    value: value,
    onChange: function onChange(e) {
      return setValue(e.currentTarget.value);
    }
  }, items.map(function (item, i) {
    return React.createElement("option", {
      key: i
    }, item);
  })));
}

function _templateObject$6() {
  var data = _taggedTemplateLiteralLoose(["\n  display: block;\n\n  font-family: inherit;\n  font-size: 14px;\n\n  display: block;\n  position: relative;\n\n  width: 100%;\n  height: 32px;\n\n  margin-left: 8px;\n\n  border: 0;\n  background-color: #fff;\n  color: #000;\n  border-radius: 0;\n  padding: 0 4px;\n"]);

  _templateObject$6 = function _templateObject() {
    return data;
  };

  return data;
}
var Input = /*#__PURE__*/styled.input( /*#__PURE__*/_templateObject$6());
var StringControl = /*#__PURE__*/React.memo(function (_ref) {
  var name = _ref.name,
      setValue = _ref.setValue,
      value = _ref.value;
  return React.createElement(BaseControl, {
    label: name,
    invertedLabel: true
  }, React.createElement(Input, {
    value: value,
    onChange: function onChange(e) {
      return setValue(e.target.value);
    }
  }));
});

var THRESHOLD = 0.00001;
var XYPadControl = function XYPadControl(_ref) {
  var name = _ref.name,
      value = _ref.value,
      setValue = _ref.setValue,
      options = _ref.options;
  var stage = useRef(null);
  var _options$distance = options.distance,
      distance = _options$distance === void 0 ? 1 : _options$distance,
      _options$scrub = options.scrub,
      scrub = _options$scrub === void 0 ? false : _options$scrub;

  var _useMeasure = useMeasure(),
      ref = _useMeasure[0],
      _useMeasure$ = _useMeasure[1],
      width = _useMeasure$.width,
      height = _useMeasure$.height;

  var _useSpring = useSpring(function () {
    return {
      from: {
        x: value.x,
        y: value.y
      },
      onChange: function onChange(value, b) {
        var clampMx = b.key === 'x' ? width : height;
        var v = clamp(map(value, 0, clampMx / 2, 0, distance), -distance, distance) || 0;

        if (!scrub) {
          setValue(function (prev) {
            var _extends2;

            return _extends({}, prev, (_extends2 = {}, _extends2[b.key] = v < THRESHOLD && v > -THRESHOLD ? 0 : v, _extends2));
          });
        }
      }
    };
  }, [width, height]),
      cursor = _useSpring[0],
      setCursor = _useSpring[1];

  var bind = useDrag(function (_ref2) {
    var down = _ref2.down,
        movement = _ref2.movement;

    if (down && !stage.current) {
      stage.current = value;
    } else if (!down) {
      stage.current = null;
    }

    setCursor({
      x: down ? movement[0] : 0,
      y: down ? movement[1] : 0
    });

    if (scrub) {
      if (down) {
        setValue(function () {
          return {
            x: stage.current.x + map(movement[0], 0, width / 2, 0, distance),
            y: stage.current.y + map(movement[1], 0, height / 2, 0, distance)
          };
        });
      } else {
        stage.current = value;
      }
    }
  });
  var x = cursor.x.to(function (n) {
    return clamp(n + width / 2, 0, width);
  });
  var y = cursor.y.to(function (n) {
    return clamp(n + height / 2, 0, height);
  });
  return React.createElement(BaseControl, {
    stack: true,
    label: name,
    value: "x: " + value.x.toFixed(1) + ", y: " + value.y.toFixed(1)
  }, React.createElement(animated.svg, Object.assign({
    ref: ref,
    style: {
      userSelect: 'none',
      borderRadius: 8,
      border: '1px solid #f0f0f0'
    },
    width: "100%",
    height: 200,
    xmlns: "http://www.w3.org/2000/svg"
  }, bind()), React.createElement("rect", {
    fill: "rgb(250, 250, 250)",
    width: "100%",
    height: "100%"
  }), React.createElement(animated.line, {
    x1: x,
    x2: x,
    y1: 0,
    y2: "100%",
    stroke: "#ccc"
  }), React.createElement(animated.line, {
    x1: 0,
    x2: "100%",
    y1: y,
    y2: y,
    stroke: "#ccc"
  }), React.createElement(animated.g, {
    style: {
      transform: to([x, y], function (x, y) {
        return "translate(" + x + "px, " + y + "px)";
      })
    }
  }, React.createElement("circle", {
    r: 8,
    fill: "#ccc"
  }), React.createElement("circle", {
    r: 4,
    fill: "#aaa"
  }))));
};

function _templateObject$7() {
  var data = _taggedTemplateLiteralLoose(["\n  width: 100%;\n"]);

  _templateObject$7 = function _templateObject() {
    return data;
  };

  return data;
}
var FileInput = /*#__PURE__*/styled.input( /*#__PURE__*/_templateObject$7());
var FileControl = function FileControl(_ref) {
  var name = _ref.name,
      setValue = _ref.setValue,
      options = _ref.options;
  return React.createElement(BaseControl, {
    label: name
  }, React.createElement(FileInput, {
    type: "file",
    onChange: function onChange(e) {
      var _options$loader;

      var loader = (_options$loader = options.loader) !== null && _options$loader !== void 0 ? _options$loader : new FileLoader();

      if (loader.setCrossOrigin) {
        loader.setCrossOrigin('');
      }

      var file = e.currentTarget.files && e.currentTarget.files[0];
      var texture = loader.load(URL.createObjectURL(file));
      setValue(texture);
    }
  }));
};

var _ControlComponents;
var ControlComponents = (_ControlComponents = {}, _ControlComponents[ControlType.NUMBER] = NumberControl, _ControlComponents[ControlType.BOOLEAN] = BooleanControl, _ControlComponents[ControlType.SELECT] = SelectControl, _ControlComponents[ControlType.COLOR] = ColorControl, _ControlComponents[ControlType.STRING] = StringControl, _ControlComponents[ControlType.BUTTON] = ButtonControl, _ControlComponents[ControlType.FILE] = FileControl, _ControlComponents[ControlType.XYPAD] = XYPadControl, _ControlComponents);

var Noop = function Noop(_ref) {
  var name = _ref.name,
      options = _ref.options;
  return React.createElement(BaseControl, {
    label: name
  }, "\"", options.type, "\" not found");
};

var ControlItem = function ControlItem(_ref2) {
  var _ref3, _options$component, _options$type;

  var name = _ref2.name,
      id = _ref2.id,
      defaultValue = _ref2.value,
      options = _ref2.options;
  var context = useContext(ControlsContext);

  var _useState = useState(context.values.current && context.values.current.has(id) ? context.values.current.get(id) : defaultValue),
      value = _useState[0],
      setValue = _useState[1];

  useEffect(function () {
    context.values.current.set(id, value);
  }, [context.values, id, value]);
  useEffect(function () {
    context.gui.current.set(id, setValue);
  }, [context.gui, id]);
  var Component = (_ref3 = (_options$component = options.component) !== null && _options$component !== void 0 ? _options$component : ControlComponents[(_options$type = options.type) !== null && _options$type !== void 0 ? _options$type : ControlType.NUMBER]) !== null && _ref3 !== void 0 ? _ref3 : Noop;
  return React.createElement(Component, {
    id: id,
    name: name,
    value: value,
    setValue: function setValue(newValue) {
      var _context$gui$current, _context$gui$current$, _context$state$curren, _context$state$curren2;

      (_context$gui$current = context.gui.current) === null || _context$gui$current === void 0 ? void 0 : (_context$gui$current$ = _context$gui$current.get(id)) === null || _context$gui$current$ === void 0 ? void 0 : _context$gui$current$(newValue);
      (_context$state$curren = context.state.current) === null || _context$state$curren === void 0 ? void 0 : (_context$state$curren2 = _context$state$curren.get(id)) === null || _context$state$curren2 === void 0 ? void 0 : _context$state$curren2(newValue);
    },
    options: options
  });
};

function _templateObject2$3() {
  var data = _taggedTemplateLiteralLoose(["\n  background: ", ";\n  padding: 16px;\n  display: ", ";\n  margin-bottom: 8px;\n"]);

  _templateObject2$3 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$8() {
  var data = _taggedTemplateLiteralLoose(["\n  display: block;\n  font-family: inherit;\n  font-size: inherit;\n  font-weight: normal;\n  padding-left: 16px;\n  cursor: pointer;\n  position: relative;\n  user-select: none;\n\n  &:before,\n  &:after {\n    content: '';\n    position: absolute;\n    top: 8px;\n    right: 16px;\n    width: 12px;\n    height: 2px;\n    background-color: #fff;\n    transition: transform 0.25s ease-out;\n  }\n  &:before {\n    transform: rotate(", "deg);\n  }\n\n  &:after {\n    transform: rotate(", "deg);\n  }\n"]);

  _templateObject$8 = function _templateObject() {
    return data;
  };

  return data;
}
var Heading = /*#__PURE__*/styled.h2( /*#__PURE__*/_templateObject$8(), function (props) {
  return props.open ? 0 : 90;
}, function (props) {
  return props.open ? 0 : 180;
});
var Container = /*#__PURE__*/styled.div( /*#__PURE__*/_templateObject2$3(), function (props) {
  return props.bg ? '#fff' : '#000';
}, function (props) {
  return props.open ? 'block' : 'none';
});
var ControlGroup = function ControlGroup(_ref) {
  var _options$defaultClose;

  var title = _ref.title,
      controls = _ref.controls,
      _ref$options = _ref.options,
      options = _ref$options === void 0 ? {} : _ref$options;

  var _useState = useState((_options$defaultClose = !options.defaultClosed) !== null && _options$defaultClose !== void 0 ? _options$defaultClose : true),
      open = _useState[0],
      setOpen = _useState[1];

  var isDefault = title !== 'DEFAULT_GROUP';
  return React.createElement("div", null, isDefault && React.createElement(Heading, {
    open: open,
    onClick: function onClick() {
      return setOpen(function (o) {
        return !o;
      });
    }
  }, title), React.createElement(Container, {
    open: open,
    bg: isDefault
  }, Array.from(controls).map(function (control) {
    return React.createElement(ControlItem, Object.assign({
      key: control.id + "_" + control.name
    }, control));
  })));
};

function _templateObject4$1() {
  var data = _taggedTemplateLiteralLoose(["\n  padding-bottom: 8px;\n  overflow-y: auto;\n  max-height: calc(100vh - 42px);\n"]);

  _templateObject4$1 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$2() {
  var data = _taggedTemplateLiteralLoose(["\n  width: 30px;\n  height: 18px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-left: auto;\n  cursor: pointer;\n  &:before,\n  &:after {\n    content: '';\n    position: absolute;\n    top: 19px;\n    right: 16px;\n    width: 12px;\n    height: 2px;\n    background-color: #fff;\n    transition: transform 0.25s ease-out;\n  }\n  &:before {\n    transform: rotate(", "deg);\n  }\n\n  &:after {\n    transform: rotate(", "deg);\n  }\n  \n"]);

  _templateObject3$2 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$4() {
  var data = _taggedTemplateLiteralLoose(["\n  display: flex;\n  align-items: center;\n  position: relative;\n  padding-left: 16px;\n  padding-right: 16px;\n  height: 42px;\n  font-family: inherit;\n  font-size: 20px;\n  color: #fff;\n  cursor: move;\n  cursor: grab;\n  user-select: none;\n  background-color: #000;\n  /* border-top-left-radius: 8px;\n  border-top-right-radius: 8px;\n  border-bottom-left-radius: ", "px;\n  border-bottom-right-radius: ", "px; */\n  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.14);\n\n  border-bottom: ", "px solid rgba(255,255,255,0.4);\n  ", " {\n    border-top: ", "px solid rgba(255,255,255,0.4);\n    /* border-top-left-radius: 0px;\n    border-top-right-radius: 0px;\n    border-bottom-left-radius: 0px;\n    border-bottom-right-radius: 0px; */\n    border-bottom: none;\n  }\n  flex: none;\n"]);

  _templateObject2$4 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$9() {
  var data = _taggedTemplateLiteralLoose(["\n  display: flex;\n  flex-direction: column;\n  position: fixed;\n  top: ", ";\n  right: ", ";\n  bottom: ", ";\n  left: ", ";\n  width: ", "px;\n  border-radius: 16px;\n  background-color: #fff;\n  border-radius: 8px;\n  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.12);\n  font-family: 'sans-serif';\n  font-size: 16px;\n\n  ", " {\n    transform: none !important;\n    flex-direction: column-reverse;\n    top: auto;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    width: auto;\n  }\n"]);

  _templateObject$9 = function _templateObject() {
    return data;
  };

  return data;
}
var mq = "@media only screen and (max-width: 600px)";
var ControlsAnchor;

(function (ControlsAnchor) {
  ControlsAnchor["TOP_LEFT"] = "top_left";
  ControlsAnchor["TOP_RIGHT"] = "top_right";
  ControlsAnchor["BOTTOM_LEFT"] = "bottom_left";
  ControlsAnchor["BOTTOM_RIGHT"] = "bottom_right";
})(ControlsAnchor || (ControlsAnchor = {}));

function posProps(positions) {
  return function posPropsFn(props) {
    return positions.includes(props['data-anchor']) ? '16px' : 'auto';
  };
}

var Float = /*#__PURE__*/styled(animated.div)( /*#__PURE__*/_templateObject$9(), /*#__PURE__*/posProps([ControlsAnchor.TOP_LEFT, ControlsAnchor.TOP_RIGHT]), /*#__PURE__*/posProps([ControlsAnchor.BOTTOM_RIGHT, ControlsAnchor.TOP_RIGHT]), /*#__PURE__*/posProps([ControlsAnchor.BOTTOM_RIGHT, ControlsAnchor.BOTTOM_LEFT]), /*#__PURE__*/posProps([ControlsAnchor.TOP_LEFT, ControlsAnchor.BOTTOM_LEFT]), function (props) {
  return props['data-width'];
}, mq);
var Header = /*#__PURE__*/styled(animated.div)( /*#__PURE__*/_templateObject2$4(), function (props) {
  return props['data-collapsed'] ? 0 : 8;
}, function (props) {
  return props['data-collapsed'] ? 0 : 8;
}, function (props) {
  return props['data-collapsed'] ? 1 : 0;
}, mq, function (props) {
  return props['data-collapsed'] ? 1 : 0;
});
var CollapseIcon = /*#__PURE__*/styled.div( /*#__PURE__*/_templateObject3$2(), function (props) {
  return props.collapsed ? 0 : 90;
}, function (props) {
  return props.collapsed ? 0 : 180;
});
var Items = /*#__PURE__*/styled(animated.div)( /*#__PURE__*/_templateObject4$1());

var groupByGroup = function groupByGroup(items) {
  return Array.from(items).reduce(function (acc, item) {
    var _item$options;

    var groupName = (item === null || item === void 0 ? void 0 : (_item$options = item.options) === null || _item$options === void 0 ? void 0 : _item$options.group) || DEFAULT_GROUP;
    acc[groupName] = acc[groupName] || [];
    acc[groupName].push(item);
    return acc;
  }, {});
};

var Controls = function Controls(props) {
  var _props$title = props.title,
      title = _props$title === void 0 ? 'react-three-gui' : _props$title,
      _props$defaultClosedG = props.defaultClosedGroups,
      defaultClosedGroups = _props$defaultClosedG === void 0 ? [] : _props$defaultClosedG,
      _props$width = props.width,
      width = _props$width === void 0 ? 300 : _props$width,
      _props$style = props.style,
      style = _props$style === void 0 ? {} : _props$style,
      _props$anchor = props.anchor,
      anchor = _props$anchor === void 0 ? ControlsAnchor.TOP_RIGHT : _props$anchor,
      _props$className = props.className,
      className = _props$className === void 0 ? '' : _props$className;

  var _useContext = useContext(ControlsContext),
      controls = _useContext.controls;

  var _useLocalStorage = useLocalStorage('REACT_THREE_GUI__COLLAPSED', props.collapsed),
      collapsed = _useLocalStorage[0],
      setCollapsed = _useLocalStorage[1];

  var _useLocalStorage2 = useLocalStorage("REACT_THREE_GUI__" + anchor, [0, 0]),
      position = _useLocalStorage2[0],
      setPosition = _useLocalStorage2[1];

  var _useMeasure = useMeasure(),
      ref = _useMeasure[0],
      bounds = _useMeasure[1];

  var _useSpring = useSpring(function () {
    return {
      pos: position,
      onRest: function onRest(_ref) {
        var value = _ref.value;
        setPosition(value);
      }
    };
  }),
      pos = _useSpring[0].pos,
      setPos = _useSpring[1];

  var left = [ControlsAnchor.TOP_LEFT, ControlsAnchor.BOTTOM_LEFT].includes(anchor);
  var top = [ControlsAnchor.TOP_RIGHT, ControlsAnchor.TOP_LEFT].includes(anchor);
  var bind = useDrag(function (_ref2) {
    var movement = _ref2.movement,
        _ref2$memo = _ref2.memo,
        memo = _ref2$memo === void 0 ? pos ? pos.getValue ? pos.getValue() : pos.get() : 0 : _ref2$memo;
    var x = movement[0] + memo[0],
        y = movement[1] + memo[1];
    setPos({
      pos: [left ? clamp(x, 1, window.innerWidth - width - 32) : clamp(x, -window.innerWidth + width + 32, 1), top ? clamp(y, 1, window.innerHeight) : clamp(y, -window.innerHeight + bounds.height + 32, 1)]
    });
    return memo;
  });

  var getGroupOptions = function getGroupOptions(groupName) {
    var _defaultClosedGroups$;

    return {
      defaultClosed: (_defaultClosedGroups$ = defaultClosedGroups === null || defaultClosedGroups === void 0 ? void 0 : defaultClosedGroups.includes(groupName)) !== null && _defaultClosedGroups$ !== void 0 ? _defaultClosedGroups$ : false
    };
  };

  var groups = groupByGroup(controls);
  return React.createElement(Float, {
    "data-width": width,
    "data-anchor": anchor,
    ref: ref,
    style: _extends({}, style, {
      transform: to([pos], function (_ref3) {
        var x = _ref3[0],
            y = _ref3[1];
        return "translate3d(" + x + "px," + y + "px,0)";
      })
    }),
    className: className
  }, React.createElement(Header, Object.assign({
    "data-collapsed": collapsed
  }, bind(), {
    onClick: function onClick() {
      return setCollapsed(function (c) {
        return !c;
      });
    }
  }), title, React.createElement(CollapseIcon, {
    collapsed: collapsed
  })), React.createElement(Items, {
    hidden: !collapsed,
    style: {
      maxHeight: top ? to([pos], function (_ref4) {
        var y = _ref4[1];
        return "calc(100vh - " + (y + 92) + "px)";
      }) : undefined
    }
  }, Object.entries(groups).map(function (_ref5) {
    var groupName = _ref5[0],
        items = _ref5[1];
    return React.createElement(ControlGroup, {
      key: groupName,
      title: groupName,
      controls: items,
      options: getGroupOptions(groupName)
    });
  })));
};
Controls.Provider = ControlsProvider;
Controls.Canvas = Canvas;

var useControl = function useControl(name, options) {
  if (options === void 0) {
    options = defaultOptions;
  }

  var context = useContext(ControlsContext);

  var _useState = useState(null),
      id = _useState[0],
      setId = _useState[1];

  var _useState2 = useState(defaultValue(options)),
      value = _useState2[0],
      setValue = _useState2[1];

  var _useSpring = useSpring$1(function () {
    return {
      value: value,
      config: typeof options.spring === 'object' ? options.spring : undefined
    };
  }),
      spring = _useSpring[0],
      setSpring = _useSpring[1];

  var setSpringValue = function setSpringValue(springValue) {
    return setSpring({
      value: springValue
    });
  };

  if (options.state) {
    value = options.state[0];
    setValue = options.state[1];
  }

  useEffect(function () {
    if (context.state.current && id) {
      if (options.spring) {
        context.state.current.set(id, setSpringValue);
      } else {
        context.state.current.set(id, setValue);
      }
    }
  }, [context.state, id]);
  useEffect(function () {
    var ctrl = context.addControl({
      id: options.id,
      name: name,
      value: value,
      options: options
    });
    setId(ctrl.id);
    return function () {
      context.removeControl(ctrl);
    };
  }, []);
  useEffect(function () {
    var _context$gui$current, _context$gui$current$;

    options.spring && void setSpring({
      value: value
    });
    options.onChange && void options.onChange(value); // prevent stale gui

    id && ((_context$gui$current = context.gui.current) === null || _context$gui$current === void 0 ? void 0 : (_context$gui$current$ = _context$gui$current.get(id)) === null || _context$gui$current$ === void 0 ? void 0 : _context$gui$current$(value));
  }, [options, setSpring, value]);

  if (options.spring) {
    return spring.value;
  }

  return value;
};

export { BaseControl, ControlType, Controls, ControlsContext, DEFAULT_GROUP, useControl, withControls };
//# sourceMappingURL=react-three-gui.esm.js.map
