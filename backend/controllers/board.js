import board from "../models/board.js";
import user from "../models/user.js";

const saveTask = async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(400).send({ message: "Incomplete data" });

  const boardSchema = new board({
    userId: req.user._id,
    name: req.body.name,
    description: req.body.description,
    taskStatus: "to-do",
  });

  const result = await boardSchema.save();
  return !result
    ? res.status(400).send({ message: "Error registering task" })
    : res.status(200).send({ result });
};

const listTask = async (req, res) => {
  const taskList = await board.find({ userId: req.user._id });
  return taskList.length === 0
    ? res.status(400).send({ message: "You have no assigned tasks" })
    : res.status(200).send({ taskList });
};

const updateTask = async (req, res) => {
  if (!req.body._id || !req.body.taskStatus)
    return res.status(400).send({ message: "Incomplete data" });

  const taskUpdate = await board.findByIdAndUpdate(req.body._id, {
    taskStatus: req.body.taskStatus,
  });

  return !taskUpdate
    ? res.status(400).send({ message: "Task not found" })
    : res.status(200).send({ message: "Task updated" });

};

const deleteTask = async (req, res) => {
  const taskDelete = await board.findByIdAndDelete(req.params._id);
  return !taskDelete
    ? res.status(400).send({ message: "Task not found" })
    : res.status(200).send({ message: "Task deleted" });
};


// Can be the user assigned in task, changed by the admin.
const changeTaskUser = async(req, res) => {
  if(!req.body.email || !req.body.name || !req.body.description || !req.body.taskStatus ) return res.status(400).send({ message: "Incomplete data"});

  const existingUser = await user.findOne({email: req.body.email});
  if(!existingUser) return res.status(400).send({ message: "User doesn't exits" });

  let newId = "";
  newId = existingUser._id;

  const newUser = await board.findOne({
    userId: newId,
    name: req.body.name,
    description: req.body.description,
    taskStatus: "to-do",
  });
  if(newUser) return res.status(400).send({message: "You didn't make any changes"});

  const userChanged = await board.findByIdAndUpdate(req.body._id, {
    userId: newId,
    name: req.body.name,
    description: req.body.description,
    taskStatus: "to-do",
  });
  return userChanged ?
    res.status(200).send({message: "User in task changed"})
    : res.status(400).send({message: "Error trying to change user in task"});
}

export default { saveTask, listTask, updateTask, deleteTask, changeTaskUser };
