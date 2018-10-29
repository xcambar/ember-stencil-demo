'use strict';

const path = require('path');

const MergeTree = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');
const debug = require('debug');

const StencilCollection = require('./lib/stencil-collection');

module.exports = {
  name: 'ember-cli-stencil',

  // Get the parent's dependencies, including `devDependencies` for Ember addons
  getParentDependencies() {
    return Object.keys(
      this.parent.dependencies(this.parent.pkg, !this.parent.isEmberCLIAddon())
    );
  },

  included() {
    const logDiscovery = debug(`${this.name}:discovery`);
    this._super.included.apply(this, arguments);

    let parentDepsPackages;
    if (this.addonDiscovery) {
      // ember-cli < 3.4
      parentDepsPackages = this.getParentDependencies()
        .map(dep => this.addonDiscovery.resolvePackage(this.parent.root, dep))
        .map(pathToDep => {
          return {
            root: pathToDep,
            pkg: require(path.join(pathToDep, 'package.json'))
          };
        });
    } else {
      // ember-cli >= 3.4
      let packages = this.parent._packageInfo.dependencyPackages;
      parentDepsPackages = Object.keys(packages).map(key => {
        let { realPath, pkg } = packages[key];
        return { root: realPath, pkg };
      });
    }

    // Find all Stencil collections in the dependencies
    this.stencilCollections = parentDepsPackages.reduce(
      (acc, { root, pkg }) => {
        if (StencilCollection.looksLike(pkg)) {
          logDiscovery('found Stencil collection %o at %o', pkg.name, root);
          acc.push(new StencilCollection(pkg, root));
        }

        return acc;
      },
      []
    );
  },

  treeForPublic() {
    const tree = this._super.treeForPublic.apply(this, arguments);

    let trees = this.stencilCollections.reduce(
      (acc, collection) => {
        let {
          pkg: { name, root }
        } = collection;
        let loader = new Funnel(root, {
          srcDir: 'dist',
          files: [`${name}.js`],
          destDir: 'assets'
        });
        let components = new Funnel(root, {
          srcDir: `dist/${name}`,
          destDir: `assets/${name}`
        });
        return [...acc, loader, components];
      },
      [tree]
    );
    return MergeTree(trees.filter(Boolean));
  },

  contentFor(type, { rootURL }) {
    if (type !== 'body') {
      return;
    }
    return this.stencilCollections.reduce((acc, collection) => {
      let scriptTag = `<script src="${rootURL}assets/${collection.name}.js"></script>`;
      return `${acc}${scriptTag}`;
    }, '');
  }
};
