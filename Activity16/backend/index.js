const express = require("express");
const db = require("./db.js");
const cors = require("cors");
const app = express();
const PORT = 4000;
app.use(cors());
app.use(express.json());

//app.use(express.static("public"));
//app.use("/images", express.static("images"));

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

app.get("/catalog", async (req, res) => {
  try {
    const query = "SELECT * FROM fakestore_catalog";
    const [result] = await db.query(query); // Execute the query and wait for the result
    console.log("Success in Reading MySQL");
    res.status(200).send(result); // Send the results as the response
  } catch (err) {
    // If an error occurs, catch it and send an appropriate error response
    console.error("Error in Reading MySQL :", err);
    res.status(500).send({ error: "An error occurred while fetching items." });
  }
});

app.get("/catalog/:id", async (req, res) => {
    try {
    // Read id from frontend
    const id = req.params.id;
    const query = "SELECT * FROM fakestore_catalog WHERE id = ?";
    const [result] = await db.query(query, [id]); // Ensure to use array for parameters even if it's just one
    console.log("Success in Reading MySQL");
    console.log(result)
    res.status(200).send(result);
    } catch (err) {
    // If an error occurs, catch it and send an appropriate error response
    console.error("Error in Reading MySQL :", err);
    res.status(500).send({ error: 'An error occurred while fetching items.' });
    }
    });

    app.delete("/catalog/:id", async (req, res) => {
        try {
          const id = Number(req.params.id);
          const query = `DELETE FROM fakestore_catalog WHERE id = ?`;

          [results] = await db.query(query, [id]);
        
          res.status(200);
          res.send(results);
        } catch (error) {
          console.error("Error deleting product", error);
          res.status(500).send({ message: "Internal Server Error" });
        }
      });

      app.post("/catalog", async (req, res) => {
        const id = Number(req.params.id);

        const rating = {"rate": req.body.rating.rate, "count": req.body.rating.count}

        const query = `INSERT INTO fakestore_catalog 
        (id, title, price, description, category, image, rating) 
        VALUES 
        (${req.body.id}, "${req.body.title}", ${req.body.price}, "${req.body.description}", "${req.body.category}", "${req.body.image}", '{"rate": ${req.body.rating.rate}, "count": ${req.body.rating.count}}')`

        //{"rate": ${req.body.rating.rate}, "count": ${req.body.rating.count}}

        db.query(query)
        console.log("Hey fuckface, this worked")

      });

      app.put("/catalog/:id", async (req, res) => {
        try {
            const id = Number(req.params.id);

            console.log("Product to update :", id);
    
            console.log(req.body);
    
            const query = `UPDATE fakestore_catalog 
            SET title = "${req.body.title}", price = ${req.body.price}, description = "${req.body.description}", category = "${req.body.category}", image = "${req.body.image}", rating = '{"rate": ${req.body.rating.rate}, "count": ${req.body.rating.count}}'  
            WHERE id = ?;`

            results = await db.query(query, [id])
    
            res.status(200);
            res.send(results);
        } catch (error) {
            console.error("Error updating product price :", error);
            res.status(500).send({message : 'Internal Server Error'});
        }
    });
