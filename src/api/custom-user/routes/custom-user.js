module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/custom-users',
      handler: 'custom-user.find',
      config: {
        auth: false, // or true if you want to protect
      },
    },
    {
      method: 'GET',
      path: '/custom-users/:id',
      handler: 'custom-user.findOne',
      config: {
        auth: false, // or true if you want to protect
      },
    },
    {
      method: 'DELETE',
      path: '/custom-users/:id',
      handler: 'custom-user.delete',
      config: {
        auth: { required: true },
      },
    },
    {
      method: "PUT",
      path: "/custom-users/:id",
      handler: "custom-user.update", // ✅ must match controller
      config: {
        auth: { required: true },
      },
    },

  ],
};


