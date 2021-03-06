const Joi = require('joi')

/*#################################################################
#         Field level schema validations                          #
#################################################################*/

const mongooseIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/)

// threads
const titleSchema = Joi.string().min(4).max(50)
const contentThreadSchema = Joi.string().min(4).max(3000)
const private = Joi.boolean()

// Comments
const contentCommentSchema = Joi.string().min(3).max(300)


// pagination
const pageSchema = Joi.number().positive()
const limitSchema = Joi.number().positive()


/*#################################################################
#         Modular schema validations                              #
#################################################################*/

const noBodySchema = Joi.object().keys({
  body: {}
})
const noQuerySchema = Joi.object().keys({
  query: {}
})
const noParamsSchema = Joi.object().keys({
  params: {}
})
const noReqSchema = Joi.object().keys({
  params: {}, query: {}, body: {}
})

const paginationQuerySchema = Joi.object().keys({
  query: {
    page: pageSchema,
    limit: limitSchema
  },
})

const baseThreadSchema = Joi.object().keys({
  body: {
    title: titleSchema.required(),
    content: contentThreadSchema.required(),
    private: private
  },
})

const baseCommentSchema = Joi.object().keys({
  body: {
    content: contentCommentSchema.required(),
  },
})

const baseGetCommentSchema = Joi.object().keys({
  params: {
    commentId: mongooseIdSchema,
  }
})

const baseUpdateThreadSchema = Joi.object().keys({
  body: {
    title: titleSchema,
    content: contentThreadSchema,
    private: private
  },
})

const baseGetThreadSchema = Joi.object().keys({
  params: {
    threadId: mongooseIdSchema.required()
  }
})


module.exports = {

  createThreadSchema: baseThreadSchema
    .concat(noParamsSchema)
    .concat(noQuerySchema),

  getThreadsSchema: paginationQuerySchema
    .concat(noParamsSchema)
    .concat(noBodySchema),

  getThreadSchema: baseGetThreadSchema
    .concat(noBodySchema)
    .concat(noQuerySchema),

  updateThreadSchema: baseUpdateThreadSchema
    .concat(baseGetThreadSchema)
    .concat(noQuerySchema),

  pinThreadSchema: baseGetThreadSchema
    .concat(noBodySchema)
    .concat(noQuerySchema),

  createCommentSchema: baseCommentSchema
    .concat(baseGetThreadSchema)
    .concat(noQuerySchema),

  getCommentsSchema: paginationQuerySchema
    .concat(baseGetThreadSchema)
    .concat(noBodySchema),

  getCommentSchema: baseGetCommentSchema
    .concat(baseGetThreadSchema)
    .concat(noBodySchema)
    .concat(noQuerySchema),
}