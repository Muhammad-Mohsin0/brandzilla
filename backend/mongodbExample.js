
const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const { MongoClient, ObjectId } = require("mongodb");

// Step 1: Get URI from environment variable
// (Never hardcode your real password here 🔒)
const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("❌ Please set MONGODB_URI in your .env file");
  process.exit(1);
}

// Step 2: Create client
const client = new MongoClient(uri);

async function run() {
  try {
    console.log("⏳ Connecting to MongoDB Atlas...");
    await client.connect();
    console.log("✅ Connected successfully!");

    // Step 3: Select DB & Collection
    const db = client.db("brandzilla");
    const collection = db.collection("products");

    // Step 4: Insert 10 sample documents
    console.log("📦 Inserting sample data...");

    const sampleData = Array.from({ length: 10 }).map((_, i) => ({
      name: `Product ${i + 1}`,
      category: i % 2 === 0 ? "fabric" : "jewelry",
      price: Math.floor(Math.random() * 5000) + 500,
      createdAt: new Date(Date.now() - i * 1000000), // different timestamps
    }));

    const insertResult = await collection.insertMany(sampleData);
    console.log(`✅ Inserted ${insertResult.insertedCount} documents`);

    // Step 5: Get 5 most recent documents
    console.log("📄 Fetching 5 most recent products...");

    const recentDocs = await collection
      .find()
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();

    console.log("🆕 Recent Products:");
    console.log(recentDocs);

    // Step 6: Get one document by _id
    const oneId = recentDocs[0]._id;
    console.log(`🔍 Fetching product by _id: ${oneId}`);

    const oneDoc = await collection.findOne({ _id: oneId });

    console.log("📌 Found Document:");
    console.log(oneDoc);

  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    // Step 7: Close connection
    await client.close();
    console.log("🔌 Connection closed");
  }
}

run();

