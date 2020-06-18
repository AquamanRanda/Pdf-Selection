var FILES = {
  'demo-annotated.pdf': ['../../../samples/files/demo-annotated-non-optimized.pdf', '../../../samples/files/demo-annotated.pdf'],
  'construction-drawing-final.pdf': ['../../../samples/files/construction-drawing-final.pdf', '../../../samples/files/construction-drawing-optimized.pdf'],
  'cheetahs.pdf': ['../../../samples/files/cheetahs-non-optimized.pdf', '../../../samples/files/cheetahs.pdf'],
  'magazine.pdf': ['https://pdftron.s3.amazonaws.com/downloads/pl/magazine.pdf', 'https://pdftron.s3.amazonaws.com/downloads/pl/magazine-optimized.pdf'],
  'webviewer-demo.pdf': ['https://pdftron.s3.amazonaws.com/downloads/pl/webviewer-demo.pdf', 'https://pdftron.s3.amazonaws.com/downloads/pl/webviewer-demo-optimized.pdf'],
};

var _selected = localStorage.getItem('__selectedFiles');
var _selectedFiles = FILES[_selected];

var firstPdf = _selectedFiles ? _selectedFiles[0] : null;
var secondPdf = _selectedFiles ? _selectedFiles[1] : null;
var firstPdfUrl = localStorage.getItem('__firstPdfUrl');
var secondPdfUrl = localStorage.getItem('__secondPdfUrl');
var isFullAPI = localStorage.getItem('__isFullAPI') || false;

var sourceOne;
var sourceTwo;

if (firstPdfUrl && secondPdfUrl) {
  document.getElementById('url').value = firstPdfUrl;
  document.getElementById('url2').value = secondPdfUrl;
  sourceOne = firstPdfUrl;
  sourceTwo = secondPdfUrl;

  document.getElementById('select1').value = undefined;
} else {
  var defaultSelected = 'cheetahs.pdf';
  var _selectedFiles = FILES[defaultSelected];
  sourceOne = firstPdf || _selectedFiles[0];
  sourceTwo = secondPdf || _selectedFiles[1];

  document.getElementById('select1').value = _selected || defaultSelected;
}
document.getElementById('isFullAPI').checked = isFullAPI;

var timerOne = Date.now();
var timerTwo = Date.now();

// ============== WebViewer setup =============
WebViewer(
  {
    path: '../../../lib',
    initialDoc: sourceOne,
    fullAPI: isFullAPI,
  },
  document.getElementById('middlePanel')
).then(function(instance) {
  instance.docViewer.on('documentLoaded', function() {
    var timerOneFinish = Date.now();
    console.log('The first viewer', timerOneFinish - timerOne);
  });
});

WebViewer(
  {
    path: '../../../lib',
    initialDoc: sourceTwo,
    fullAPI: isFullAPI,
  },
  document.getElementById('leftPanel')
).then(function(instance) {
  instance.docViewer.on('documentLoaded', function() {
    var timerTwoFinish = Date.now();
    console.log('The second viewer', timerTwoFinish - timerTwo);
  });
});

// ============== End WebViewer setup =============

// ============== Setup input controllers =============
document.getElementById('selectControl').onclick = function(e) {
  e.preventDefault();
  var select1 = document.getElementById('select1');
  var selected = select1.options[select1.selectedIndex].value;

  localStorage.setItem('__selectedFiles', selected);
  localStorage.removeItem('__firstPdfUrl');
  localStorage.removeItem('__secondPdfUrl');
  location.reload();
};

document.getElementById('url-form').onsubmit = function(e) {
  e.preventDefault();
  var firstPdf = document.getElementById('url').value;
  var secondPdf = document.getElementById('url2').value;

  localStorage.setItem('__firstPdfUrl', firstPdf);
  localStorage.setItem('__secondPdfUrl', secondPdf);

  localStorage.removeItem('__selectedFiles');
  location.reload();
};

document.getElementById('isFullAPI').onchange = function(e) {
  if (e.target.checked) {
    localStorage.setItem('__isFullAPI', true);
  } else {
    localStorage.removeItem('__isFullAPI');
  }
};
