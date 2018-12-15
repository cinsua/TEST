const User = require('../models/user');

module.exports = {

  create: async (body) => {
    const { username, password } = body
    const user = new User({ username, password })
    await user.save()
    return user
  },

  getMe: async (body) => {
    const { username } = body
    let user = await User.findOne({ username });
    return user
  },

  deleteMe: async (req) => {
    const { user } = req
    await user.remove()
    return
  },
  
  updateMe: async (req) => {
    let user, data
    user = req.user;
    data = req.body;
    user.set(data);
    user = await user.save();
    return user
  },

  get: async (idOrUsername) => {
    var user = {}
    try{
      user = await User.findById(idOrUsername)
    }catch(e){
      //console.log(e)
      user = await User.findOne({username: idOrUsername });
    }
    //let user = await User.findOne( {$or: [{username: idOrUsername }, {_id: idOrUsername }] });
    return user
  },

  getAll: async () => {
    return User.find({}).populate('bans')
  },

  update:async (user, updObj) => {
    user.set(updObj)
    user = await user.save();
    return user
  }

}