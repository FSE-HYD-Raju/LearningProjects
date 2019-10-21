# Ejected AltContainer for Omnichannel

- Original implementation can be found from:
 https://github.com/altjs/container/blob/v1.1.1/src/AltContainer.js
- (folder specific .editorconfig has been added to keep differences minimal)

## Omnichannel customizations:

- expose public methods which are set via store exportPublicMethods -method 
- AltContainer->getProps: strip context/props flux 
- use Object.assign instead of object.assign package