define(["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var UpdateFooterStep = exports.UpdateFooterStep = function () {
    function UpdateFooterStep() {
      _classCallCheck(this, UpdateFooterStep);
    }

    UpdateFooterStep.prototype.run = function run(instruction, next) {
      var footers = _findFooterModules(instruction);
      var footer = _findFooter(footers);

      instruction.router.setFooter(footer);

      return next();
    };

    return UpdateFooterStep;
  }();

  function _findFooterModules(instruction) {
    var footers = [];
    footers.push(instruction.config.footer);
    var childInstruction = instruction.plan.default.childNavigationInstruction;
    while (childInstruction) {
      var footerModule = childInstruction.config.footer;
      if (footerModule) {
        var activationParam = childInstruction.params;
        footers.push({
          footerModule: footerModule,
          activationParam: activationParam
        });
      }
      childInstruction = childInstruction.plan.default.childNavigationInstruction;
    }

    return footers;
  }

  function _findFooter(footers) {
    var footer = footers.pop();
    while (!footer && footers.length > 0) {
      footer = footers.pop();
    }
    return footer;
  }
});