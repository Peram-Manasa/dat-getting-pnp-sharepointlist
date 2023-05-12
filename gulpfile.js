'use strict';

// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const build = require('@microsoft/sp-build-web');

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

let getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  let result = getTasks.call(build.rig);

  result.set('serve', result.get('serve-deprecated'));

  return result;
};

// eslint-disable-next-line no-undef, @typescript-eslint/no-var-requires
build.initialize(require('gulp'));
