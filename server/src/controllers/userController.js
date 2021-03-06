require('../../config/database');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const saltrounds = 10;

exports.index = async (req, res) => {
    const users = await User.find();

    return res.json({
        data: users,
        status: "success",
        messages: "fetch data success",
    });
}

exports.details = async (req, res) => {
    try {
        const data = await User.findOne({ username: req.params.username });

        if (!data) {
            return error;
        }

        return res.json({
           data: {
              username: data.username,
              firstname: data.firstname,
              lastname: data.lastname,
              email: data.email,
              password: data.password,
              image: data.image,
              online: data.online,
              status: data.status,
              token: data.token,
           },
           status: "success",
           messages: "Data ditemukan",
        });
    } catch (error) {
        return res.status(400).json({ status: 'fail', messages: "Data tidak ditemukan" });
    }
}

exports.store = async (req, res) => {
    try {
        const hashPassword = await bcrypt.hash(req.body.password, saltrounds);
        
        const data = {
           username: req.body.username,
           firstname: req.body.firstname,
           lastname: req.body.lastname,
           email: req.body.email,
           password: hashPassword,
           image: req.body.image,
           online: false,
           status: "",
           token: "",
        };

        User.create(data, (err, result) => {
            return res.json({ data, status: 'success', message: 'User Berhasil Ditambahkan' });
        });
    } catch (error) {
        return res.status(400).json({ status: 'fail', message: 'User Gagal Ditambahkan' });
    }
}

exports.update = async (req, res) => {
    try {
        const oldData = await User.findOne({ username: req.params.username });
        if (!oldData) return res.status(404).json({ status: 'fail', message: 'User Tidak Ditemukan' });

        //    let image = oldData.image;
        //     if (oldData.image == null || undefined) {
        //         image = 'default.png';
        //     }

        const user = {
            firstname: (req.body.firstname) ? req.body.firstname : oldData.firstname,
            lastname: (req.body.lastname) ? req.body.lastname : oldData.lastname,
            email: (req.body.email) ? req.body.email : oldData.email,
            password: (req.body.password) ? req.body.password : oldData.password,
            image: (req.body.image) ? req.body.image : oldData.image,
            online: false,
            status: (req.body.status) ? req.body.status : oldData.status,
            token: (req.body.token) ? req.body.token : oldData.token
        }

        await User.updateOne({ username: req.params.username }, {
            $set: user
        }).then(() => res.json({ user, status: 200, message: 'User Berhasil Diubah' }));
    } catch (error) {
        return res.status(400).json({ status: 'fail', message: 'User Gagal Diubah' });
    }
}

exports.destroy = async (req, res) => {
    try {
        const data = await User.findOne({ username: req.params.username });

        if (!data) return error;

        await User.deleteOne({ username: data.username }).then(() => res.json({ status: 200, message: 'User Berhasil Dihapus' }));
    } catch (error) {
        return res.status(400).json({ status: 'fail', message: 'User Gagal Dihapus' });
    }
}

exports.viewImage = async (req, res) => {
    const data = await User.findOne({ username: req.params.username });

    return res.json(data.image);
}