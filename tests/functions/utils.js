const fs = require('fs-extra')
const moment = require('moment')

const ensureDirPath = (dirPath) => {
    fs.ensureDirSync(dirPath)
}

const emptyDirPath = (dirPath) => {
    fs.emptyDirSync(dirPath)
}

const writeJson = (data, filename) => {
    fs.writeFileSync(filename, JSON.stringify(data, null, 2))
}

const timestamp = () => {
    return moment().format('yyyyMd') + moment().format('HHmmss')
}

module.exports = {
    emptyDirPath,
    ensureDirPath,
    writeJson,
    timestamp
}