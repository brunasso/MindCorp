import board from "../models/board.js";

const saveTask = async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(400).send({ message: "Incomplete data" });

  const boardSchema = new board({
    userId: req.user._id,
    name: req.body.name,
    description: req.body.description,
    taskStatus: "to-do",
    imageUrl: "NoImage",
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




export default { saveTask, listTask, updateTask, deleteTask };
