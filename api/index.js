import express  from "express";
import serverless from "serverless-http"
import cors from "cors"
import { fetchTasks, createTasks, updateTasks, deleteTasks } from "./task.js";

const app = express();
const port = 3001;

app.use(express.json());

if(process.env.DEVELOPMENT){app.use(cors())};
console.log("hiii")

// Hello
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// GET
app.get("/task", async (req, res) => {
  try {
    const tasks = await fetchTasks();
    console.log(tasks)
    res.send(tasks.Items);
  } catch (err) {
    res.status(400).send(`Error fetching tasks: ${err}`)
  }
});

// POST
app.post("/task", async (req, res) => {
    try {
        const tasks = req.body;
        const response = await createTasks(task);
        res.send(response);

      } catch (err) {
        res.status(400).send(`Error creating tasks: ${err}`)
      }
    });

// UPDATE
app.put("/task", async (req, res) => {
  try {
    const tasks = req.body;
    const response = await updateTasks(task);
    res.send(response);
  } catch (err) {
    res.status(400).send(`Error updating tasks: ${err}`);
  }
});

// DELETE
app.delete("/task/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const response = await deleteTasks(id);
    } catch (err) {
        res.status(400).send(`Error deleting tasks: ${err}`)
      }
    });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
export const handler = serverless(app);