# nodetemplate

Vagrant based node template

## Vagrantfile:

* basebox: ubuntu/trusty64
* installs nvm
* sets Node 6.2.2 as default
* creates node_modules folder in guest machine
* creates node_modules symlink in project root
* globally installs:
 * browser-sync
 * gulp-cli

## package.json:

* dev
 * gulp
 * gulp-sass
 * browser-sync

## NPM, Vagrant and Windows

If you have a Windows host you can't have the node_modules folder in the synced folder. It has to be in a folder on the Guest machine with a symlink to it in the synced folder.

For the Windows to treat the symlink correctly you have to:

1. open Windows Command Prompt as administrator
1. enter `fsutil behavior set SymlinkEvaluation L2L:1 R2R:1 L2R:1 R2L:1`
1. restart your machine