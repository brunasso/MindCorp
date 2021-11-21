import user from "../models/user.js";
import role from "../models/role.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const registerUser = async(req, res) => {
    if(!req.body.name || !req.body.email || !req.body.password ) return res.status(400).send({message: "Incomplete data."});

    const existingUser = await user.findOne({email: req.body.email});
    if(existingUser) return res.status(400).send({message: "User already register."});

    const passHash = await bcrypt.hash(req.body.password, 10);

    const roleId = await role.findOne({name: "user"});
    if(!roleId) return res.status(400).send({message: "No role was assigned"})

    const userRegister = new user({
        name: req.body.name,
        email: req.body.email,
        password: passHash,
        roleId: roleId._id
    })

    const result = await userRegister.save();
    try {
        return res.status(200).json({
            token: jwt.sign({
                _id: result._id,
                name: result.name,
                email: result.email,
                roleId: result.roleId,
                iat: moment().unix()
            },
            process.env.SK_JWT
            )
        });
    } catch (e) {
        return res.status(400).send({message: "Register error."})
    }

}

const updateUser = async(req, res) => {
    if(!req.body.name || !req.body.email || !req.body.password ) return res.status(400).send({message: "Incomplete data."});

    const changeEmail = await user.findById({ _id: req.body._id});
    if(changeEmail !== req.body.email) return res.status(400).send({message: "The email should never be changed"});

    let pass = "";

    if(req.body.password){
        pass = await bcrypt.hash(req.body.password, 10)
    }else{
        const userFind = await user.findById({email: req.body.email});
        pass = userFind.password;
    }

    const existingUser = await user.findOne({
        name: req.body.name,
        email: req.body.email,
        password: pass,
        roleId: req.body.roleId
    })
    if(existingUser)
    return res.status(400).send({message: "You didn't make any changes"});

    const userUpdate = await user.findByIdAndUpdate({_id: req.body._id,
        name: req.body.name,
        email: req.body.email,
        password: pass,
        roleId: req.body.roleId
    })
    return userUpdate ?
    res.status(200).send({message: "User updated"})
    : res.status(400).send({message: "Error editing user"});

}

//No creo que sea necesario buscar por usuario

/* const findUser = async(req, res) => {
    const userFound = await user.findById({_id: req.params["_id"]});
    return userFound ? res.status(200).send({userFound}) : res.status(400).send({message: "User not found"});
} */

const listUser = async(req, res) => {
    const usersFound = await user.find();
    return !userFound || userFound.length == 0
    ? res.status(400).send({message: "User not found"})
    : res.status(200).send({usersFound});
}

const deleteUser = async(req, res) => {
    const result = await user.findByIdAndDelete({_id: req.params["_id"]});

    return result ? res.status(200).send({message: "Deleted user correctly"}) : res.status(400).send({message: "Delete user error."});

}

const loginUser = async(req, res) => {
    if(!req.body.email || !req.body.password) return res.status(400).send({message: "Incomplete data"});

    const emailExists = await user.findOne({email: req.body.email});
    if(!emailExists) return res.status(400).send({message: "Wrong email or password"});

}

export default {registerUser, updateUser, listUser, deleteUser, loginUser}