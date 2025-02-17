function __$styleInject(css) {
    if (!css) return;

    if (typeof window == 'undefined') return;
    var style = document.createElement('style');
    style.setAttribute('media', 'screen');

    style.innerHTML = css;
    document.head.appendChild(style);
    return css;
}

import _regeneratorRuntime from '@babel/runtime/regenerator';
import _asyncToGenerator from '@babel/runtime/helpers/esm/asyncToGenerator';
import _extends from '@babel/runtime/helpers/esm/extends';
import _objectWithoutPropertiesLoose from '@babel/runtime/helpers/esm/objectWithoutPropertiesLoose';
import React, { forwardRef, useState, useRef, useCallback } from 'react';
import t from 'prop-types';
import Cropper from 'react-easy-crop';
import LocaleReceiver from 'antd/es/locale-provider/LocaleReceiver';
import Modal from 'antd/es/modal';
import Slider from 'antd/es/slider';

__$styleInject(".antd-img-crop-modal .ant-modal-body {\n  padding-bottom: 16px;\n}\n.antd-img-crop-modal .antd-img-crop-container {\n  position: relative;\n  width: 100%;\n  height: 40vh;\n  margin-bottom: 16px;\n}\n.antd-img-crop-modal .antd-img-crop-control {\n  display: flex;\n  align-items: center;\n  width: 60%;\n  margin-left: auto;\n  margin-right: auto;\n}\n.antd-img-crop-modal .antd-img-crop-control button {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 34px;\n  height: 34px;\n  padding: 0;\n  font-style: normal;\n  background: transparent;\n  border: 0;\n  outline: 0;\n  cursor: pointer;\n}\n.antd-img-crop-modal .antd-img-crop-control button[disabled] {\n  cursor: default;\n}\n.antd-img-crop-modal .antd-img-crop-control.zoom button {\n  font-size: 18px;\n}\n.antd-img-crop-modal .antd-img-crop-control.rotate button {\n  font-size: 16px;\n}\n.antd-img-crop-modal .antd-img-crop-control.rotate button:first-of-type {\n  transform: rotate(-20deg);\n}\n.antd-img-crop-modal .antd-img-crop-control.rotate button:last-of-type {\n  transform: rotate(20deg);\n}\n.antd-img-crop-modal .antd-img-crop-control .ant-slider {\n  flex: 1;\n  margin: 0 8px;\n}\n");

var pkg = 'antd-img-crop';

var noop = function noop() {};

