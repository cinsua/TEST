const UserService = require('../services/user')
const PenaltyService = require('../services/penalty')

module.exports = {

  // TODO FILTER / PAGINATION
  async getBans(req, res, next) {
    const idOrUsername = req.validRequest.params.id
    const readFields = req.credentials.readFields
    const queryUrl = req.validRequest.query

    let user = await UserService.getByIdOrUsername(idOrUsername, readFields, queryUrl)
    let bans = await PenaltyService.getBans(user)

    req.data = bans

    return next()
  },

  async banUser(req, res, next) {
    const idOrUsername = req.validRequest.params.id
    const readFields = req.credentials.readFields
    const queryUrl = req.validRequest.query

    let user = await UserService.getByIdOrUsername(idOrUsername, readFields, queryUrl)
    const { timePenalty, expirePenalty, reason } = req.validRequest.body
    let pen = { reason, timePenalty, expirePenalty, user: user.id, author: req.user.id }

    let ban = await PenaltyService.create(pen, 'ban')

    req.data = ban

    return next()
  },

  // TODO FILTER / PAGINATION
  async getSilences(req, res, next) {
    const idOrUsername = req.validRequest.params.id
    const readFields = req.credentials.readFields
    const queryUrl = req.validRequest.query

    let user = await UserService.getByIdOrUsername(idOrUsername, readFields, queryUrl)
    let silences = await PenaltyService.getSilences(user)

    req.data = silences

    return next()
  },

  async silenceUser(req, res, next) {
    const idOrUsername = req.validRequest.params.id
    const readFields = req.credentials.readFields
    const queryUrl = req.validRequest.query

    let user = await UserService.getByIdOrUsername(idOrUsername, readFields, queryUrl)
    const { timePenalty, expirePenalty, reason } = req.validRequest.body
    let pen = { reason, timePenalty, expirePenalty, user: user.id, author: req.user.id }

    let silence = await PenaltyService.create(pen, 'silence')

    req.data = silence
    return next()
  },

  async removeBan(req, res, next) {
    const idOrUsername = req.validRequest.params.id
    const readFields = req.credentials.readFields
    const queryUrl = req.validRequest.query

    let user = await UserService.getByIdOrUsername(idOrUsername, readFields, queryUrl)
    let ban = await PenaltyService.getBan(user, req.params.banId)
    await PenaltyService.deletePenalty(ban)

    req.data = { message: `ban removed from [${user.username}]` }

    return next()
  },

  async removeSilence(req, res, next) {
    const idOrUsername = req.validRequest.params.id
    const readFields = req.credentials.readFields
    const queryUrl = req.validRequest.query

    let user = await UserService.getByIdOrUsername(idOrUsername, readFields, queryUrl)
    let silence = await PenaltyService.getSilence(user, req.params.silenceId)
    await PenaltyService.deletePenalty(silence)

    req.data = { message: `silence removed from [${user.username}]` }

    return next()
  }
}