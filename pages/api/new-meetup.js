// [POST] /api/new-meetup

function handler(req, res) {
  // console.log("req.method", req.method);
  // console.log("req.headers", req.headers);
  // console.log("req.body", req.body);

  if (req.method === "POST") {
    const data = req.body;
    const { title, image, address, description } = data;

    return res.status(200).json({ message: "/api/new-meetup" });
  }
}

export default handler;
