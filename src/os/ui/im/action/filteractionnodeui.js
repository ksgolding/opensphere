goog.provide('os.ui.im.action.FilterActionNodeUICtrl');
goog.provide('os.ui.im.action.filterActionNodeUIDirective');

goog.require('os.im.action.ImportActionEventType');
goog.require('os.metrics.Metrics');
goog.require('os.ui.Module');
goog.require('os.ui.filter.ui.FilterNodeUICtrl');
goog.require('os.ui.filter.ui.filterNodeUIDirective');


/**
 * The selected/highlighted node UI directive for filter actions.
 * @return {angular.Directive}
 */
os.ui.im.action.filterActionNodeUIDirective = function() {
  var directive = os.ui.filter.ui.filterNodeUIDirective();
  directive.controller = os.ui.im.action.FilterActionNodeUICtrl;
  directive.template = '<span class="glyphs pull-right slick-node-ui" ng-if="nodeUi.show()">' +
      '<span ng-click="nodeUi.copy()">' +
      '<i class="fa fa-copy fa-fw glyph" title="Copy the action"></i></span>' +
      '<span ng-click="nodeUi.edit()">' +
      '<i class="fa fa-pencil fa-fw glyph" title="Edit the action"></i></span>' +
      '<span ng-click="nodeUi.remove()">' +
      '<i class="fa fa-times fa-fw glyph glyph-remove" title="Remove the action"></i></span>' +
      '</span>';
  return directive;
};


/**
 * Add the directive to the Angular module.
 */
os.ui.Module.directive('filteractionnodeui', [os.ui.im.action.filterActionNodeUIDirective]);



/**
 * Controller for selected/highlighted node UI.
 * @param {!angular.Scope} $scope The Angular scope.
 * @param {!angular.JQLite} $element The root DOM element.
 * @extends {os.ui.filter.ui.FilterNodeUICtrl}
 * @constructor
 * @ngInject
 */
os.ui.im.action.FilterActionNodeUICtrl = function($scope, $element) {
  os.ui.im.action.FilterActionNodeUICtrl.base(this, 'constructor', $scope, $element);
};
goog.inherits(os.ui.im.action.FilterActionNodeUICtrl, os.ui.filter.ui.FilterNodeUICtrl);


/**
 * Copy the filter action.
 * @override
 */
os.ui.im.action.FilterActionNodeUICtrl.prototype.copy = function() {
  var entry = /** @type {os.ui.im.action.FilterActionNode} */ (this.scope['item']).getEntry();
  if (entry) {
    this.scope.$emit(os.im.action.ImportActionEventType.COPY_ENTRY, entry);
    os.metrics.Metrics.getInstance().updateMetric(os.im.action.Metrics.COPY, 1);
  }
};
goog.exportProperty(
    os.ui.im.action.FilterActionNodeUICtrl.prototype,
    'copy',
    os.ui.im.action.FilterActionNodeUICtrl.prototype.copy);


/**
 * Edit the filter action.
 * @override
 */
os.ui.im.action.FilterActionNodeUICtrl.prototype.edit = function() {
  var entry = /** @type {os.ui.im.action.FilterActionNode} */ (this.scope['item']).getEntry();
  if (entry) {
    this.scope.$emit(os.im.action.ImportActionEventType.EDIT_ENTRY, entry);
    os.metrics.Metrics.getInstance().updateMetric(os.im.action.Metrics.EDIT, 1);
  }
};
goog.exportProperty(
    os.ui.im.action.FilterActionNodeUICtrl.prototype,
    'edit',
    os.ui.im.action.FilterActionNodeUICtrl.prototype.edit);


/**
 * Remove the filter action.
 * @override
 */
os.ui.im.action.FilterActionNodeUICtrl.prototype.remove = function() {
  var entry = /** @type {os.ui.im.action.FilterActionNode} */ (this.scope['item']).getEntry();
  if (entry) {
    this.scope.$emit(os.im.action.ImportActionEventType.REMOVE_ENTRY, entry);
    os.metrics.Metrics.getInstance().updateMetric(os.im.action.Metrics.REMOVE, 1);
  }
};
goog.exportProperty(
    os.ui.im.action.FilterActionNodeUICtrl.prototype,
    'remove',
    os.ui.im.action.FilterActionNodeUICtrl.prototype.remove);