(function(exports) {
  function computeNewCoordsFromZoomRotation(currZoom, currRotation, dX, dY) {
    var result = [dX, dY];
    var radianAngle = 0;
    // https://www.pdftron.com/api/web/PDFNet.Page.html#.rotationToDegree__anchor
    switch (currRotation) {
      // 0 deg
      case 0:
        radianAngle = 0;
        break;
      // 90 deg
      case 1:
        radianAngle = (Math.PI / 2) * -1;
        break;
      // 180 deg
      case 2:
        radianAngle = Math.PI;
        break;
      // 270 deg
      case 3:
        radianAngle = ((3 * Math.PI) / 2) * -1;
        break;
    }
    result[0] = exports.DiffAlignment.rotatedX(dX, dY, radianAngle) * currZoom;
    result[1] = exports.DiffAlignment.rotatedY(dX, dY, radianAngle) * currZoom;
    return result;
  }

  function deltaTransformPoint(matrix, point) {
    var dx = point.x * matrix.a + point.y * matrix.c + 0;
    var dy = point.x * matrix.b + point.y * matrix.d + 0;
    return { x: dx, y: dy };
  }

  function decomposeMatrix(matrix) {
    // @see https://gist.github.com/2052247

    // calculate delta transform point
    var px = deltaTransformPoint(matrix, { x: 0, y: 1 });
    var py = deltaTransformPoint(matrix, { x: 1, y: 0 });

    // calculate skew
    var skewX = (180 / Math.PI) * Math.atan2(px.y, px.x) - 90;
    var skewY = (180 / Math.PI) * Math.atan2(py.y, py.x);

    return {
      translateX: matrix.e,
      translateY: matrix.f,
      scaleX: Math.sqrt(matrix.a * matrix.a + matrix.b * matrix.b),
      scaleY: Math.sqrt(matrix.c * matrix.c + matrix.d * matrix.d),
      skewX: skewX,
      skewY: skewY,
      rotation: skewX, // rotation is the same as skew x
    };
  }

  function getScaleForCanvasFromNudgeTool(nudgeToolScaleVal) {
    return nudgeToolScaleVal / 100 + 1;
  }

  function getScaleStateForNudgeToolFromCanvas(canvasScale) {
    return 100 * (canvasScale - 1);
  }

  function createCanvas(width, height, canvasMultiplier) {
    var result = document.createElement('canvas');
    var resultCtx = result.getContext('2d');
    result.width = width;
    result.height = height;
    result.style.width = width / canvasMultiplier + 'px';
    result.style.height = height / canvasMultiplier + 'px';
    result.style.backgroundColor = '';
    resultCtx.fillStyle = 'white';
    return result;
  }

  function isPixelWhite(data, index) {
    // Treat transparent pixels as white
    if (data[index + 3] === 0) {
      return true;
    }
    for (var i = 0; i < 3; i++) {
      if (data[index + i] !== 255) {
        return false;
      }
    }
    return true;
  }

  function isPixelDataEqual(data1, data2, index) {
    for (var i = 0; i < 4; i++) {
      if (data1[index + i] !== data2[index + i]) {
        return false;
      }
    }
    return true;
  }

  function getCoords(i, width) {
    var pixels = Math.floor(i / 4);
    return {
      x: pixels % width,
      y: Math.floor(pixels / width),
    };
  }

  function getIndex(coords, width) {
    return (coords.y * width + coords.x) * 4;
  }

  function overlayPixels(pageCanvas, firstDocCanvas, firstDocData, firstDocOpacity, secondDocOpacity) {
    var ctx = pageCanvas.getContext('2d');
    var secondDocImageData = ctx.getImageData(0, 0, pageCanvas.width, pageCanvas.height);
    var secondDocData = secondDocImageData.data;

    for (var i = 0; i < secondDocData.length; i += 4) {
      var coords = getCoords(i, pageCanvas.width);
      var index = getIndex(coords, firstDocCanvas.width);
      var opacity;
      if (coords.y <= firstDocCanvas.height && coords.x <= firstDocCanvas.width) {
        if (isPixelWhite(firstDocData, index) && isPixelWhite(secondDocData, index)) {
          // if pixel is white, make it transparent
          secondDocData[i + 3] = 0;
        } else if (isPixelWhite(firstDocData, index)) {
          // this pixel does not exist in first doc, only second doc, so apply specified second doc opacity
          // https://css-tricks.com/8-digit-hex-codes/
          opacity = Math.round(255 * secondDocOpacity);
          secondDocData[i + 3] = opacity;
        } else if (isPixelWhite(secondDocData, index)) {
          // this pixel does not exist in second doc, only first doc, so apply specified first doc opacity
          // https://css-tricks.com/8-digit-hex-codes/
          opacity = Math.round(255 * firstDocOpacity);
          secondDocData[i] = firstDocData[index];
          secondDocData[i + 1] = firstDocData[index + 1];
          secondDocData[i + 2] = firstDocData[index + 2];
          secondDocData[i + 3] = opacity;
        } else {
          var mixFactor;
          // this pixel appears in both first and second doc, just as diff color
          if (firstDocOpacity > secondDocOpacity) {
            // blend both pixels together
            // https://stackoverflow.com/questions/17253085/blending-two-imagedata-into-one-imagedata-with-an-offset-in-javascript
            // how dominant second image is
            var mixFactor = secondDocOpacity;
            secondDocData[i] = secondDocData[i] * mixFactor + firstDocData[i] * (1 - mixFactor);
            secondDocData[i + 1] = secondDocData[i + 1] * mixFactor + firstDocData[i + 1] * (1 - mixFactor);
            secondDocData[i + 2] = secondDocData[i + 2] * mixFactor + firstDocData[i + 2] * (1 - mixFactor);
            opacity = Math.round(255 * firstDocOpacity);
          } else {
            opacity = Math.round(255 * secondDocOpacity);
          }
          secondDocData[i + 3] = opacity;
        }
      }
    }
    var result = document.createElement('canvas');
    result.width = pageCanvas.width;
    result.height = pageCanvas.height;
    result.getContext('2d').putImageData(secondDocImageData, 0, 0);
    return result;
  }

  function diffPixels(pageCanvas, firstDocCanvas, firstDocData, firstDocOpacity, secondDocOpacity) {
    var ctx = pageCanvas.getContext('2d');
    var secondDocImageData = ctx.getImageData(0, 0, pageCanvas.width, pageCanvas.height);
    var secondDocData = secondDocImageData.data;

    for (var i = 0; i < secondDocData.length; i += 4) {
      var coords = getCoords(i, pageCanvas.width);
      var index = getIndex(coords, firstDocCanvas.width);
      var lightness;

      var opacity;
      if (isPixelWhite(firstDocData, index) && isPixelWhite(secondDocData, index)) {
        // if pixel is white, make it transparent
        secondDocData[i + 3] = 0;
      } else if (isPixelDataEqual(firstDocData, secondDocData, index)) {
        // if pixel values are the same, make it grey
        lightness = (secondDocData[index] + secondDocData[index + 1] + secondDocData[index + 2]) / 6;

        secondDocData[i] = 128 + lightness;
        secondDocData[i + 1] = 128 + lightness;
        secondDocData[i + 2] = 128 + lightness;
      } else if (coords.y <= firstDocCanvas.height && coords.x <= firstDocCanvas.width) {
        if (isPixelWhite(firstDocData, index)) {
          // https://css-tricks.com/8-digit-hex-codes/
          opacity = Math.round(255 * secondDocOpacity);
          lightness = (secondDocData[i] + secondDocData[i + 1] + secondDocData[i + 2]) / 3;
          // if the pixel is white in first document only, color it blue
          secondDocData[i] = lightness;
          secondDocData[i + 1] = lightness;
          secondDocData[i + 2] = 255;
          secondDocData[i + 3] = opacity;
        } else if (isPixelWhite(secondDocData, index)) {
          // https://css-tricks.com/8-digit-hex-codes/
          opacity = Math.round(255 * firstDocOpacity);
          lightness = (firstDocData[index] + firstDocData[index + 1] + firstDocData[index + 2]) / 3;
          // if the pixel is white in second document only, color it red
          secondDocData[i] = 255;
          secondDocData[i + 1] = lightness;
          secondDocData[i + 2] = lightness;
          secondDocData[i + 3] = opacity;
        } else {
          var firstLightness = (firstDocData[index] + firstDocData[index + 1] + firstDocData[index + 2]) / 3;
          var secondLightness = (secondDocData[i] + secondDocData[i + 1] + secondDocData[i + 2]) / 3;
          lightness = (firstLightness + secondLightness) / 2;

          // otherwise, color it magenta-ish based on color difference
          var colorDifference = Math.abs(secondDocData[i] - firstDocData[index]) + Math.abs(secondDocData[i + 1] - firstDocData[index + 1]) + Math.abs(secondDocData[i + 2] - firstDocData[index + 2]);

          var diffPercent = colorDifference / (255 * 3);
          var valChange = lightness * diffPercent;

          var magentaVal = lightness + valChange;

          secondDocData[i] = magentaVal;
          secondDocData[i + 1] = lightness - valChange;
          secondDocData[i + 2] = magentaVal;
          opacity = Math.max(Math.round(255 * firstDocOpacity), Math.round(255 * secondDocOpacity));
          secondDocData[i + 3] = opacity;
        }
      }
    }
    var result = document.createElement('canvas');
    result.width = pageCanvas.width;
    result.height = pageCanvas.height;
    result.getContext('2d').putImageData(secondDocImageData, 0, 0);
    return result;
  }

  exports.DiffUtil = {
    decomposeMatrix: decomposeMatrix,
    getScaleForCanvasFromNudgeTool: getScaleForCanvasFromNudgeTool,
    getScaleStateForNudgeToolFromCanvas: getScaleStateForNudgeToolFromCanvas,
    createCanvas: createCanvas,
    diffPixels: diffPixels,
    overlayPixels: overlayPixels,
    computeNewCoordsFromZoomRotation: computeNewCoordsFromZoomRotation,
  };
})(window);
