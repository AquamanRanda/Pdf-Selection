(function(exports) {
  var eventHandlersSetup = false;
  var isInAlignmentMode = false;
  var leftPanelAnnot;
  var rightPanelAnnot;

  function alignPages(onAlignPressedCallback) {
    if (leftPanelAnnot && rightPanelAnnot) {
      onAlignPressedCallback(leftPanelAnnot.Start, leftPanelAnnot.End, rightPanelAnnot.Start, rightPanelAnnot.End, leftPanelAnnot.PageNumber - 1, rightPanelAnnot.PageNumber - 1);
    }
  }

  function toggleAlignmentMode(leftPanelInstance, rightPanelInstance, alignmentModeButton) {
    if (!isInAlignmentMode) {
      isInAlignmentMode = true;
      alignmentModeButton.textContent = 'Leave Alignment Mode';

      leftPanelInstance.setToolMode('AnnotationCreateArrow');
      rightPanelInstance.setToolMode('AnnotationCreateArrow');
    } else {
      isInAlignmentMode = false;
      alignmentModeButton.textContent = 'Enter Alignment Mode';
      leftPanelInstance.setToolMode('AnnotationEdit');
      rightPanelInstance.setToolMode('AnnotationEdit');
    }
  }

  function initializeDiffAlignmentToolHandlers(leftPanelInstance, rightPanelInstance, onAlignPressedCallback) {
    leftPanelAnnot = undefined;
    rightPanelAnnot = undefined;

    var alignmentModeButton = document.getElementById('toggle-alignment-mode');

    if (isInAlignmentMode) {
      toggleAlignmentMode(leftPanelInstance, rightPanelInstance, alignmentModeButton);
    }

    if (!eventHandlersSetup) {
      eventHandlersSetup = true;
      leftPanelInstance.docViewer.getTool('AnnotationCreateArrow').on('annotationAdded', function(annotation) {
        // after alignment annotation is added in the left viewer
        if (leftPanelAnnot) {
          leftPanelInstance.docViewer.getAnnotationManager().deleteAnnotation(leftPanelAnnot, false, true);
        }
        annotation.ReadOnly = true;
        leftPanelAnnot = annotation;
        alignPages(onAlignPressedCallback);
      });

      rightPanelInstance.docViewer.getTool('AnnotationCreateArrow').on('annotationAdded', function(annotation) {
        // after alignment annotation is added in the right viewer
        if (rightPanelAnnot) {
          rightPanelInstance.docViewer.getAnnotationManager().deleteAnnotation(rightPanelAnnot, false, true);
        }
        annotation.ReadOnly = true;
        rightPanelAnnot = annotation;
        alignPages(onAlignPressedCallback);
      });

      alignmentModeButton.addEventListener('click', function() {
        toggleAlignmentMode(leftPanelInstance, rightPanelInstance, alignmentModeButton);
      });
      document.getElementById('enable-snap-mode').addEventListener('change', function(event) {
        var enableSnapMode = event.target.checked;
        leftPanelInstance.docViewer.getTool('AnnotationCreateArrow').setSnapMode(enableSnapMode ? leftPanelInstance.docViewer.SnapMode.e_DefaultSnapMode : null);
        rightPanelInstance.docViewer.getTool('AnnotationCreateArrow').setSnapMode(enableSnapMode ? rightPanelInstance.docViewer.SnapMode.e_DefaultSnapMode : null);
      });
    }
  }
  exports.DiffAlignmentTool = {
    initializeDiffAlignmentToolHandlers: initializeDiffAlignmentToolHandlers,
  };
})(window);
