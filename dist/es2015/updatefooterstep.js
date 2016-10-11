
export let UpdateFooterStep = class UpdateFooterStep {

  run(instruction, next) {
    let footers = _findFooterModules(instruction);
    let footer = _findFooter(footers);

    instruction.router.setFooter(footer);

    return next();
  }
};

function _findFooterModules(instruction) {
  let footers = [];
  footers.push(instruction.config.footer);
  let childInstruction = instruction.plan.default.childNavigationInstruction;
  while (childInstruction) {
    let footerModule = childInstruction.config.footer;
    if (footerModule) {
      let activationParam = childInstruction.params;
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
  let footer = footers.pop();
  while (!footer && footers.length > 0) {
    footer = footers.pop();
  }
  return footer;
}