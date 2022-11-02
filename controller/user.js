const User = require("../model/user");
const cloudinary = require("../utils/cloudinary");

exports.userPost = async (req, res, next) => {
	try {
		//upload image to cloudinary
		const result = await cloudinary.uploader.upload(req.file.path)
		
		// Create new user
		let user = new User({
			name: req.body.name,
			avatar: result.secure_url,
			cloudinary_id: result.public_id,
		});
		// Save user
		await user.save();
		res.json({
			user: user,
			data:result
		});
	} catch (error) {
		console.log("ERROR: ",error)
	}
}


exports.userEdit = async (req, res, next) => {
	try {
		let user = await User.findById(req.params.id)
		if (!user) throw new Error("No user present")

		//delete existing image first
		await cloudinary.uploader.destroy(user.cloudinary_id)

		//upload a new one
		let result;

		if(req.file){
			result = await cloudinary.uploader.upload(req.file.path)
		}

		const data = {
			name: req.body.name || user.name,
			avatar: req.body.avatar || user.avatar,
			cloudinary_id: req.body.cloudinary_id || user.cloudinary_id
		}

		user = await User.findByIdAndUpdate(req.params.id, data, { new:true })
		res.json(user)
	} catch (error) {
		console.log("ERROR", error)
	}
}