var MEDIA_CLASS = pkg + "-media";
var MODAL_TITLE = 'Edit image';
var ZOOM_STEP = 0.1;
var MIN_ROTATE = 0;
var MAX_ROTATE = 360;
var ROTATE_STEP = 1;
var EasyCrop = /*#__PURE__*/forwardRef(function (props, ref) {
  var src = props.src,
      aspect = props.aspect,
      shape = props.shape,
      grid = props.grid,
      hasZoom = props.hasZoom,
      zoomVal = props.zoomVal,
      minZoom = props.minZoom,
      maxZoom = props.maxZoom,
      restrictPosition = props.restrictPosition,
      rotateVal = props.rotateVal,
      setZoomVal = props.setZoomVal,
      setRotateVal = props.setRotateVal,
      onComplete = props.onComplete;

  var _useState = useState({
    x: 0,
    y: 0
  }),
      crop = _useState[0],
      setCrop = _useState[1];

  var onCropComplete = useCallback(function (croppedArea, croppedAreaPixels) {
    onComplete(croppedAreaPixels);
  }, [onComplete]);
  return /*#__PURE__*/React.createElement(Cropper, {
    ref: ref,
    image: src,
    aspect: aspect,
    cropShape: shape,
    showGrid: grid,
    zoomWithScroll: hasZoom,
    crop: crop,
    zoom: zoomVal,
    minZoom: minZoom,
    maxZoom: maxZoom,
    restrictPosition: restrictPosition,
    rotation: rotateVal,
    onCropChange: setCrop,
    onZoomChange: setZoomVal,
    onRotationChange: setRotateVal,
    onCropComplete: onCropComplete,
    classes: {
      containerClassName: pkg + "-container",
      mediaClassName: MEDIA_CLASS
    }
  });
});
EasyCrop.propTypes = {
  src: t.string,
  aspect: t.number,
  shape: t.string,
  grid: t.bool,
  hasZoom: t.bool,
  zoomVal: t.number,
  minZoom: t.number,
  maxZoom: t.number,
  restrictPosition: t.bool,
  rotateVal: t.number,
  setZoomVal: t.func,
  setRotateVal: t.func,
  onComplete: t.func
};
var ImgCrop = /*#__PURE__*/forwardRef(function (props, ref) {
  var aspect = props.aspect,
      shape = props.shape,
      grid = props.grid,
      zoom = props.zoom,
      rotate = props.rotate,
      beforeCrop = props.beforeCrop,
      modalTitle = props.modalTitle,
      modalWidth = props.modalWidth,
      modalOk = props.modalOk,
      modalCancel = props.modalCancel,
      minZoom = props.minZoom,
      maxZoom = props.maxZoom,
      restrictPosition = props.restrictPosition,
      children = props.children;
  var hasZoom = zoom === true;
  var hasRotate = rotate === true;
  var modalTextProps = {
    okText: modalOk,
    cancelText: modalCancel
  };
  Object.keys(modalTextProps).forEach(function (key) {
    if (!modalTextProps[key]) delete modalTextProps[key];
  });

  var _useState2 = useState(''),
      src = _useState2[0],
      setSrc = _useState2[1];

  var _useState3 = useState(1),
      zoomVal = _useState3[0],
      setZoomVal = _useState3[1];

  var _useState4 = useState(0),
      rotateVal = _useState4[0],
      setRotateVal = _useState4[1];

  var beforeUploadRef = useRef();
  var fileRef = useRef();
  var resolveRef = useRef(noop);
  var rejectRef = useRef(noop);
  var cropPixelsRef = useRef();
  /**
   * Upload
   */

  var renderUpload = useCallback(function () {
    var upload = Array.isArray(children) ? children[0] : children;

    var _upload$props = upload.props,
        beforeUpload = _upload$props.beforeUpload,
        accept = _upload$props.accept,
        restUploadProps = _objectWithoutPropertiesLoose(_upload$props, ["beforeUpload", "accept"]);

    beforeUploadRef.current = beforeUpload;
    return _extends({}, upload, {
      props: _extends({}, restUploadProps, {
        accept: accept || 'image/*',
        beforeUpload: function beforeUpload(file, fileList) {
          return new Promise(function (resolve, reject) {
            if (beforeCrop && !beforeCrop(file, fileList)) {
              reject();
              return;
            }

            fileRef.current = file;
            resolveRef.current = resolve;
            rejectRef.current = reject;
            var reader = new FileReader();
            reader.addEventListener('load', function () {
              setSrc(reader.result);
            });
            reader.readAsDataURL(file);
          });
        }
      })
    });
  }, [beforeCrop, children]);
  /**
   * EasyCrop
   */

  var onComplete = useCallback(function (croppedAreaPixels) {
    cropPixelsRef.current = croppedAreaPixels;
  }, []);
  /**
   * Controls
   */

  var isMinZoom = zoomVal - ZOOM_STEP < minZoom;
  var isMaxZoom = zoomVal + ZOOM_STEP > maxZoom;
  var isMinRotate = rotateVal === MIN_ROTATE;
  var isMaxRotate = rotateVal === MAX_ROTATE;
  var subZoomVal = useCallback(function () {
    if (!isMinZoom) setZoomVal(zoomVal - ZOOM_STEP);
  }, [isMinZoom, zoomVal]);
  var addZoomVal = useCallback(function () {
    if (!isMaxZoom) setZoomVal(zoomVal + ZOOM_STEP);
  }, [isMaxZoom, zoomVal]);
  var subRotateVal = useCallback(function () {
    if (!isMinRotate) setRotateVal(rotateVal - ROTATE_STEP);
  }, [isMinRotate, rotateVal]);
  var addRotateVal = useCallback(function () {
    if (!isMaxRotate) setRotateVal(rotateVal + ROTATE_STEP);
  }, [isMaxRotate, rotateVal]);
  /**
   * Modal
   */

  var onClose = useCallback(function () {
    setSrc('');
    setZoomVal(1);
    setRotateVal(0);
  }, []);
  var onOk = useCallback( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
    var naturalImg, naturalWidth, naturalHeight, canvas, ctx, maxLen, halfMax, left, top, maxImgData, _cropPixelsRef$curren, width, height, x, y, _fileRef$current, type, name, uid;

    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            onClose();
            naturalImg = document.querySelector("." + MEDIA_CLASS);
            naturalWidth = naturalImg.naturalWidth, naturalHeight = naturalImg.naturalHeight;
            canvas = document.createElement('canvas');
            ctx = canvas.getContext('2d'); // create a max canvas to cover the source image after rotated

            maxLen = Math.sqrt(Math.pow(naturalWidth, 2) + Math.pow(naturalHeight, 2)) / zoomVal;
            canvas.width = maxLen;
            canvas.height = maxLen;
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height); // rotate the image

            if (hasRotate && rotateVal > 0 && rotateVal < 360) {
              halfMax = maxLen / 2;
              ctx.translate(halfMax, halfMax);
              ctx.rotate(rotateVal * Math.PI / 180);
              ctx.translate(-halfMax, -halfMax);
            } // draw the source image in the center of the max canvas


            left = (maxLen - naturalWidth) / 2;
            top = (maxLen - naturalHeight) / 2;
            ctx.drawImage(naturalImg, left, top); // shrink the max canvas to the crop area size, then align two center points

            maxImgData = ctx.getImageData(0, 0, maxLen, maxLen);
            _cropPixelsRef$curren = cropPixelsRef.current, width = _cropPixelsRef$curren.width, height = _cropPixelsRef$curren.height, x = _cropPixelsRef$curren.x, y = _cropPixelsRef$curren.y;
            canvas.width = width;
            canvas.height = height;
            ctx.putImageData(maxImgData, Math.round(-left - x), Math.round(-top - y)); // get the new image

            _fileRef$current = fileRef.current, type = _fileRef$current.type, name = _fileRef$current.name, uid = _fileRef$current.uid;
            canvas.toBlob( /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(blob) {
                var newFile, res, passedFile, _type;

                return _regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        newFile = blob;
                        newFile.lastModifiedDate = Date.now();
                        newFile.name = name;
                        newFile.uid = uid;

                        if (!(typeof beforeUploadRef.current !== 'function')) {
                          _context.next = 6;
                          break;
                        }

                        return _context.abrupt("return", resolveRef.current(newFile));

                      case 6:
                        res = beforeUploadRef.current(newFile, [newFile]);

                        if (!(typeof res !== 'boolean' && !res)) {
                          _context.next = 10;
                          break;
                        }

                        console.error('beforeUpload must return a boolean or Promise');
                        return _context.abrupt("return");

                      case 10:
                        if (!(res === true)) {
                          _context.next = 12;
                          break;
                        }

                        return _context.abrupt("return", resolveRef.current(newFile));

                      case 12:
                        if (!(res === false)) {
                          _context.next = 14;
                          break;
                        }

                        return _context.abrupt("return", rejectRef.current('not upload'));

                      case 14:
                        if (!(res && typeof res.then === 'function')) {
                          _context.next = 27;
                          break;
                        }

                        _context.prev = 15;
                        _context.next = 18;
                        return res;

                      case 18:
                        passedFile = _context.sent;
                        _type = Object.prototype.toString.call(passedFile);
                        if (_type === '[object File]' || _type === '[object Blob]') newFile = passedFile;
                        resolveRef.current(newFile);
                        _context.next = 27;
                        break;

                      case 24:
                        _context.prev = 24;
                        _context.t0 = _context["catch"](15);
                        rejectRef.current(_context.t0);

                      case 27:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, null, [[15, 24]]);
              }));

              return function (_x) {
                return _ref2.apply(this, arguments);
              };
            }(), type, 0.4);

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })), [hasRotate, onClose, rotateVal, zoomVal]);
  return /*#__PURE__*/React.createElement(LocaleReceiver, null, function (locale, localeCode) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, renderUpload(), src && /*#__PURE__*/React.createElement(Modal, Object.assign({
      visible: true,
      wrapClassName: pkg + "-modal",
      title: localeCode === 'zh-cn' && modalTitle === MODAL_TITLE ? '编辑图片' : modalTitle,
      width: modalWidth,
      onOk: onOk,
      onCancel: onClose,
      maskClosable: false,
      destroyOnClose: true
    }, modalTextProps), /*#__PURE__*/React.createElement(EasyCrop, {
      ref: ref,
      src: src,
      aspect: aspect,
      shape: shape,
      grid: grid,
      hasZoom: hasZoom,
      zoomVal: zoomVal,
      minZoom: minZoom,
      maxZoom: maxZoom,
      restrictPosition: restrictPosition !== undefined ? restrictPosition : zoomVal >= 1,
      rotateVal: rotateVal,
      setZoomVal: setZoomVal,
      setRotateVal: setRotateVal,
      onComplete: onComplete
    }), hasZoom && /*#__PURE__*/React.createElement("div", {
      className: pkg + "-control zoom"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: subZoomVal,
      disabled: isMinZoom
    }, "\uFF0D"), /*#__PURE__*/React.createElement(Slider, {
      min: minZoom,
      max: maxZoom,
      step: ZOOM_STEP,
      value: zoomVal,
      onChange: setZoomVal
    }), /*#__PURE__*/React.createElement("button", {
      onClick: addZoomVal,
      disabled: isMaxZoom
    }, "\uFF0B")), hasRotate && /*#__PURE__*/React.createElement("div", {
      className: pkg + "-control rotate"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: subRotateVal,
      disabled: isMinRotate
    }, "\u21BA"), /*#__PURE__*/React.createElement(Slider, {
      min: MIN_ROTATE,
      max: MAX_ROTATE,
      step: ROTATE_STEP,
      value: rotateVal,
      onChange: setRotateVal
    }), /*#__PURE__*/React.createElement("button", {
      onClick: addRotateVal,
      disabled: isMaxRotate
    }, "\u21BB"))));
  });
});
ImgCrop.propTypes = {
  aspect: t.number,
  shape: t.oneOf(['rect', 'round']),
  zoom: t.bool,
  minZoom: t.number,
  maxZoom: t.number,
  restrictPosition: t.bool,
  grid: t.bool,
  rotate: t.bool,
  beforeCrop: t.func,
  modalTitle: t.string,
  modalWidth: t.oneOfType([t.number, t.string]),
  modalOk: t.string,
  modalCancel: t.string,
  children: t.node
};
ImgCrop.defaultProps = {
  aspect: 1,
  shape: 'rect',
  grid: false,
  zoom: true,
  minZoom: 1,
  maxZoom: 3,
  rotate: false,
  modalTitle: MODAL_TITLE,
  modalWidth: 520
};

export default ImgCrop;
