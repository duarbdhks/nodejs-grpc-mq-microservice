#!/usr/bin/env node
const { exec } = require('child_process')

const packages = ['subscription', 'email', 'public']
packages.forEach((p) => exec(`cp -R protofiles ./services/${p}`))
