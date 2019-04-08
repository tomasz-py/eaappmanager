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
    [
      { username: "admin", email: "admin@admin.pl", password: "admin!?" },
      { username: "test", email: "test@test.pl", password: "test" }
    ],
    function(err, users) {
      if (err) throw err;

      console.log("Created users:", users);

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
              principalId: users[0].id
            },
            function(err, principal) {
              if (err) throw err;

              console.log("Created principal:", principal);
            }
          );
        }
      );

      //create the user role
      Role.create(
        {
          name: "user"
        },
        function(err, role) {
          if (err) throw err;
          console.log("Created role:", role);
          //make test an user
          role.principals.create(
            {
              principalType: RoleMapping.USER,
              principalId: users[1].id
            },
            function(err, principal) {
              if (err) throw err;

              console.log("Created principal:", principal);
            }
          );
        }
      );
    }
  );
};
