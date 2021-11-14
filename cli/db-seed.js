var strapi = require("strapi");
var faker = require("faker");

strapi()
  .load()
  .then(async (strapiInstance) => {
    try {
      for (let index = 0; index < 5; index++) {
        // Create a user
        const user = await strapiInstance.plugins[
          "users-permissions"
        ].services.user.add({
          blocked: false,
          confirmed: true,
          username: faker.internet.userName().toLowerCase(),
          email: faker.internet.email(),
          password: "1234", //will be hashed automatically
          provider: "faker", //provide
          created_by: 1, //user admin id
          updated_by: 1, //user admin id
          role: 1, //role id
        });

        // Create some ads
        for (let j = 0; j < 5; j++) {
          const address = faker.address;

          const sampleAd = {
            title: `${faker.name.title()} - ${address.streetAddress()}`,
            user_id: user.id,
          };

          await strapiInstance.query("ad").create(sampleAd);
        }
      }
    } catch (e) {
      console.debug(e);
    }
    // exit with 0 code
    strapiInstance.stop(0);
  });
