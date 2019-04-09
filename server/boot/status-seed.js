module.exports = async function(app) {
  const Status = app.models.Status;
  const StatusCount = await Status.count();
  if (StatusCount > 0) {
    console.log("Statuses already exist");
    return;
  }
  const data = [
    { id: 1, name: "Online" },
    { id: 2, name: "Offline" },
    { id: 3, name: "New" },
    { id: 4, name: "In progress" },
    { id: 5, name: "Restarting" },
    { id: 6, name: "Error" }
  ];
  console.log(data);
  Status.create(data, function(err, status) {
    if (err) throw err;
    console.log("Created status:", status);
  });
};
