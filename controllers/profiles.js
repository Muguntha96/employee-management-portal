import { Profile } from "../models/profile.js"

function index(req, res) {
  Profile.find({})
    .then(profiles => {
      res.render('profiles/index', {
        title: 'List of Users',
        profiles: profiles
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
}
export {
  index
}