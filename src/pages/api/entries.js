import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import clientPromise from "../../utils/mongodb";

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    res
      .status(401)
      .json({
        message: "Error: you must be authenticated to make this request",
      });
    return;
  }

  const client = await clientPromise;
  const database = client.db("productivistDatabase");
  const users = await database.collection("users");

  if (req.method === "GET") {
    const result = await users.findOne({ email: session.user.email });

    res
      .status(200)
      .json({
        message: "Success: Your toDoList has been retrieved from MongoDB",
        savedToDoList: result.toDoList,
      });
  }

  if (req.method === "POST") {
    const toDoListToSave = req.body.toDoList;

    await users.updateOne(
      { email: session.user.email },
      {
        $set: { toDoList: toDoListToSave },
      }
    );

    res
      .status(200)
      .json({ message: "Sucess: Your toDoList has been saved to MongoDB" });
  }
}
