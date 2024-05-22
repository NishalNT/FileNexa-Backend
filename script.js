const File = require("./models/file");
const fs = require("fs");
const connectDB = require("./config/db");
connectDB();

async function fetchData() {
  //fetch the files that are 24 hours old in database
  const pastDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const files = File.find({ createdAt: { $lt: pastDate } }); //$lt is less than
  if (files.length) {
    for (const file of files) {
        try{
            //delete the file from database
            fs.unlinkSync(file.path);//this line will delete from the storage
            await file.remove();
            console.log(`Successfully deleted ${file.filename}`);
        }catch(err){
            console.log(`Error while deleting file ${err}`);
        }
    }
    console.log("Job Done");
  }
}

fetchData().then(() => {
    process.exit();
});
