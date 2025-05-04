const { sanitize } = require('@strapi/utils');

module.exports = {
    async find(ctx) {
        const { page = 1, pageSize = 24, role, locale = "en" } = ctx.query;

        const filters = {};
        if (role) {
            filters.role = { name: role };
        }

        const users = await strapi.entityService.findMany('plugin::users-permissions.user', {
            filters,
            fields: ['id', 'username', 'email', 'createdAt'],
            populate: {
                role: { fields: ['name'] },
                species: {
                    fields: ['documentId'],
                    filters: { locale } // ✅ apply locale filter here
                },
            },
            sort: { username: 'asc' },
            limit: Number(pageSize),
            offset: (Number(page) - 1) * Number(pageSize),
        });

        const total = await strapi.entityService.count('plugin::users-permissions.user', { filters });

        return {
            data: users,
            meta: {
                pagination: {
                    page: Number(page),
                    pageSize: Number(pageSize),
                    pageCount: Math.ceil(total / pageSize),
                    total,
                },
            },
        };
    },

    async findOne(ctx) {
        const { id } = ctx.params;
        const { locale = 'en' } = ctx.query;

        if (!id) {
            return ctx.badRequest("Missing user ID");
        }

        const user = await strapi.entityService.findOne('plugin::users-permissions.user', id, {
            fields: ['id', 'username', 'email', 'createdAt'],
            populate: {
                role: { fields: ['name'] },
                species: {
                    fields: [
                        'name',
                        'slug',
                        'scientificAutorName',
                        'lifeForm',
                        'scientificNameId',
                        'gbifUrl',
                    ],
                    filters: { locale },
                    populate: {
                        family: { fields: ['name'] },
                        genus: { fields: ['name'] },
                        detectionDates: true,
                    },
                },
            },
        });

        if (!user) {
            return ctx.notFound("User not found");
        }

        return { data: user };
    },

    async delete(ctx) {
        const { id } = ctx.params;
        const user = ctx.state.user;

        if (!user || user.id !== Number(id)) {
            return ctx.forbidden("You are not allowed to delete this account.");
        }

        try {
            await strapi.plugins["users-permissions"].services.user.remove({ id });
            return ctx.send({ message: "Account deleted successfully." });
        } catch (error) {
            console.error("Failed to delete account:", error);
            return ctx.internalServerError("Account deletion failed.");
        }
    },

    async update(ctx) {
        const { id } = ctx.params;
        const { username, password } = ctx.request.body;

        if (!id || ctx.state.user.id !== parseInt(id)) {
            return ctx.unauthorized("You are not allowed to update this account.");
        }

        try {
            const updatedUser = await strapi
                .plugin('users-permissions')
                .service('user')
                .edit(id, {
                    username,
                    ...(password ? { password } : {}),
                });

            return {
                data: {
                    id: updatedUser.id,
                    username: updatedUser.username,
                    email: updatedUser.email,
                },
            };
        } catch (err) {
            console.error("Update error:", err.message || err);
            ctx.status = 500;
            ctx.body = {
                error: {
                    message: err.message || "Unknown error",
                    stack: err.stack,
                },
            };
        }
    }

};
