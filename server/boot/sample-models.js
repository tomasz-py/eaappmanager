module.exports = async function(app) {
  const User = app.models.AppUser;
  const Role = app.models.Role;
  const RoleMapping = app.models.RoleMapping;

  const currentUsersCount = await User.count();
  if (currentUsersCount > 0) {
    console.log("Users already exist");
    return;
  }

  User.create(
    { username: "admin", email: "admin@admin.pl", password: "admin!?" },
    function(err, userInstance) {
      console.log(userInstance);
    }
  );

  //create the admin role
  Role.create(
    {
      name: "admin"
    },
    function(err, role) {
      if (err) throw err;
      console.log("Created role:", role);
      //make admin an admin
      role.principals.create(
        {
          principalType: RoleMapping.USER,
          principalId: 1
        },
        function(err, principal) {
          if (err) throw err;
          console.log("Created principal:", principal);
        }
      );
    }
  );
};
