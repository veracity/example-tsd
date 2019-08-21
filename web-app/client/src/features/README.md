# The Features folder
This folder is meant to contain sub folders for each "feature" of the application. A feature is a logical grouping of tools that together provide functionality in the application. There is no clear rule on the size and scope of a feature, but it is generally recommended that you create many smaller features rather than fewer large ones.

## Feature structure
A feature can contain whatever it needs to function in terms of files, folders and code. In general it is recommended that you try to create atomic features (that is features that do not depend on others). This eases both development, testing and general reasonling about the code.

The only constraint that is recommended on features is that they expose their "public api" (that is the exports that other features or code can import) in their root `index.js` file. By following this regimen it is easy to figure out what entrypoints a feature may have. If the feature has a parent component that renders it you should also consider exporting this as the default export from `index.js`. This allows the feature to "own" its own API and it may redirect the default export as it wishes should anything internal change without having to change the code outside of the feature.

## Features using other features
A feature is allowed to import from other features though this should generally be limited to the exposed imports in the `index.js` file. If a feature needs specific access to a file within another feature that file should be exported in `index.js` or if the connection is tight and only between these two you might consider combining them.