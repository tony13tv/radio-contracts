module.exports = {
  definition: `
    extend type UsersPermissionsMe {
      name: String,
      customers(sort: String, limit: Int, start: Int, where: JSON): [Customer],
      avatar: UploadFile,
      country: Country
    }
  `,
  resolver: {
    UsersPermissionsMe: {
      customers: async user => {
        return await strapi.services.customer.find({managed_by: user.id})
      }
    }
  }
}
